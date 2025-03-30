import React, { useEffect, useState } from "react";
import { FeedStore } from "../../Store";
import moment from "moment";
import NewsCard from "./BreakingNews/NewsCard";

function TrendingNow() {
  const [trendingNews, setTrendingNews] = useState<any>([]);
  const feed = FeedStore.useState();
  useEffect(() => {
    console.log(feed);
    if (feed && feed.posts && feed.posts.length > 0) {
      console.log(feed);
      let bnFeed = feed.posts.filter(
        (item: any) => item.subCategory.includes("trending")
        // &&  item.date == moment().format("YYYY-MM-DD")
      );
      setTrendingNews(bnFeed);
    }
  }, [feed]);
  return (
    <div className="h-auto p-[10px] rounded-md overflow-hidden">
      <span>
        <b>
          <span className="text-red-500">TRENDING NEWS</span>{" "}
          <span>BY CIVILNEWS</span>
        </b>
      </span>
      <div className="overflow-hidden">
        <div className="animate-marquee-vertical">
          {trendingNews &&
            trendingNews.map((trending: any, index: number) => (
              <>
                <NewsCard news={trending} />
                <br />
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingNow;
