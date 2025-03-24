import React, { useState } from "react";
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
function UploadPost() {
  const ui = UIStore.useState();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  function handleSubmitPost() {
    setLoading(true);
    let data = {
      title: newsData.title,
      content: value,
      authorId: ui.userId,
      author: ui.username,
      imageUrl: newsData.imageUrl,
      category: selectedCategories,
      subCategory: selectedSub,
    };
    axios
      .post(`/news`, data)
      .then((res) => {
        setLoading(false);
        toast.success("post created successfully");
        console.log(res);
        handleClosePopup();
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
        handleClosePopup();
      });
  }

  function handleTitleChange(e: any) {
    setNewsData({
      ...newsData,
      title: e.target.value,
    });
  }

  return (
    <div className="h-[15vh] w-[95%] mx-auto bg-white p-[10px] rounded-lg">
      <p
        onClick={handleOpenPopup}
        className="md:w-[80%] w-[100%] mx-auto text-gray-500 cursor-pointer border-2 h-[40px] rounded-xl flex justify-start pl-[10px] items-center"
      >
        Create News
      </p>
      <div className="flex gap-[20px] justify-center mt-[10px]">
        <p className="flex gap-1 cursor-pointer">
          <ImagesIcon />
          <span>Image</span>
        </p>
        <p className="flex gap-1 cursor-pointer">
          <ArticlesIcon />
          <span>Articles</span>
        </p>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[700px] p-5 shadow-lg relative h-[70vh] overflow-y-auto">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-4">Create a Post</h2>
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
                <a href="/login" className="text-[#1db954e1]">
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
                  handleChange={(e) => {
                    setNewsData((prevData: any) => ({
                      ...prevData,
                      imageUrl: [
                        ...prevData.imageUrl,
                        ...(Array.isArray(e) ? e : [e]),
                      ], // Append new images
                    }));
                  }}
                />
                <Button2
                  handleSubmit={handleSubmitPost}
                  text="submit"
                  loading={loading}
                  sx="w-[200px] mx-auto font-bold"
                />
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPost;
