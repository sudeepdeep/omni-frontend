import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import BreakingNews from "../components/Home/BreakingNews/BreakingNews";
import PopularNews from "../components/Home/Feed/PopularNews";
import UploadPost from "../components/Home/Feed/UploadPost";
import ProfileCard from "../components/Home/ProfileCard";
import TrendingNow from "../components/Home/TrendingNow";
import { checkUserLoggedIn } from "../utils/service";
import UIStore from "../Store";
import { TagBadge2 } from "../components/TagBadge";

function AppLayout() {
  const currentPath = window.location.pathname;
  useEffect(() => {
    if (Cookies.get("token")) {
      checkUserLoggedIn();
      console.log(Cookies.get("token"), "token");
    }
  }, []);
  const ui = UIStore.useState();
  const [newsType, setNewsType] = useState("");

  function handleClick(e: any) {
    if (e) {
      setNewsType(e);
    } else {
      setNewsType("");
    }
  }
  return (
    <div className="min-h-[100vh] h-auto  font-poppins">
      <Navbar />

      <div className="hidden lg:block bg-[#F4F2EE]">
        <div className="p-[10px] w-[90%] min-h-[90vh] mx-auto flex gap-[20px] md:flex-row flex-col">
          <div className="md:w-[20%] w-[100%] rounded-md flex flex-col gap-[10px]">
            <BreakingNews />
            <PopularNews />
          </div>
          <div className="md:w-[60%] w-[100%] rounded-md flex flex-col gap-[10px]">
            <UploadPost />
            <Outlet />
          </div>
          <div className="md:w-[20%] w-[100%] rounded-md flex flex-col gap-[10px]">
            {ui.userLoggedIn && <ProfileCard />}
            <TrendingNow />
          </div>
        </div>
      </div>

      <div className="block lg:hidden bg-[#F4F2EE]">
        <div className="w-[100%] mx-auto pt-[20px] rounded-md flex flex-col gap-[10px]">
          <UploadPost />
          <div className="w-[100%] lg:hidden flex justify-center gap-3 mt-1">
            {["Breaking News", "Trending News"].map((item: any) => (
              <div className="w-[auto]">
                <TagBadge2
                  tag={item}
                  selectedTag={newsType}
                  handleClick={handleClick}
                />
              </div>
            ))}
          </div>
          <div>
            {newsType === "Breaking News" ? (
              <BreakingNews />
            ) : (
              newsType === "Trending News" && <TrendingNow />
            )}
          </div>
          <Outlet />
        </div>
      </div>

      {/* {uiStore.userLoggedIn && currentPath !== "/" ? (
        <div className="flex md:flex-row flex-col items-start">
          <SideBar />
          <Outlet />
        </div>
      ) : (
        <div className="bg-[#F4F2EE]">
          <Outlet />
        </div>
      )} */}
      {/* 
      <div className="flex md:flex-row flex-col items-start">
        <SideBar />
        <Outlet />
      </div> */}
    </div>
  );
}

export default AppLayout;
