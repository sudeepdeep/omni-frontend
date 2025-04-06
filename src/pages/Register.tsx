import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo_UI2 from "../assets/CIVIC.png";
import { Button } from "../components/Button";
import Logo, { LogoMain } from "../components/Logo";
import { TextField2 } from "../components/TextField";
import axios, { axiosErrorToast } from "../utils/axios";

import buttonLoading from "../assets/buttonloading.json";
import {
  CorrectIcon,
  ShowOffIcon,
  ShowOnIcon,
  WrongIcon,
} from "../assets/Icons";
import GoogleAuth from "../components/GoogleAuth";
import { AnimationLoading } from "../components/Loading";

import UIStore from "../Store";

// Define a type for userData
interface UserData {
  username: string;
  password: string;
  repassword: string;
  email: string;
  firstName: string;
  lastName: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userAvailable, setUserAvailable] = useState<boolean | null>(null);
  const [userAvailableLoading, setUserAvailableLoading] = useState<
    boolean | null
  >(null);

  const existingUser = Cookies.get("token");

  // Define state with typed user data
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
    repassword: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  // If a token exists, remove it (this ensures a fresh state)
  useEffect(() => {
    console.log("called");
    if (existingUser) {
      // Cookies.remove("token");
    }
  }, [existingUser]);

  // Check if the username is available
  useEffect(() => {
    const delay = 2000; // 5 seconds delay
    let handler: NodeJS.Timeout;
    if (userData.username.length > 5) {
      setUserAvailableLoading(true);
      handler = setTimeout(() => {
        handleCheckUsernameAvailable(userData.username);
      }, delay);
    }
    setUserAvailable(null);
    return () => {
      clearTimeout(handler); // Clear timeout if user keeps typing
    };
  }, [userData.username]);

  // Registration logic
  const handleRegister = () => {
    setLoading(true);

    axios
      .post("/auth/registration", {
        username: userData.username,
        password: userData.password,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      })
      .then((res) => {
        setLoading(false);

        UIStore.update((s) => {
          s.userLoggedIn = true;
          s.username = userData.username;
          s.userId = res.data.userId;
        });

        console.log(res.data, "responsedata");
        Cookies.set("username", userData.username);
        Cookies.set("token", res.data.access_token);
        Cookies.set("userId", res.data.userId);
        window.location.href = "/success";
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  };

  // Username availability check
  const handleCheckUsernameAvailable = (username: string) => {
    axios.get(`/user/${username}/check-username`).then((res) => {
      if (res.data.success === "true") {
        setUserAvailableLoading(false);
        setUserAvailable(true);
      } else {
        setUserAvailableLoading(false);
        setUserAvailable(false);
      }
    });
  };

  // Toggle password visibility
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="main min-h-[100vh] w-full h-auto flex flex-col md:flex-row">
        <div className="left flex w-full md:w-[50%] h-[400px] md:h-auto bg-black relative md:bg-transparent text-white md:text-black md:flex-col flex-col-reverse justify-center md:justify-center md:items-center">
          <div className=" flex flex-col items-center md:pt-[0px] pt-[80px]">
            <p className="md:text-[17px] text-[15px]">
              Create your <span className="text-primary">free</span> account
            </p>
            {/* <p className=" text-[12px]">& stay updated.</p> */}
          </div>
          <img className="hidden md:block h-[25vh]" src={Logo_UI2} />
          <div className="text-center">
            <LogoMain />

            <p className="text-[12px]">From Local Streets to Global Beats</p>
          </div>

          <img
            className="absolute md:hidden block left-[35%] top-[87%]"
            width={100}
            src={Logo_UI2}
          />
        </div>
        <div className="right w-full md:w-[50%] flex flex-col justify-center items-center md:mt-[0px] mt-[30px]">
          <div className="w-full mt-6 h-auto md:text-right text-center md:mr-[20px] md:mb-[0px] mb-[20px]">
            <h4 className="font-normal text-black">
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign in ➞
              </span>
            </h4>
          </div>
          <div className="md:w-[60%] w-[80%] md:p-3 rounded-md flex flex-col gap-2">
            <div className="flex w-full font-bold text-[12px]">
              <p className="text-xl">
                Sign up to <Logo />
              </p>
            </div>
            <TextField2
              name="firstName"
              type="text"
              title="Enter First Name"
              onChange={(e: any) =>
                setUserData({
                  ...userData,
                  firstName: e.target.value,
                })
              }
              value={userData.firstName}
              sx={"bg-transparent"}
            />

            <TextField2
              name="lastName"
              type="email"
              title="Enter Last Name"
              onChange={(e: any) =>
                setUserData({
                  ...userData,
                  lastName: e.target.value,
                })
              }
              value={userData.lastName}
              sx={"bg-transparent"}
            />

            <TextField2
              name="username"
              title="Enter Username"
              onChange={(e: any) =>
                setUserData({
                  ...userData,
                  username: e.target.value.toLowerCase(),
                })
              }
              value={userData.username}
              sx={"bg-transparent"}
              onIcon={
                userAvailableLoading == true ? (
                  <AnimationLoading
                    animation={buttonLoading}
                    styles="w-[70px]"
                  />
                ) : userAvailable === true ? (
                  <CorrectIcon />
                ) : (
                  userAvailable === false && <WrongIcon />
                )
              }
              toolTip={
                userAvailable === true
                  ? "Username available"
                  : "Username not available"
              }
            />

            <TextField2
              name="email"
              type="email"
              title="Enter Email"
              onChange={(e: any) =>
                setUserData({
                  ...userData,
                  email: e.target.value,
                })
              }
              value={userData.email}
              sx={"bg-transparent"}
            />

            <TextField2
              name="password"
              type="password"
              title="Enter Password"
              onChange={(e: any) =>
                setUserData({
                  ...userData,
                  password: e.target.value,
                })
              }
              onIcon={<ShowOnIcon />}
              offIcon={<ShowOffIcon />}
              value={userData.password}
              sx={"bg-transparent"}
            />

            <Button
              disabled={loading || userAvailable === false}
              text="Register"
              handleSubmit={handleRegister}
              loading={loading}
              sx={"h-[40px] bg-primary"}
            />
          </div>

          <div className="text-black text-center my-2">OR</div>
          <div className="md:w-[58%] w-[78%]">
            <GoogleAuth />
          </div>

          <p className="md:w-[58%] w-[78%] text-[12px] my-[10px]">
            By creating an account, you agree to the{" "}
            <a href="/privacy-policy" className="text-primary">
              Terms of Service
            </a>
            . For more information about <Logo /> privacy practices. We'll
            occasionally send you account-related emails.
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
