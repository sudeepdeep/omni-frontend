import React, { useEffect, useState } from "react";
import Feed, { convertApiItem } from "../components/Home/Feed/Feed";
import { useParams } from "react-router-dom";
import axios, { axiosErrorToast } from "../utils/axios";
import FeedPost from "../components/Home/Feed/FeedPost";
import { UserDetailsStore } from "../Store";

function UserPosts() {
  const userDetails = UserDetailsStore.useState();
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`/news/${userId}/author`)
        .then((res) => {
          if (res.status == 200) {
            let modifiedData = res.data.map(convertApiItem);
            setPosts(modifiedData);
          }
        })
        .catch((err) => {
          axiosErrorToast(err);
        });
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  }, [userId]);
  return (
    <div className="rounded-md h-[70vh] overflow-auto w-full p-4">
      {posts.length > 0 &&
        posts.map((item, index) => (
          <FeedPost key={index} news={item} userDetails={userDetails} />
        ))}
    </div>
  );
}

export default UserPosts;
