import React, { useEffect } from "react";
import HomeLayout from "../layout/HomeLayout";
import Feed from "../components/Home/Feed/Feed";
import UIStore from "../Store";
import { useNavigate, useSearchParams } from "react-router-dom";

function Home() {
  const ui = UIStore.useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page");
    const appName = searchParams.get("appName");

    if (!page || !appName) {
      const newParams = new URLSearchParams(searchParams);
      if (!page) newParams.set("page", "local");
      if (!appName) newParams.set("appName", "omniblogs");

      navigate(`?${newParams.toString()}`, { replace: true });
    }
  }, [navigate, searchParams]);
  console.log(ui);
  return (
    <div className="h-[100%]">
      <Feed />
    </div>
  );
}

export default Home;
