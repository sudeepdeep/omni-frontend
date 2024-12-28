import React, { useState } from "react";
import { ArticlesIcon, ImagesIcon } from "../../../assets/Icons";
import { UploadPhoto } from "../../ImageUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UploadPost() {
  const [value, setValue] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  return (
    <div className="h-[15vh] w-[95%] mx-auto bg-white p-[10px]">
      <p
        onClick={handleOpenPopup}
        className="w-[80%] mx-auto text-gray-500 cursor-pointer border-2 h-[40px] rounded-xl flex justify-start pl-[10px] items-center"
      >
        Post something you know..!
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
          <div className="bg-white rounded-lg w-[90%] max-w-[500px] p-5 shadow-lg relative h-[70vh] overflow-y-auto">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-4">Create a Post</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border rounded-md p-2"
              />
              <ReactQuill theme="snow" value={value} onChange={setValue} />;
              <UploadPhoto
                title={"Upload Custom Image"}
                handleChange={(e) => {
                  console.log(e);
                }}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPost;
