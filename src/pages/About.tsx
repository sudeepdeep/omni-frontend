/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Pag1 from "../assets/cr-01.png";
import Pag2 from "../assets/cr-02.png";
import Pag3 from "../assets/cr-03.png";
import Pag4 from "../assets/cr-04.png";
import Pag5 from "../assets/cr-05.png";
import Pag6 from "../assets/cr-06.png";
import Pag7 from "../assets/cr-07.png";
import logo from "../assets/CIVIC.png";
import footer from "../assets/footer-cr.jpg";
import {
  Bars3Icon,
  XMarkIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: "Explore", href: "works" },
  { name: "About Us", href: "about" },
  { name: "Contact Us", href: "contact" },
];

const products = [
  {
    name: "CIVIC REPORTS SITE",
    description:
      "Civic Reports is a dynamic news platform where users can log in, create, and share news stories across various categories, including Local, State, National, World, Business, Stocks, and Politics. Whether you're reporting breaking news, sharing insights, or keeping up with global trends, our platform empowers you to be part of the conversation.With seamless news posting, bookmarking features, and an interactive community, Civic Reports ensures that news is not just consumed but also contributed by the people. Stay informed, share your perspective, and engage with news that matters to you!",
    images: [Pag1, Pag2, Pag3, Pag4, Pag5, Pag6, Pag7],
    key: "pag",
  },
];

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  function handleScroll(href: string): void {
    document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
  }

  const [imageClick, setImageClick] = useState(false);

  const [imgKey, setImgKey] = useState("");
  const [imgIndex, setImgIndex] = useState("");

  function changeState(key: any, index: any) {
    setImageClick(!imageClick);
    setImgKey(key);
    setImgIndex(index);
  }

  function handleClose() {
    setImageClick(false);
  }

  return (
    <div>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-6 lg:px-8"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Varma metal fabrications</span>
                <img alt="" src={logo} className="h-8 w-auto" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <p
                  key={item.name}
                  className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
                  onClick={() => handleScroll(item.href)}
                >
                  {item.name}
                </p>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {/* <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a> */}
            </div>
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Varma metal fabrications</span>
                  <img alt="" src={logo} className="h-8 w-auto" />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <p
                        key={item.name}
                        className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
                        onClick={() => handleScroll(item.href)}
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                  <div className="py-6">
                    {/* <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a> */}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#1DB954] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl sm:py-28">
            <div className="flex justify-center">
              <img src={logo} width={120} />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                CIVIC REPORTS
              </h1>

              <div className="sm:mb-8 sm:flex sm:justify-center mt-2">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600  ring-0 md:ring-1  md:ring-gray-900/10 hover:ring-gray-900/20">
                  From Local Streets to Global Beats{" "}
                </div>
              </div>
              <div className="flex flex-col md:flex-row max-w-xl m-auto">
                <div className="group relative  flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-8 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                    />
                  </div>
                  <div>
                    <p className="mt-1 text-gray-600">
                      civicreportsoffl@gmail.com
                    </p>
                  </div>
                </div>

                <div className="group relative max-w-xl m-auto flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-6 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <MapPinIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                    />
                  </div>
                  <div>
                    <p className="mt-1 text-left text-gray-600">
                      Hyderabad, India
                    </p>
                  </div>
                </div>

                {/* <div className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex h-8 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </div>
                <div>
                  <p className="mt-1 text-gray-600">+91 9381547107</p>
                </div>
              </div> */}
              </div>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#works"
                  onClick={() => handleScroll("works")}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Explore<span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1DB954] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      <div id="works">
        {imageClick && (
          <Images imgKey={imgKey} imgIndex={imgIndex} onClose={handleClose} />
        )}
        {products.map((product, index) => (
          <div
            key={index}
            className="relative overflow-hidden h-[1000px] md:h-auto mt-[100px]"
          >
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
              <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                <div className="sm:max-w-lg">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    {product.name}
                  </h1>
                  <p className="mt-4 text-xl text-gray-500 text-left">
                    {product.description}
                  </p>
                </div>
                <div>
                  <div className="mt-10">
                    <div
                      aria-hidden="true"
                      className=" lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                    >
                      <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="cursor-pointer h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                              <img
                                onClick={() => changeState(product.key, 0)}
                                alt=""
                                src={product.images[0]}
                                className="h-full w-full object-cover object-center cursor-pointer"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                onClick={() => changeState(product.key, 1)}
                                alt=""
                                src={product.images[1]}
                                className="h-full w-full object-cover object-center cursor-pointer"
                              />
                            </div>
                          </div>
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                onClick={() => changeState(product.key, 2)}
                                alt=""
                                src={product.images[2]}
                                className="h-full w-full object-cover object-center cursor-pointer"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                onClick={() => changeState(product.key, 3)}
                                alt=""
                                src={product.images[3]}
                                className="h-full w-full object-cover object-center cursor-pointer"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                onClick={() => changeState(product.key, 4)}
                                alt=""
                                src={product.images[4]}
                                className="h-full w-full object-cover object-center cursor-pointer"
                              />
                            </div>
                          </div>
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                onClick={() => changeState(product.key, 2)}
                                alt=""
                                src={product.images[5]}
                                className="h-full w-full object-cover object-center cursor-pointer"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                onClick={() => changeState(product.key, 4)}
                                alt=""
                                src={product.images[6]}
                                className="h-full w-full object-cover object-center cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="inline-flex items-center justify-center w-full mt-[300px]">
            <hr class="w-[80%] h-px my-8 bg-gray-300 border-0 dark:bg-gray-300" />
          </div> */}
          </div>
        ))}
      </div>

      <AboutUS />

      <Footer />
    </div>
  );
}

