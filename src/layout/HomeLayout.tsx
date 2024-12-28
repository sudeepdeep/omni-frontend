import React from "react";
import BreakingNews from "../components/Home/BreakingNews/BreakingNews";
import Feed from "../components/Home/Feed/Feed";
import ProfileCard from "../components/Home/ProfileCard";
import TrendingNow from "../components/Home/TrendingNow";
import UploadPost from "../components/Home/Feed/UploadPost";
import PopularNews from "../components/Home/Feed/PopularNews";

function HomeLayout() {
  return (
    <div className="p-[10px] w-[90%] min-h-[90vh] mx-auto flex gap-[20px] md:flex-row flex-col">
      <div className="md:w-[20%] w-[100%] rounded-md flex flex-col gap-[10px]">
        <BreakingNews />
        <PopularNews />
      </div>
      <div className="md:w-[60%] w-[100%] rounded-md flex flex-col gap-[10px]">
        <UploadPost />
        <Feed />
      </div>
      <div className="md:w-[20%] w-[100%] rounded-md flex flex-col gap-[10px]">
        <ProfileCard />
        <TrendingNow />
      </div>
    </div>
  );
}

export default HomeLayout;
