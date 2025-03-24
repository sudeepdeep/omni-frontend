import React from "react";

const colorPalettes = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
];

interface DefaultLogoProps {
  firstLetter: string;
}

const DefaultLogo: React.FC<DefaultLogoProps> = ({ firstLetter }) => {
  const randomColor =
    colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg ${randomColor}`}
    >
      {firstLetter?.toUpperCase()}
    </div>
  );
};

export default DefaultLogo;
