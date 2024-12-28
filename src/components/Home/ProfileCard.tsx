import React from "react";
import { ArticlesIcon, GroupIcon, MoneyIcon } from "../../assets/Icons";

function ProfileCard() {
  return (
    <div className="h-[50vh] bg-white rounded-md p-[10px] flex flex-col justify-around">
      <div>
        <div className="h-[120px] flex items-center justify-center">
          <div className="w-[120px] h-[120px] mr-[10px] overflow-hidden rounded-md">
            <img
              className="w-full h-full object-cover"
              src="https://rukminim2.flixcart.com/image/850/1000/l09w8sw0/poster/y/g/l/medium-the-avengers-iron-man-on-fine-art-paper-hd-quality-original-imagc3hc7rgwksjx.jpeg?q=90&crop=false"
              alt="userProfile"
            />
          </div>
          <div>
            <b>Test User</b>
            <p className="italic text-[12px]">
              We post from the trusted resource
            </p>
            <div className="flex gap-[3px] text-[10px] mt-[10px] text-gray-800">
              <p className="">Journalist</p>
              <p>|</p>
              <p>12th mar 2000</p>
            </div>
          </div>
        </div>
        <div className="mt-[12px] flex flex-wrap gap-[12px] text-[14px]">
          <p>
            <span className="flex gap-1">
              Earnings
              <MoneyIcon />
            </span>
            <b>30$</b>
          </p>
          <p className="border-r-2"></p>
          <p>
            <span className="flex gap-1">
              Blogs
              <ArticlesIcon />
            </span>
            <b>12</b>
          </p>
          <p>
            <span className="flex gap-1">
              Followers
              <GroupIcon />
            </span>
            <b>227</b>
          </p>
        </div>
      </div>
      <p className="border-t-2 text-center text-[12px] text-blue-300 cursor-pointer">
        View Posts
      </p>
    </div>
  );
}

export default ProfileCard;
