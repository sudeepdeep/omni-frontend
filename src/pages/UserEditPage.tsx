import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { checkUserLoggedIn } from "../utils/service";
import UIStore, { UserDetailsStore } from "../Store";
import Navbar from "../components/Navbar";
import { TextField2 } from "../components/TextField";
import axios, { axiosErrorToast } from "../utils/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Button2 } from "../components/Button";
import { UploadPhoto, UploadPhoto2 } from "../components/ImageUpload";

interface UserData {
  username: string;
  password: string;
  repassword: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: string;
  dateOfJoin: string;
  address: string;
  licenseNo: string;
  profileUrl: string;
}

function UserEditPage() {
  const { userId } = useParams();
  const [preImage, setPreImage] = useState("");
  const user: any = UserDetailsStore.useState();
  const ui = UIStore.useState();
  const [loading, setLoading] = useState(false);
  console.log(user);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
    repassword: "",
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    role: "",
    dateOfJoin: "",
    address: "",
    licenseNo: "",
    profileUrl: "",
  });

  function handleUserLoggedIn() {
    axios
      .get(`/user/${userId}/my-profile`)
      .then((res) => {
        console.log(res);
        if (res.data && res.data.user) {
          let data: any = {
            firstName: res.data.user?.firstName,
            lastName: res.data.user?.lastName,
            address: res.data.user?.address,
            dateOfJoin: res.data.user?.dateOfJoin,
            licenseNo: res.data.user?.licenseNo,
            role: res.data.user?.role,
            email: res.data.user?.email,
            bio: res.data.user?.bio,
            username: res.data.user?.username,
            profileUrl: res.data.user?.profileUrl,
          };
          setPreImage(res.data.user?.profileUrl ?? "");
          setUserData(data);
          UIStore.update((s) => {
            s.profileUrl = res.data.user?.profileUrl ?? "";
          });
          Cookies.set("username", res.data.user.username);
          Cookies.set("profileUrl", res.data.user?.profileUrl ?? "");

          // setres.data.user?({ ...userData, password: "" });
          checkUserLoggedIn();
        }
      })
      .catch((err) => {
        axiosErrorToast(err);
      });
  }
  useEffect(() => {
    console.log(ui);
    if (ui.userLoggedIn) {
      setUserData(user);
    } else {
      handleUserLoggedIn();
    }
  }, []);

  const handleInputChange = (e: any) => {
    console.log(e);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (e: any) => {
    console.log(e);
    setUserData({ ...userData, profileUrl: e });
  };

  const handleSubmit = () => {
    console.log(userData);
    setLoading(true);
    let data = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userData.address,
      dateOfJoin: userData.dateOfJoin,
      licenseNo: userData.licenseNo,
      role: userData.role,
      email: userData.email,
      bio: userData.bio,
      username: userData.username,
      profileUrl: userData.profileUrl ?? "",
    };
    axios
      .put(`/user/${userId}`, data)
      .then((res) => {
        toast.success("Details updated successfully");
        console.log(res);
        setLoading(false);
        if (res.status == 200) {
          UserDetailsStore.update((s) => {
            s.firstName = userData.firstName;
            s.lastName = userData.lastName;
            s.address = userData.address;
            s.dateOfJoin = userData.dateOfJoin;
            s.licenseNo = userData.licenseNo;
            s.role = userData.role;
            s.email = userData.email;
            s.bio = userData.bio;
            s.username = userData.username;
            s.profileUrl = userData.profileUrl;
          });
          UIStore.update((s) => {
            s.profileUrl = userData.profileUrl;
          });
          Cookies.set("username", userData.username);
          Cookies.set("profileUrl", userData.profileUrl);
        }
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  };

  return (
    <div className="min-h-[100vh] h-auto  font-poppins">
      <Navbar />
      <div className="bg-[#F4F2EE]">
        <div className=" max-w-4xl mx-auto rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Edit Profile
          </h2>
          <UploadPhoto2
            title={"Upload Profile Image"}
            handleChange={(e) => handleUploadImage(e)}
            setPreImage={setPreImage}
            preImage={preImage}
          />
          <br />
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <TextField2
              name="firstName"
              type="text"
              title="First Name"
              onChange={(e) => handleInputChange(e)}
              value={userData.firstName}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            {/* Last Name */}
            <TextField2
              name="lastName"
              type="text"
              title="Last Name"
              onChange={handleInputChange}
              value={userData.lastName}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            {/* Email */}
            <TextField2
              name="email"
              type="email"
              title="Email"
              onChange={handleInputChange}
              value={userData.email}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            {/* Username */}
            <TextField2
              name="username"
              type="text"
              title="Username"
              onChange={handleInputChange}
              value={userData.username}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            {/* Password */}
            <TextField2
              name="password"
              type="password"
              title="New Password"
              onChange={handleInputChange}
              value={userData.password}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            {/* Confirm Password */}
            <TextField2
              name="repassword"
              type="password"
              title="Confirm New Password"
              onChange={handleInputChange}
              value={userData.repassword}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            {/* Role */}
            <TextField2
              name="role"
              type="text"
              title="Role"
              onChange={handleInputChange}
              value={userData.role}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            {/* Date of Joining */}
            <TextField2
              name="dateOfJoin"
              type="date"
              title="Date of Joined"
              onChange={handleInputChange}
              value={userData.dateOfJoin}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            <TextField2
              name="licenseNo"
              type="text"
              title="License No"
              onChange={handleInputChange}
              value={userData.licenseNo}
              sx="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2 w-full"
            />

            {/* Bio */}
            <div className="col-span-1 md:col-span-2">
              <label className="text-gray-700 font-medium mb-1 block">
                Bio
              </label>
              <textarea
                name="bio"
                rows={3}
                onChange={handleInputChange}
                value={userData.bio}
                className="w-full bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="text-gray-700 font-medium mb-1 block">
                Address
              </label>
              <textarea
                name="address"
                rows={3}
                onChange={handleInputChange}
                value={userData.address}
                className="w-full bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2"
                placeholder="Enter address"
              ></textarea>
            </div>
          </form>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <Button2
              handleSubmit={handleSubmit}
              text="Save Changes"
              loading={loading}
              sx="w-[200px] mx-auto font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditPage;
