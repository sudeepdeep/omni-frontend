import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UIStore } from "./Store";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Success from "./pages/Success";
import Logout from "./pages/Logout";

function App() {
  const uiStore = UIStore.useState();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
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
