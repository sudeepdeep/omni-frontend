import React from "react";
import DOMPurify from "dompurify";

function NewsCard({ news }: any) {
  const isHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);
  return (
    <div className="newsCard bg-white mb-2 p-[10px] rounded-md">
      <p className="text-[14px] font-semibold">{news.title}</p>
      {isHTML(news.snippet) ? (
        <span
          className="text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.snippet) }}
        />
      ) : (
        <p className="text-[12px]">
          {news.snippet.length > 80
            ? news.snippet.slice(0, 80) + "..."
            : news.snippet}
        </p>
      )}

      <span className="text-[10px] italic mr-[10px]">{news.date}</span>
      <a
        className="text-[10px] text-blue-500 italic"
        href={news?.url}
        target="_blank"
      >
        URL
      </a>
    </div>
  );
}

export default NewsCard;
