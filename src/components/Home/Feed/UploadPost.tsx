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
import FeedPopup from "./FeedPopup";
function UploadPost({ postDetails = [] }) {
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
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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

      {isPopupOpen && <FeedPopup handleClosePopup={handleClosePopup} />}
    </div>
  );
}

export default UploadPost;
