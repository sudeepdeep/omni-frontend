import React, { useEffect, useState } from "react";
import { AlertTriangle, Flame, Clock, Star, FileText } from "lucide-react";

interface TagBadgeProps {
  tag: string;
}

const tagStyles: Record<
  string,
  { icon: JSX.Element; bg: string; text: string }
> = {
  breaking: {
    icon: <AlertTriangle size={16} />,
    bg: "bg-red-500",
    text: "text-white",
  },
  trending: {
    icon: <Flame size={16} />,
    bg: "bg-orange-500",
    text: "text-white",
  },
  "Breaking News": {
    icon: <AlertTriangle size={16} />,
    bg: "bg-red-500",
    text: "text-white",
  },
  "Trending News": {
    icon: <Flame size={16} />,
    bg: "bg-orange-500",
    text: "text-white",
  },
  upcoming: {
    icon: <Clock size={16} />,
    bg: "bg-blue-500",
    text: "text-white",
  },
  exclusive: {
    icon: <Star size={16} />,
    bg: "bg-yellow-500",
    text: "text-black",
  },
  analysis: {
    icon: <FileText size={16} />,
    bg: "bg-purple-500",
    text: "text-white",
  },
  default: {
    icon: <FileText size={16} />,
    bg: "bg-gray-500",
    text: "text-white",
  },
};

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
  const style = tagStyles[tag] || tagStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
    >
      {style.icon}
      {tag.charAt(0).toUpperCase() + tag.slice(1)}
    </span>
  );
};

export const TagBadge2: React.FC<{
  tag: string;
  selectedTag: string | null;
  handleClick: (tag: string) => void;
}> = ({ tag, selectedTag, handleClick }) => {
  const style = tagStyles[tag] || tagStyles.default;
  let isSelected = selectedTag === tag;

  function handleCheckClick(tag: any) {
    if (selectedTag == tag) {
      isSelected = false;
      handleClick("");
    } else {
      handleClick(tag);
    }
  }

  return (
    <div
      className={`rounded-full p-1 ${isSelected ? "border-[3px]" : "border-0"}`}
    >
      <span
        onClick={() => handleCheckClick(tag)}
        className={`inline-flex items-center gap-1 px-2 py-2 rounded-full text-xs font-medium cursor-pointer ${style.bg} ${style.text}`}
      >
        {style.icon}
        {tag}
      </span>
    </div>
  );
};

export default TagBadge;
