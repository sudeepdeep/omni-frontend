import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { FeedStore } from "../../../Store";
import moment from "moment";

function BreakingNews() {
  const [allNews, setAllNews] = useState([]);
  const feed = FeedStore.useState();
  useEffect(() => {
    console.log(feed, moment().format("YYYY-MM-DD"));
    if (feed && feed.posts && feed.posts.length > 0) {
      let bnFeed = feed.posts.filter(
        (item: any) => item.subCategory.includes("breaking")
        // && item.date == moment().format("YYYY-MM-DD")
      );
      setAllNews(bnFeed);
    }
  }, [feed]);
  return (
    <div className="lg:h-[70vh] h-auto w-fullrounded-md overflow-hidden p-[10px]">
      <span>
        <b>
          <span className="text-red-500">BREAKING NEWS</span>{" "}
          <span>BY CIVIC REPORTS</span>
        </b>
      </span>
      <div className="overflow-hidden">
        <div className="animate-marquee-vertical">
          {allNews.map((newss: any) => (
            <NewsCard news={newss} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BreakingNews;
