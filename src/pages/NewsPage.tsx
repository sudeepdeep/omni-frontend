import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { axiosErrorToast } from "../utils/axios";
import FeedPost, { FeedPost2 } from "../components/Home/Feed/FeedPost";
import { Share2Icon, ShareIcon } from "lucide-react";

function NewsPage() {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<any>({});
  useEffect(() => {
    axios
      .get(`/news/${id}/news`)
      .then((res) => {
        console.log(res);
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  }, [id]);

  function handleCopyUrl() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  }

  return (
    <div className="bg-[#F4F2EE] w-[100%] h-auto p-5">
      <div className="w-[50%]  h-auto mx-auto">
        {Object.keys(post).length > 0 && (
          <div className="flex gap-3">
            <FeedPost2 news={post} />
            <div className="cursor-pointer" onClick={handleCopyUrl}>
              <Share2Icon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsPage;
