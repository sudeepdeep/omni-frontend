import React from "react";
import LOGO_UI from "../../../assets/CIVIC.png";

function PopularNews() {
  return (
    <div className="">
      {/* <b>Popular News Papers</b>
      <div className="flex gap-[10px] flex-wrap">
        {popularNews.map((pn): any => (
          <div className="w-[50px] h-[50px] overflow-hidden rounded-lg">
            <img
              src={pn.image}
              className="w-full h-full object-cover cursor-pointer"
              alt="newspaper"
            />
          </div>
        ))}
      </div> */}
      <div className="flex flex-col justify-center items-center">
        <img src={LOGO_UI} width={28} />
        <p className="text-[10px]">© 2025 Civic Reports</p>
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-[#1DB954d9]">
            <a href="/about-us">About</a>
          </p>
          <p className="text-gray-400">|</p>
          <p className="text-[10px] text-[#1DB954d9]">
            <a href="/privacy-policy">Privacy</a>
          </p>
          <p className="text-gray-400">|</p>
          <p className="text-[10px] text-[#1DB954d9]">
            <a href="/terms-of-service">Terms</a>
          </p>
          <p className="text-gray-400">|</p>
          <p className="text-[10px] text-[#1DB954d9]">
            <a href="/community-guidelines">Guidelines</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PopularNews;
