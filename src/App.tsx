import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Success from "./pages/Success";
import Logout from "./pages/Logout";
import StockPage from "./pages/StockPage";
import Politics from "./pages/Politics";
import Finance from "./pages/Finance";
import World from "./pages/World";
import Country from "./pages/Country";
import State from "./pages/State";
import { lazy } from "react";
import UserEditPage from "./pages/UserEditPage";
import NewsPage from "./pages/NewsPage";
import TermsOfService from "./pages/TermsOfService";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import About from "./pages/About";
import UserPosts from "./pages/UserPosts";
const Home = lazy(() => import("./pages/Home"));
const CommonLand = lazy(() => import("./pages/CommonLand"));

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/userposts/:userId",
          element: <UserPosts />,
        },
        {
          path: "/stocks/:type",
          element: <StockPage />,
        },
        {
          path: "/politics/:type",
          element: <Politics />,
        },
        {
          path: "/finance/:type",
          element: <Finance />,
        },
        {
          path: "/world",
          element: <CommonLand />,
        },
        {
          path: "/country",
          element: <CommonLand />,
        },
        {
          path: "/state",
          element: <Home />,
        },
      ],
    },
    {
      path: "/:userId/edit",
      element: <UserEditPage />,
    },

    {
      path: "/:id/news",
      element: <NewsPage />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "logout",
      element: <Logout />,
    },
    {
      path: ":username",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "community-guidelines",
      element: <CommunityGuidelines />,
    },
    {
      path: "about-us",
      element: <About />,
    },
    {
      path: "terms-of-service",
      element: <TermsOfService />,
    },
    {
      path: "success",
      element: <Success />,
    },
  ]);

  return (
    <div className="font-poppins">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
