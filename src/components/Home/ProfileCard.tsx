import React, { useEffect, useState } from "react";
import { ArticlesIcon, GroupIcon, MoneyIcon } from "../../assets/Icons";
import axios, { axiosErrorToast } from "../../utils/axios";
import UIStore, { UserDetailsStore } from "../../Store";
import { useNavigate } from "react-router-dom";
import { handleClearData } from "../../utils/service";
import Cookies from "js-cookie";
import DefaultImage from "../DefaultImage";

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
        <div className="h-auto flex flex-col">
          <div className="w-[120px] border-2 mb-2 h-[120px] mr-[10px] overflow-hidden rounded-md">
            {userDetails?.profileUrl === "" ? (
              <div className="h-full w-full flex justify-center items-center">
                <DefaultImage />
              </div>
            ) : (
              <img
                className="w-full h-full object-cover"
                src={userDetails?.profileUrl ?? Cookies.get("profileUrl") ?? ""}
                alt="userProfile"
              />
            )}
          </div>
          <div>
            <b>
              {userDetails?.firstName} {userDetails?.lastName}
            </b>
            <p className="text-[12px] mb-1 italic text-gray-500">
              @{userDetails.username}
            </p>
            <p className="italic text-[12px]">{userDetails?.bio}</p>

            <div className="mt-4">
              <p className="text-[12px]">
                Email:{" "}
                <span className="font-bold text-gray-700">
                  {userDetails.email}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[12px]">
                Role:{" "}
                <span className="font-bold text-gray-700">
                  {userDetails.role}
                </span>
              </p>
            </div>

            <div>
              <p className="text-[12px]">
                License No:{" "}
                <span className="font-bold text-gray-700">
                  {userDetails.licenseNo}
                </span>
              </p>
            </div>

            <div>
              <p className="text-[12px]">
                Address:{" "}
                <span className="font-bold text-gray-700">
                  {userDetails.address}
                </span>
              </p>
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
        className="border-t-2 text-center text-[12px] text-[#1DB954d9] cursor-pointer"
      >
        Edit profile
      </p>
    </div>
  );
}

export default ProfileCard;
