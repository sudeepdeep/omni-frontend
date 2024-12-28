import React from "react";

function FeedPost({ news }: any) {
  return (
    <div className="w-full rounded-md bg-white shadow-md mb-4 p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={"https://via.placeholder.com/50?text=User"}
            alt="Author"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-600">Author Name</p>
            <p className="text-xs text-gray-500">Journalist</p>
          </div>
          <div></div>
        </div>
        <p className="text-xs text-gray-400">
          {new Date(news.date).toDateString()}
        </p>
      </div>
      <h2 className="text-md font-bold text-gray-800">{news.title}</h2>
      <p className="text-sm text-gray-600">{news.snippet}</p>
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
    </div>
  );
}

export default FeedPost;