const imageData = [{ key: "pag", images: [Pag1, Pag2, Pag3, Pag4, Pag5] }];

function Images({ imgKey, imgIndex, onClose }: any) {
  const [open, setOpen] = useState(true);

  const imgPath: any = imageData.find((item) => item.key == imgKey);

  console.log(imageData, imgKey, imgIndex);

  function handleDialogClose() {
    setOpen(false);
    onClose();
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="h-auto">
              <img
                alt=""
                src={imgPath.images[imgIndex]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={() => handleDialogClose()}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export function AboutUS() {
  return (
    <div id="about" className="w-[80%] mx-auto mt-[150px] mb-[100px]">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-[10px]">
        About Us
      </h1>

      <p className=" w-auto ml-[10px] mr-[10px] md:max-w-[60%] text-xl text-gray-500 text-left">
        At Civic Reports, we believe that news should be accessible,
        interactive, and community-driven. Our platform allows users to log in,
        post, and share news across various categories like Local, State,
        National, World, Business, Stocks, and Politics. Whether you're a
        citizen journalist or an avid news reader, Civic Reports empowers you to
        stay informed, contribute stories, and engage with a like-minded
        community. Join us in shaping the future of news—your voice matters!
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div
      id="contact"
      className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 mt-7"
    >
      <div className="bg-black absolute w-full h-full -z-10 opacity-25 top-[-10px]"></div>
      <img
        alt=""
        src={footer}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-bottom md:object-center"
      />
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="text-center  px-6 lg:px-8">
        <div className="">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Contact us
          </h2>

          <div className="flex flex-col md:flex-row max-w-xl m-auto">
            <div className="group relative  flex items-center gap-x-6 rounded-lg p-4 ">
              <div className="mt-1 flex h-8 w-11 flex-none items-center justify-center rounded-lg ">
                <EnvelopeIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-white group-hover:text-indigo-600"
                />
              </div>
              <div>
                <p className="mt-1 text-white">civicreportsoffl@gmail.com</p>
              </div>
            </div>

            <div className="group relative flex items-center gap-x-6 rounded-lg p-4 ">
              <div className="mt-1 flex h-8 w-11 flex-none items-center justify-center rounded-lg ">
                <PhoneIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-white group-hover:text-indigo-600"
                />
              </div>
              <div>
                <p className="mt-1 text-white">-</p>
              </div>
            </div>
          </div>

          <div className="group relative max-w-xl m-auto flex items-center gap-x-6 rounded-lg p-4 ">
            <div className="mt-1 flex h-6 w-11 flex-none items-center justify-center rounded-lg ">
              <MapPinIcon
                aria-hidden="true"
                className="h-6 w-6 text-white group-hover:text-indigo-600"
              />
            </div>
            <div>
              <p className="mt-1 text-left text-white">Hyderabd-India</p>
            </div>
          </div>

          {/* <div className="group relative w-[350px] m-auto flex items-center gap-x-6 rounded-lg p-4">
            <div className="mt-1 flex h-8 w-11 flex-none items-center justify-center rounded-lg">
              <EnvelopeIcon
                aria-hidden="true"
                className="h-6 w-6 text-white group-hover:text-indigo-600"
              />
            </div>
            <div>
              <p className="mt-1 text-white">ajithvarma7107@gmail.com</p>
            </div>
          </div>

          <div className="group relative w-[350px] m-auto flex items-center gap-x-6  rounded-lg p-4 ">
            <div className="mt-1 flex h-8 w-11 flex-none items-center justify-center rounded-lg">
              <PhoneIcon
                aria-hidden="true"
                className="h-6 w-6 text-white group-hover:text-indigo-600"
              />
            </div>
            <div>
              <p className="mt-1 text-white">+91 9381547107</p>
            </div>
          </div>

          <div className="group relative w-[350px] m-auto flex items-center  gap-x-6 rounded-lg p-4 ">
            <div className="mt-1 flex h-6 w-11 flex-none items-center justify-center rounded-lg ">
              <MapPinIcon
                aria-hidden="true"
                className="h-6 w-6 text-white group-hover:text-indigo-600"
              />
            </div>
            <div>
              <p className="mt-1 text-left text-white">
                Near Saibaba Temple, Ramalingeswara Nagar, <br />
                Vijayawada-520007
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
