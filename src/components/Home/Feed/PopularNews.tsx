import React from "react";
import LOGO_UI from "../../../assets/CIVIC.png";
import Logo from "../../Logo";

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
        <p className="text-[10px]">
          © 2025 <Logo />
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-black">
            <a href="/about-us">About</a>
          </p>
          <p className="text-gray-400">|</p>
          <p className="text-[10px] text-black">
            <a href="/privacy-policy">Privacy</a>
          </p>
          <p className="text-gray-400">|</p>
          <p className="text-[10px] text-black">
            <a href="/terms-of-service">Terms</a>
          </p>
          <p className="text-gray-400">|</p>
          <p className="text-[10px] text-black">
            <a href="/community-guidelines">Guidelines</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PopularNews;
