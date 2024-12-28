import { Outlet } from "react-router-dom";
import { checkUserLoggedIn } from "../utils/service";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { UIStore } from "../Store";
import Cookies from "js-cookie";

function AppLayout() {
  const currentPath = window.location.pathname;
  const uiStore = UIStore.useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    if (Cookies.get("token")) {
      setUserLoggedIn(true);
      console.log(Cookies.get("token"), "token");
      // checkUserLoggedIn();
    }
  }, []);
  checkUserLoggedIn();
  return (
    <div className="min-h-[100vh] h-auto  font-poppins">
      <Navbar />
      {uiStore.userLoggedIn && currentPath !== "/" ? (
        <div className="flex md:flex-row flex-col items-start">
          <SideBar />
          <Outlet />
        </div>
      ) : (
        <div className="bg-[#F4F2EE]">
          <Outlet />
        </div>
      )}
      {/* 
      <div className="flex md:flex-row flex-col items-start">
        <SideBar />
        <Outlet />
      </div> */}
    </div>
  );
}

export default AppLayout;
