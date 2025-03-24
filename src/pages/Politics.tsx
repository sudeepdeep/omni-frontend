import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StockDashboard from "../components/Stocks/StockDashboard";
import NationalStockDashboard from "../components/StocksNational/NationalStockDashboard";
import axios from "axios";
import Feed from "../components/Home/Feed/Feed";

function Politics() {
  const { type } = useParams<{ type: string }>();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handlePoliticsAPI() {
    setLoading(true);
    const options = {
      method: "POST",
      url: "https://newsnow.p.rapidapi.com/newsv2_top_news_cat",
      headers: {
        "x-rapidapi-key": "d4c8a67a12msh8eb9f10bf7d21d8p1b3744jsn6dc8f6d6a3bd",
        "x-rapidapi-host": "newsnow.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        category: "POLITICS",
        location: type === "international" ? "US" : "IN",
        language: "en",
        page: 1,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setLoading(false);
      setNews(response.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    handlePoliticsAPI();
  }, [type]);

  return (
    <>
      <Feed politics={news} loading={loading} />
    </>
  );
}

export default Politics;
