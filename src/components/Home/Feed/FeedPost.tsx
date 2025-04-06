import DOMPurify from "dompurify";

import DefaultLogo from "../../DefaultLogo";
import TagBadge from "../../TagBadge";
import { useEffect, useRef, useState } from "react";
import VerticalDrawer from "../../VerticalDrawer";
import FeedPopup, { GenericPopUp } from "./FeedPopup";

function FeedPost({ news, userDetails }: any) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);
  const [openUnArchive, setOpenUnArchive] = useState(false);
  const isHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);
  console.log(news, userDetails);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleEdit(postData: any) {
    console.log(postData);
    setOpenEdit(true);
  }

  function handleArchieve() {
    setOpenArchive(true);
  }
  function handleUnArchieve() {
    setOpenUnArchive(true);
  }

  function handleDelete() {
    console.log("calledd");
    setOpenDelete(true);
  }

  function handleClosePopup() {
    setOpenEdit(false);
  }

  return (
    <div className="w-full rounded-md bg-white shadow-md mb-4 p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {news.authorImage != "" ? (
            <>
              <img
                src={news.authorImage}
                alt="Author"
                className="w-12 h-12 rounded-full object-contain"
              />
            </>
          ) : (
            <>
              <DefaultLogo firstLetter={news.author[0]} />
            </>
          )}

          <div>
            <p className="text-sm font-semibold text-gray-600">{news.author}</p>
            <p className="text-xs text-gray-500">{news.role}</p>
          </div>
          <div></div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-gray-400">
            {new Date(news.date).toDateString()}
          </p>
          {news.username == userDetails.username && (
            <>
              <div className="cursor-pointer">
                <VerticalDrawer
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleArchive={handleArchieve}
                  handleUnArchive={handleUnArchieve}
                  postData={news}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <h2 className="text-md font-bold text-gray-800">{news.title}</h2>
      {isHTML(news.snippet) ? (
        <span
          className="text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.snippet) }}
        />
      ) : (
        news.snippet
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
        {news.images && news.images.length > 0 ? (
          news.images.length === 1 ? (
            <div className="col-span-full w-full h-[400px] overflow-hidden rounded-md">
              <img
                src={news.images[0]}
                alt="Single Article Image"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <>
              {news.images.slice(0, 3).map((image: string, index: number) => (
                <div
                  key={index}
                  className={`${
                    index === 2 && news.images.length > 3
                      ? "relative"
                      : "w-full h-full"
                  } overflow-hidden rounded-md`}
                >
                  <img
                    src={image}
                    alt={`Article Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 2 && news.images.length > 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg">
                      +{news.images.length - 3}
                    </div>
                  )}
                </div>
              ))}
            </>
          )
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No Images Available
          </div>
        )}
      </div>
      <a
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-500 hover:underline mt-2"
      >
        Read more
      </a>
      {openEdit && (
        <FeedPopup
          handleClosePopup={handleClosePopup}
          postData={[news]}
          type="edit"
        />
      )}
      {openDelete && (
        <GenericPopUp
          postData={[news]}
          open={openDelete}
          setOpen={setOpenDelete}
          title="Delete post"
          description="Are you sure you want to delete the post?"
          buttonText="Delete"
          type="delete"
        />
      )}

      {openArchive && (
        <GenericPopUp
          postData={[news]}
          open={openArchive}
          setOpen={setOpenArchive}
          title="Archive post"
          description="Are you sure you want to Archive the post?"
          buttonText="Archive"
          type="archive"
        />
      )}

      {openUnArchive && (
        <GenericPopUp
          postData={[news]}
          open={openUnArchive}
          setOpen={setOpenUnArchive}
          title="UnArchive post"
          description="Are you sure you want to UnArchive the post?"
          buttonText="UnArchive"
          type="unarchive"
        />
      )}
    </div>
  );
}

export function FeedPost2({ news }: any) {
  const isHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);
  console.log(news);
  return (
    <div className="w-full rounded-md bg-white shadow-md mb-4 p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {news?.authorImage != "" &&
          news?.authorImage != undefined &&
          news?.authorImage != null ? (
            <>
              <img
                src={news.authorImage}
                alt="Author"
                className="w-12 h-12 rounded-full object-contain"
              />
            </>
          ) : (
            <>
              <DefaultLogo firstLetter={news.author[0]} />
            </>
          )}

          <div>
            <p className="text-sm font-semibold text-gray-600">{news.author}</p>
            <p className="text-xs text-gray-500">{news.role ?? "Journalist"}</p>
          </div>
          <div></div>
        </div>
        <p className="text-xs text-gray-400">{news.publishedDate}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
      </div>
      <h2 className="text-md font-bold text-gray-800">{news.title}</h2>
      {isHTML(news.content) ? (
        <span
          className="text-sm text-gray-600"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(news?.content ?? news?.snippet),
          }}
        />
      ) : (
        news.content
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
        {news.imageUrl && news.imageUrl.length > 0 ? (
          news.imageUrl.length === 1 ? (
            <div className="col-span-full w-full h-[400px] overflow-hidden rounded-md">
              <img
                src={news.imageUrl[0]}
                alt="Single Article Image"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <>
              {news.imageUrl.slice(0, 3).map((image: string, index: number) => (
                <div
                  key={index}
                  className={`${
                    index === 2 && news.imageUrl.length > 3
                      ? "relative"
                      : "w-full h-full"
                  } overflow-hidden rounded-md`}
                >
                  <img
                    src={image}
                    alt={`Article Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 2 && news.imageUrl.length > 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg">
                      +{news.imageUrl.length - 3}
                    </div>
                  )}
                </div>
              ))}
            </>
          )
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No Images Available
          </div>
        )}
      </div>
      <div className="w-[100%] flex mt-1">
        {news.subCategory.map((item: any) => (
          <div className="w-[100px] gap-3">
            <TagBadge tag={item} />
          </div>
        ))}
      </div>
      <div className="w-[100%]  flex">
        {news.category.map((item: any) => (
          <div className="w-[100px] gap-3">
            <TagBadge tag={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default FeedPost;
