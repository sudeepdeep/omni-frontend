import Cookies from "js-cookie";
import UIStore, { FeedStore, UserDetailsStore } from "../Store";
import axios, { axiosErrorToast } from "../utils/axios";
import { urlPattern } from "./constants";

export async function handleStoreUserDetails(userId: any) {
  try {
    const res = await axios.get(`/user/${userId}/my-profile`);
    return res.data;
  } catch (err: any) {
    handleClearData();
    axiosErrorToast(err);
    return false;
  }
}

export function checkUserLoggedIn() {
  const userId = Cookies.get("userId") || "";
  const token = Cookies.get("token") || "";
  const username = Cookies.get("username") || "";
  const profileUrl = Cookies.get("profileUrl") || "";

  if (userId && userId !== "" && userId !== undefined && userId !== null) {
    //call api with userId to get the username
    if (token && token !== "" && token !== undefined && token !== null) {
      UIStore.update((s) => {
        s.userId = userId;
        s.userLoggedIn = true;
        s.username = username;
        s.profileUrl = profileUrl;
      });
    }
  }
}

export function handleClearData() {
  Cookies.remove("token");
  Cookies.remove("username");
  Cookies.remove("userId");
  UIStore.update((s) => {
    s.userId = 0;
    s.message = "";
    s.userLoggedIn = false;
    s.username = "";
  });

  UserDetailsStore.update((s) => {
    s.address = "";
    s.bio = "";
    s.dateOfJoin = "";
    s.email = "";
    s.firstName = "";
    s.lastName = "";
    s.role = "";
    s.licenseNo = "";
    s.username = "";
  });

  FeedStore.update((s) => {
    s.posts = [];
  });
}

export function isValidURL(url: string): boolean {
  return urlPattern.test(url);
}
