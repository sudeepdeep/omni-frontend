import React, { useEffect, useState } from "react";
import { ArticlesIcon, ImagesIcon } from "../../../assets/Icons";
import { UploadPhoto } from "../../ImageUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LabelComponent, { LabelComponent2 } from "../../LabelComponent";
import TextField, { TextField2 } from "../../TextField";
import UIStore, { UserDetailsStore } from "../../../Store";
import axios, { axiosErrorToast } from "../../../utils/axios";
import { toast } from "react-toastify";
import { Button2 } from "../../Button";
import MultiSelect from "../../MultiSelect";
import Login from "../../../assets/4957136.jpg";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface FeedPopupProps {
  handleClosePopup: () => void;
  postData?: any[];
  type?: any;
}

function FeedPopup({
  handleClosePopup,
  postData = [],
  type = "create",
}: FeedPopupProps) {
  const ui = UIStore.useState();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsData, setNewsData] = useState({
    title: "",
    imageUrl: [],
    content: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState<string[]>([]);
  const [selectedDropdownId, setSelectedDropdownId] = useState<string | null>(
    null
  );

  const closePopup = () => {
    handleClosePopup(); // ✅ This triggers setIsPopupOpen(false) in parent
  };

  function handleSubmitPost() {
    setLoading(true);
    let data;
    if (type == "edit") {
      data = {
        title: newsData.title,
        content: value,
        authorId: ui.userId,
        author: ui.username,
        imageUrl: newsData.imageUrl,
        category: selectedCategories,
        subCategory: selectedSub,
        _id: postData[0]._id,
      };
    } else {
      data = {
        title: newsData.title,
        content: value,
        authorId: ui.userId,
        author: ui.username,
        imageUrl: newsData.imageUrl,
        category: selectedCategories,
        subCategory: selectedSub,
      };
    }
    if (type == "edit") {
      axios
        .put(`/news`, data)
        .then((res) => {
          setLoading(false);
          toast.success("post updated successfully");
          console.log(res);
          window.location.reload();

          closePopup();
        })
        .catch((err) => {
          setLoading(false);
          axiosErrorToast(err);
          closePopup();
        });
    } else {
      axios
        .post(`/news`, data)
        .then((res) => {
          setLoading(false);
          toast.success("post created successfully");
          console.log(res);
          window.location.reload();
          closePopup();
        })
        .catch((err) => {
          setLoading(false);
          axiosErrorToast(err);
          window.location.reload();

          closePopup();
        });
    }
  }

  function handleTitleChange(e: any) {
    setNewsData({
      ...newsData,
      title: e.target.value,
    });
  }

  function handleUploadImage(e: any) {
    setNewsData((prevData: any) => ({
      ...prevData,
      imageUrl: [...prevData.imageUrl, ...(Array.isArray(e) ? e : [e])], // Append new images
    }));
  }

  useEffect(() => {
    if (postData && postData.length > 0) {
      const post = postData[0];
      setSelectedCategories(post.category);
      setSelectedSub(post.subCategory);
      setNewsData({
        ...newsData,
        title: post.title,
        imageUrl: post.images, // Append new images
      });
      setValue(post.content);
      console.log(post, "this si the post");
    }
  }, [postData]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-[700px] p-5 shadow-lg relative h-[70vh] overflow-y-auto">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4">
          {type == "edit" ? "Edit Post" : "Create a Post"}
        </h2>
        {!ui.userLoggedIn ? (
          <div className="flex flex-col h-[80%] items-center justify-center text-center">
            <div>
              <img
                src={Login}
                alt="logo"
                width="280"
                height="280"
                className="mx-auto rounded-full"
              />
            </div>
            <b>Please login to post</b>
            <br />
            <a href="/login" className="text-primary">
              Login now
            </a>
          </div>
        ) : (
          <form className="flex flex-col gap-4">
            <MultiSelect
              id="categories"
              title="Select Category"
              options={[
                { value: "local", name: "Local" },
                { value: "state", name: "State" },
                { value: "national", name: "National" },
                { value: "international", name: "International" },
                { value: "stocks", name: "Stocks" },
                { value: "sports", name: "Sports" },
                { value: "business", name: "Business" },
                { value: "politics", name: "Politics" },
                { value: "technology", name: "Technology" },
                { value: "entertainment", name: "Entertainment" },
                { value: "crypto", name: "Crypto" },
                { value: "economy", name: "Economy" },
                { value: "law", name: "Law" },
                { value: "defense", name: "Defense" },
                { value: "science", name: "Science" },
                { value: "cybersecurity", name: "Cybersecurity" },
                { value: "fashion", name: "Fashion" },
                { value: "lifestyle", name: "Lifestyle" },
                { value: "gaming", name: "Gaming" },
                { value: "football", name: "Football" },
                { value: "cricket", name: "Cricket" },
                { value: "tennis", name: "Tennis" },
                { value: "education", name: "Education" },
                { value: "health", name: "Health" },
                { value: "accidents", name: "Accidents" },
                { value: "environment", name: "Environment" },
                {
                  value: "artificialintelligence",
                  name: "Artificial Intelligence",
                },
                { value: "examinations", name: "Examinations" },
                { value: "isro", name: "ISRO" },
                { value: "nasa", name: "NASA" },
                { value: "space", name: "Space" },
                { value: "socialmedia", name: "Social Media" },
                { value: "application", name: "Application" },
              ]}
              selectedDropdownId={selectedDropdownId}
              setSelectedDropdownId={setSelectedDropdownId}
              value={selectedCategories}
              onChange={setSelectedCategories}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            <MultiSelect
              id="subCategory"
              title="Select subcategory"
              options={[
                { value: "breaking", name: "Breaking News" },
                { value: "trending", name: "Trending News" },
                { value: "upcoming", name: "Upcoming News" },
                { value: "exclusive", name: "Exclusive" },
                { value: "opinion", name: "Opinion" },
                { value: "interview", name: "Interview" },
                { value: "analysis", name: "Analysis" },
                { value: "feature", name: "Feature" },
                { value: "alert", name: "Alert" },
                { value: "special-report", name: "Special Report" },
              ]}
              value={selectedSub}
              selectedDropdownId={selectedDropdownId}
              setSelectedDropdownId={setSelectedDropdownId}
              onChange={setSelectedSub}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />
            <TextField2
              name="title"
              placeholder="Enter title for the article"
              title="Enter title"
              onChange={(e) => handleTitleChange(e)}
              value={newsData.title}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />
            <LabelComponent2 label={"Enter Content"}>
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </LabelComponent2>
            <UploadPhoto
              title={"Upload Custom Image"}
              handleChange={(e) => handleUploadImage(e)}
              images={newsData.imageUrl}
            />
            <Button2
              handleSubmit={handleSubmitPost}
              text={type == "edit" ? "Update" : "submit"}
              loading={loading}
              sx="w-[200px] mx-auto font-bold"
            />
          </form>
        )}
      </div>
    </div>
  );
}

export function GenericPopUp({
  postData,
  open,
  setOpen,
  title,
  description,
  buttonText,
  type,
}: any) {
  console.log(type);
  function handleSubmitPost() {
    let data = {
      isArchived: type == "unarchive" ? "false" : "true",
      _id: postData[0]._id,
    };
    if (type == "archive" || type == "unarchive") {
      axios
        .put(`/news`, data)
        .then((res) => {
          toast.success(
            type == "unarchive"
              ? "Post UnArchived successfully"
              : "post archived successfully"
          );
          window.location.reload();

          console.log(res);
          setOpen(false);
        })
        .catch((err) => {
          axiosErrorToast(err);
          setOpen(false);
        });
    } else {
      axios
        .delete(`/news/${postData[0]._id}`)
        .then((res) => {
          toast.success("post deleted successfully");
          console.log(res);
          window.location.reload();
          setOpen(false);
        })
        .catch((err) => {
          axiosErrorToast(err);
          setOpen(false);
        });
    }
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSubmitPost}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {buttonText}
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default FeedPopup;
