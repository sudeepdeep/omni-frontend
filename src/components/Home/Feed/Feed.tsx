import React from "react";
import FeedPost from "./FeedPost";
import { allNews } from "../BreakingNews/BreakingNews";

function Feed() {
  return (
    <div className="rounded-md h-[70vh] overflow-auto w-full p-4">
      {allNews.map((item: any, index: number) => (
        <FeedPost key={index} news={item} />
      ))}
    </div>
  );
}

export default Feed;
