import React, { useEffect, useState } from "react";
import { fromEvent, Observable, from } from "rxjs";
import { throttleTime, filter, switchMap, takeUntil } from "rxjs/operators";
import FeedPost from "./FeedPost";
import { MainLoader } from "../../Loading";
import { useSearchParams } from "react-router-dom";
import axios from "../../../utils/axios";
import { FeedStore } from "../../../Store";

export const convertApiItem = (newsItem: any) => ({
  title: newsItem?.title ?? "",
  url: `/${newsItem?._id}/news`,
  snippet: newsItem?.content ?? "",
  content: newsItem?.content ?? "",
  date: newsItem?.publishedDate,
  images: newsItem?.imageUrl,
  imageUrl: newsItem?.imageUrl,
  author:
    newsItem?.authorId?.firstName + " " + newsItem?.authorId?.lastName ||
    "Author",
  authorImage: newsItem?.authorId?.profileUrl,
  role: newsItem?.authorId?.role ?? "user",
  category: newsItem?.category ?? [],
  subCategory: newsItem?.subCategory ?? [],
});

function Feed({ stocks, politics, news, finance, loading }: any) {
  console.log(politics);
  const [searchParams] = useSearchParams();
  const param1 = searchParams.get("page");
  const param2 = searchParams.get("subPage");
  const param3 = searchParams.get("appName");
  const param4 = searchParams.get("search");
  const param5 = searchParams.get("startDate");
  const param6 = searchParams.get("endDate");

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0); // Track the current page for pagination
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if more data is available
  const [isFetching, setIsFetching] = useState<boolean>(false); // Track if data is being fetched

  // Convert news items into a consistent format

  const convertStocksItem = (newsItem: any) => ({
    title: newsItem?.content?.title ?? "",
    url: newsItem?.content?.clickThroughUrl?.url ?? "",
    snippet: newsItem?.content?.content ?? "",
    date: newsItem?.content?.pubDate,
    images: [newsItem?.content?.thumbnail?.resolutions[0]?.url ?? ""],
    author: newsItem?.content?.provider?.displayName ?? "Author",
    authorImage: "",
    category: [newsItem?.content?.contentType ?? ""],
    subCategory: newsItem?.subCategory ?? [],
  });

  const convertPoliticalItem = (newsItem: any) => ({
    title: newsItem?.title ?? "",
    url: newsItem?.url ?? "",
    snippet: newsItem?.short_description ?? "",
    date: newsItem?.date,
    images: [newsItem?.top_image ?? ""],
    author: newsItem?.publisher?.title ?? "Author",
    authorImage: "",
    category: [newsItem?.contentType ?? ""],
    subCategory: newsItem?.subCategory ?? [],
  });

  // Fetch more posts based on the current page
  const fetchMorePosts = async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);

    try {
      let searchQuery = "";
      if (param1) {
        searchQuery += `?category=${param1 ?? "local"}`;
      } else {
        searchQuery += `?category=${"local"}`;
      }
      if (param2) searchQuery += `&subCategory=${param2}`;
      if (param4) searchQuery += `&search=${param4}`;
      if (param5) searchQuery += `&startDate=${param5}`;
      if (param6) searchQuery += `&endDate=${param6}`;
      searchQuery += `&limit=10&offset=${page * 10}`; // Pagination logic

      const res = await axios.get(`/news/${searchQuery}`);
      if (res?.data?.count > 0) {
        const fetchedNews = res?.data?.results.map(convertApiItem);
        FeedStore.update((s) => {
          s.posts = fetchedNews;
        });
        setAllPosts((prevPosts) => [...prevPosts, ...fetchedNews]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(fetchedNews.length > 0); // Check if there are more posts to load
      } else {
        setHasMore(false); // No more posts to load
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchStockPosts = async (stocksData: any) => {
    const fetchedNews = stocksData.map(convertStocksItem);
    FeedStore.update((s) => {
      s.posts = fetchedNews;
    });
    setAllPosts((prevPosts) => [...prevPosts, ...fetchedNews]);
    console.log(fetchedNews);
  };

  const fetchPolticalPosts = async (stocksData: any) => {
    const fetchedNews = stocksData.map(convertPoliticalItem);
    FeedStore.update((s) => {
      s.posts = fetchedNews;
    });
    setAllPosts((prevPosts) => [...prevPosts, ...fetchedNews]);
    console.log(fetchedNews);
  };

  // Initial fetch on component mount or when params change
  useEffect(() => {
    setAllPosts([]); // Reset posts when params change
    setPage(0); // Reset page counter
    setHasMore(true); // Reset hasMore flag
    if (stocks && stocks.length > 0) {
      fetchStockPosts(stocks);
    } else if (politics && politics.news && politics.news.length > 0) {
      fetchPolticalPosts(politics.news);
    } else {
      fetchMorePosts(); // Fetch initial set of posts
    }
  }, [param1, param2, param4, param5, param6, stocks, politics]);

  // Infinite scroll logic using RxJS
  useEffect(() => {
    const scroll$ = fromEvent(window, "scroll").pipe(
      throttleTime(200), // Throttle scroll events
      filter(() => {
        // Check if the user has scrolled to the bottom
        return (
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100 &&
          !isFetching &&
          hasMore
        );
      })
    );

    const subscription = scroll$
      .pipe(
        switchMap(() => from(fetchMorePosts())), // Convert Promise to Observable
        takeUntil(fromEvent(window, "unload")) // Cleanup on unmount
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [isFetching, hasMore]);

  if (loading) return <MainLoader />;

  return (
    <div className="rounded-md h-[70vh] overflow-auto w-full p-4">
      {allPosts.length > 0 &&
        allPosts.map((item, index) => <FeedPost key={index} news={item} />)}
      {isFetching && (
        <div
          role="status"
          className="w-full rounded-md bg-white shadow-md mb-4 p-4 flex flex-col gap-2 animate-pulse md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center mt-4">
            <svg
              className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-gray-500">No more posts to load.</p>
      )}
    </div>
  );
}

export default Feed;
