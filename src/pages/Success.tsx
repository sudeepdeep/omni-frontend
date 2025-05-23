import React, { useEffect } from "react";
import Lottie from "lottie-react";
import success from "../assets/success.json";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Success() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, []);
  return (
    <div className="success bg-black h-screen w-[100%] flex flex-col justify-center items-center">
      <Lottie animationData={success} loop={false} autoplay={true} />
      <h4 className="text-white text-2xl font-poppins font-semibold text-center">
        Registered successfully.
      </h4>
    </div>
  );
}

export default Success;
