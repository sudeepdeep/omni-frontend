/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import UIStore from "../Store";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultImage from "./DefaultImage";
import Logo from "./Logo";
import LogoUI from "../assets/CIVIC.png";

function Navbar() {
  const location = useLocation();
  console.log(location, "asd");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const ui = UIStore.useState();
  const navigate = useNavigate();

  console.log(ui);

  const navList = [
    { url: "/", text: "Local", param: "local&appName=civicreports" },
    { url: "/state", text: "State", param: "state&appName=civicreports" },
    {
      url: "/country",
      text: "Country",
      param: "national&appName=civicreports",
    },
    { url: "/world", text: "World", param: "international&appName=combined" },
    {
      url: "/stocks",
      text: "Stocks",
      subMenu: [
        {
          url: "/stocks/national",
          text: "National",
          param: "stocks&subPage=national&appName=others",
        },
        {
          url: "/stocks/international",
          text: "International",
          param: "stocks&subPage=international&appName=others",
        },
      ],
    },
    // {
    //   url: "/finance",
    //   text: "Finance",
    //   subMenu: [
    //     {
    //       url: "/finance/national",
    //       text: "National",
    //       param: "finance&subPage=national&appName=others",
    //     },
    //     {
    //       url: "/finance/international",
    //       text: "International",
    //       param: "finance&subPage=international&appName=others",
    //     },
    //   ],
    // },
    {
      url: "/politics",
      text: "Politics",
      subMenu: [
        {
          url: "/politics/national",
          text: "National",
          param: "politics&subPage=national&appName=civicreports",
        },
        {
          url: "/politics/international",
          text: "International",
          param: "politics&subPage=international&appName=combined",
        },
      ],
    },
    {
      url: "/user",
      text: ui.userLoggedIn ? (
        ui.profileUrl != "" ? (
          <>
            <img
              className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={ui.profileUrl}
              alt="Bordered avatar"
            />
          </>
        ) : (
          <DefaultImage />
        )
      ) : (
        "Login"
      ),
      subMenu: ui.userLoggedIn && [
        {
          url: `/${ui.userId}/edit`,
          text: ui.username,
          param: "",
        },
        {
          url: `/userposts/${ui.userId}`,
          text: "My Posts",
          param: "",
        },
        {
          url: "/logout",
          text: "Logout",
          param: "",
        },
      ],
    },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleDropdownToggle = (text: string) => {
    setActiveDropdown((prev) => (prev === text ? null : text));
  };

  function handleRoutelogin(url: any) {
    navigate(url);
  }

  console.log(isMenuOpen);

  return (
    <header className="w-[85%] h-[10vh] bg-white flex mx-auto">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="flex gap-2 items-center">
          <img src={LogoUI} width={30} />
          <div className="mt-1">
            <Logo />
          </div>
        </div>
        <button
          className="lg:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <nav
          className={`flex-col lg:flex-row lg:flex ${
            isMenuOpen ? "flex" : "hidden"
          } lg:items-center lg:gap-6 absolute lg:static top-[10%] left-0 w-full lg:w-auto bg-white z-10`}
        >
          {navList.map((navItem) => (
            <div key={navItem.url} className="relative group">
              {navItem.subMenu ? (
                <>
                  <div
                    className={`block px-4 py-2 hover:text-primary lg:py-0 ${
                      location.pathname === navItem.url
                        ? "text-primary font-bold"
                        : "text-gray-600 hover:text-primary"
                    }`}
                  >
                    {navItem.text}
                  </div>
                  <div
                    className={`absolute z-50 left-0 top-full bg-white shadow-lg border rounded-lg py-2 w-[200px] lg:hidden group-hover:block ${
                      activeDropdown === navItem.text ? "block" : "hidden"
                    }`}
                  >
                    {navItem.subMenu.map((subItem) => (
                      <a
                        key={subItem.text}
                        href={subItem.url + "?page=" + subItem.param}
                        className={`cursor-pointer  block px-4 py-2 ${
                          location.pathname === subItem.url
                            ? "text-primary font-bold"
                            : "text-gray-600 hover:text-primary"
                        }`}
                      >
                        {subItem.text}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  className={`block cursor-pointer px-4 py-2 hover:text-primary lg:py-0 ${
                    location.pathname === navItem.url
                      ? "text-primary font-bold"
                      : "text-gray-600 hover:text-primary"
                  }`}
                  href={navItem.url + "?page=" + navItem.param}
                >
                  {navItem.text}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
