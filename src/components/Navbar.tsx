/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import UIStore from "../Store";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  console.log(location, "asd");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const ui = UIStore.useState();

  console.log(ui);

  const navList = [
    { url: "/", text: "Local", param: "local&appName=omniblogs" },
    { url: "/state", text: "State", param: "state&appName=omniblogs" },
    { url: "/country", text: "Country", param: "national&appName=omniblogs" },
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
          param: "politics&subPage=national&appName=omniblogs",
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
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
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

  console.log(isMenuOpen);

  return (
    <header className="w-[85%] h-[10vh] bg-white flex mx-auto">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="text-lg font-bold">OMNIBLOGS</div>
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
                    className={`block px-4 py-2 hover:text-blue-500 lg:py-0 ${
                      location.pathname === navItem.url
                        ? "text-blue-500 font-bold"
                        : "text-gray-600 hover:text-blue-500"
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
                        className={`block px-4 py-2 ${
                          location.pathname === subItem.url
                            ? "text-blue-500 font-bold"
                            : "text-gray-600 hover:text-blue-500"
                        }`}
                      >
                        {subItem.text}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={navItem.url + "?page=" + navItem.param}
                  className={`block px-4 py-2 hover:text-blue-500 lg:py-0 ${
                    location.pathname === navItem.url
                      ? "text-blue-500 font-bold"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
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
