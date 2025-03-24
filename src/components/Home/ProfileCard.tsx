import React, { useEffect, useState } from "react";
import { ArticlesIcon, GroupIcon, MoneyIcon } from "../../assets/Icons";
import axios, { axiosErrorToast } from "../../utils/axios";
import UIStore, { UserDetailsStore } from "../../Store";
import { useNavigate } from "react-router-dom";
import { handleClearData } from "../../utils/service";
import Cookies from "js-cookie";

function ProfileCard() {
  // get user details
  const ui = UIStore.useState();
  const userDetails = UserDetailsStore.useState();
  console.log(userDetails, "asdajsd", ui);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails.firstName === "") {
      // take from the local storgae
      let userDetails_: any = JSON.parse(
        localStorage.getItem("userDetails") ?? "{}"
      );
      UserDetailsStore.update((s) => {
        s.firstName = userDetails_?.firstName;
        s.lastName = userDetails_?.lastName;
        s.address = userDetails_?.address;
        s.dateOfJoin = userDetails_?.dateOfJoin;
        s.email = userDetails_?.email;
        s.licenseNo = userDetails_?.licenseNo;
        s.role = userDetails_?.role;
        s.username = userDetails_?.username;
        s.bio = userDetails_?.bio;
        s.profileUrl = ui?.profileUrl ?? "";
      });
    }
  }, []);

  function handleNavigateProfilePage() {
    // navigate(`/${ui.userId}/edit`);
    window.location.href = `/${ui.userId}/edit`;
  }
  console.log(userDetails.profileUrl);
  return (
    <div className="h-[50vh] bg-white rounded-md p-[10px] flex flex-col justify-around">
      <div>
        <div className="h-[120px] flex items-center justify-center">
          <div className="w-[120px] h-[120px] mr-[10px] overflow-hidden rounded-md">
            <img
              className="w-full h-full object-cover"
              src={userDetails?.profileUrl ?? Cookies.get("profileUrl") ?? ""}
              alt="userProfile"
            />
          </div>
          <div>
            <b>
              {userDetails?.firstName} {userDetails?.lastName}
            </b>
            <p className="italic text-[12px]">{userDetails?.bio}</p>
            <div className="flex gap-[3px] text-[10px] mt-[10px] text-gray-800">
              <p className="">{userDetails?.role}</p>
              <p>|</p>
              <p>{userDetails?.dateOfJoin}</p>
            </div>
          </div>
        </div>
        {/* <div className="mt-[12px] flex flex-wrap gap-[12px] text-[14px]">
          <p>
            <span className="flex gap-1">
              Earnings
              <MoneyIcon />
            </span>
            <b>{userDetails?.earnings ?? 0}$</b>
          </p>
          <p className="border-r-2"></p>
          <p>
            <span className="flex gap-1">
              Blogs
              <ArticlesIcon />
            </span>
            <b>{userDetails?.blogs ?? 0}</b>
          </p>
          <p>
            <span className="flex gap-1">
              Followers
              <GroupIcon />
            </span>
            <b>{userDetails?.followers ?? 0}</b>
          </p>
        </div> */}
      </div>
      <p
        onClick={handleNavigateProfilePage}
        className="border-t-2 text-center text-[12px] text-blue-300 cursor-pointer"
      >
        Edit profile
      </p>
    </div>
  );
}

export default ProfileCard;
