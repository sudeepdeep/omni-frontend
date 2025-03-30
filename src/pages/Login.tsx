import Cookies from "js-cookie";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/earth.json";
import { Button } from "../components/Button";
import Logo from "../components/Logo";
import TextField, { TextField2 } from "../components/TextField";
import axios, { axiosErrorToast } from "../utils/axios";
import { ShowOffIcon, ShowOnIcon } from "../assets/Icons";
import Logo_UI from "../assets/CIVIC.png";
import GoogleAuth from "../components/GoogleAuth";
import UIStore, { UserDetailsStore } from "../Store";
import { handleStoreUserDetails } from "../utils/service";

const Login: React.FC = () => {
  const existingUserCheck = Cookies.get("token");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (existingUserCheck) {
      navigate("/");
    }
  }, [existingUserCheck, navigate]);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", { username, password });

      setLoading(false);
      if (res.data.access_token) {
        Cookies.set("token", res.data.access_token);
        Cookies.set("userId", res.data.userId);
        Cookies.set("username", username);

        // Wait for user details to be stored before redirecting
        const data_ = await handleStoreUserDetails(res.data.userId);
        if (data_) {
          Cookies.set("profileUrl", data_.user?.profileUrl);
          let data: any = {
            firstName: data_.user?.firstName,
            lastName: data_.user?.lastName,
            address: data_.user?.address,
            dateOfJoin: data_.user?.dateOfJoin,
            email: data_.user?.email,
            licenseNo: data_.user?.licenseNo,
            role: data_.user?.role,
            username: data_.user?.username,
            bio: data_.user?.bio,
            profileUrl: data_.user?.profileUrl,
          };
          localStorage.setItem("userDetails", JSON.stringify(data));
          UserDetailsStore.update((s) => {
            s.firstName = data_.user?.firstName;
            s.lastName = data_.user?.lastName;
            s.address = data_.user?.address;
            s.dateOfJoin = data_.user?.dateOfJoin;
            s.email = data_.user?.email;
            s.licenseNo = data_.user?.licenseNo;
            s.role = data_.user?.role;
            s.username = data_.user?.username;
            s.bio = data_.user?.bio;
            s.profileUrl = data_.user?.profileUrl;
          });
        }

        UIStore.update((s) => {
          s.userLoggedIn = true;
          s.username = username;
          s.userId = res.data.userId;
          s.profileUrl = data_.user.profileUrl;
        });

        navigate("/");
      }
    } catch (err: any) {
      setLoading(false);
      axiosErrorToast(err);
    }
  };

  return (
    <div className="w-full min-h-[100vh] h-auto flex flex-col items-center justify-between pt-2">
      <div className="authCard w-[300px]">
        <div className="w-[150px] mx-auto">
          <img
            src={Logo_UI}
            alt="logo"
            width="80"
            height="80"
            className="mx-auto rounded-full"
          />
        </div>
        <div className="logo pb-3">
          <span className="flex gap-1 justify-center text-black">
            Sign in to <Logo />
          </span>
        </div>
        <div className="w-[300px] md:bg-gray-300 bg-transparent md:p-3 rounded-md flex flex-col gap-2">
          <TextField2
            name="username"
            title="Username"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            sx={"bg-white"}
          />

          <TextField2
            name="password"
            type="password"
            title="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            onIcon={<ShowOnIcon />}
            offIcon={<ShowOffIcon />}
            sx={"bg-white"}
          />
          <Button
            disabled={loading}
            text={"Login"}
            loading={loading}
            handleSubmit={handleLogin}
            sx={"h-[40px] bg-primary"}
          />
          {/* <p
            onClick={() => navigate("/audio-login")}
            className="cursor-pointer text-right text-slate-300"
          >
            Login with audio 🗣
          </p> */}
        </div>
        {/* <p className="text-slate-400 text-center mt-3">or</p>
        <Button
          disabled={loading}
          text={"Login as Guest"}
          handleSubmit={() => navigate("/")}
          sx={"h-[40px] bg-transparent"}
        /> */}
        <div className="text-black text-center my-2">OR</div>

        <GoogleAuth />
        <div className="mt-[10px] h-[50px] border-2 border-primary rounded-md flex gap-2 justify-center items-center">
          <h4 className="font-normal text-black ">
            New user?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Create an account
            </span>
          </h4>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={Logo_UI} width={28} />
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
};

export default Login;
