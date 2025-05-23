import { PhotoIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import articleLoading from "../assets/loading.json";
import articleLoading2 from "../assets/mainLoading.json";

import axios, { axiosErrorToast } from "../utils/axios";
import { AnimationLoading } from "./Loading";

interface UploadPhotoProps {
  title?: string;
  handleChange?: (url: string) => void;
  images?: any;
}

interface UploadPhotoProps2 {
  title?: string;
  handleChange?: (url: string) => void;
  preImage?: string;
  setPreImage?: any;
}

export const UploadPhoto: React.FC<UploadPhotoProps> = ({
  title = "Cover photo",
  handleChange = () => {},
  images = [],
}) => {
  const [cover, setCover] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFiles[0]);

    try {
      const res = await axios.post(
        `/user/${Cookies.get("userId")}/upload-profile`,
        formData
      );
      setLoading(false);
      if (res.data?.fileUrl) {
        handleChange(res.data.fileUrl);
        setCover((prevArray) => [...prevArray, res.data.fileUrl]);
      }
    } catch (err: any) {
      setLoading(false);
      axiosErrorToast(err);
    }
  }

  function handleDeleteImage() {
    setCover([]);
  }

  useEffect(() => {
    if (images && images.length > 0) {
      setCover(images);
    }
  }, [images]);

  if (loading) return <AnimationLoading animation={articleLoading2} />;

  return (
    <div>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-white"
      >
        {title}
      </label>
      {cover.length > 0 ? (
        <div className="relative">
          <img src={cover[0]} alt="uploadedimage" />
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
            className="absolute h-[20px] top-1 right-1 hover:cursor-pointer"
            alt="delete"
            onClick={() => handleDeleteImage()}
          />
        </div>
      ) : (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-semibold text-[#c3073f] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#c3073f] focus-within:ring-offset-2 hover:text-[#c3073f]/70"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={(e) => handleFileUpload(e)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const UploadPhoto2: React.FC<UploadPhotoProps2> = ({
  title = "Cover photo",
  handleChange = () => {},
  preImage = "",
  setPreImage = "",
}) => {
  console.log(preImage);
  const [cover, setCover] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFiles[0]);

    try {
      const res = await axios.post(
        `/user/${Cookies.get("userId")}/upload-profile`,
        formData
      );
      setLoading(false);
      if (res.data?.fileUrl) {
        handleChange(res.data.fileUrl);
        setCover((prevArray) => [...prevArray, res.data.fileUrl]);
      }
    } catch (err: any) {
      setLoading(false);
      axiosErrorToast(err);
    }
  }

  function handleDeleteImage() {
    setCover([]);
    setPreImage("");
  }

  if (loading) return <AnimationLoading animation={articleLoading2} />;

  return (
    <div>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-white"
      >
        {title}
      </label>
      {cover.length > 0 || preImage !== "" ? (
        <div className="relative">
          {preImage != "" ? (
            <img src={preImage} alt="uploadedimage" />
          ) : (
            <img src={cover[0]} alt="uploadedimage" />
          )}
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
            className="absolute h-[20px] top-1 right-1 hover:cursor-pointer"
            alt="delete"
            onClick={() => handleDeleteImage()}
          />
        </div>
      ) : (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-semibold text-[#c3073f] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#c3073f] focus-within:ring-offset-2 hover:text-[#c3073f]/70"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={(e) => handleFileUpload(e)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
