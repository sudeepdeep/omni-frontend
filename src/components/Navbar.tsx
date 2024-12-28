/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { UIStore } from "../Store";

const navList = [
  { url: "/local", text: "Local" },
  { url: "/state", text: "State" },
  { url: "/country", text: "Country" },
  { url: "/world", text: "World" },
  {
    url: "/stocks",
    text: "Stocks",
    subMenu: [
      { url: "/stocks/national", text: "National" },
      { url: "/stocks/international", text: "International" },
    ],
  },
  {
    url: "/economics",
    text: "Economics",
    subMenu: [
      { url: "/economics/national", text: "National" },
      { url: "/economics/international", text: "International" },
    ],
  },
  {
    url: "/politics",
    text: "Politics",
    subMenu: [
      { url: "/politics/national", text: "National" },
      { url: "/politics/international", text: "International" },
    ],
  },
  {
    url: "/login",
    text: "Login",
  },
];
function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const uiStore = UIStore.useState();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleDropdownToggle = (text: string) => {
    setActiveDropdown((prev) => (prev === text ? null : text));
  };

  console.log(isMenuOpen);

  return (
    <header className="w-[85%] h-[10vh] bg-white flex mx-auto">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="text-lg font-bold">ABLOGS</div>
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
            <div key={navItem.text} className="relative group">
              <a
                href={navItem.url}
                className="block px-4 py-2 text-gray-700 hover:text-blue-500 lg:py-0"
              >
                {navItem.text}
              </a>
              {navItem.subMenu && (
                <div
                  className={`absolute z-50 left-0 top-full bg-white shadow-lg border rounded-lg py-2 w-[200px] lg:hidden group-hover:block ${
                    activeDropdown === navItem.text ? "block" : "hidden"
                  }`}
                >
                  {navItem.subMenu.map((subItem) => (
                    <a
                      key={subItem.text}
                      href={subItem.url}
                      className="block px-4 py-2 text-gray-600 hover:text-blue-500"
                    >
                      {subItem.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
