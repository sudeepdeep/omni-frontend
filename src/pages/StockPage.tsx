import React from "react";
import { useParams } from "react-router-dom";
import StockDashboard from "../components/Stocks/StockDashboard";
import NationalStockDashboard from "../components/StocksNational/NationalStockDashboard";

function StockPage() {
  const { type } = useParams<{ type: string }>();
  if (type === "international") {
    return <StockDashboard />;
  } else if (type === "national") {
    return <NationalStockDashboard />;
  } else {
    return <div>Invalid stock type</div>;
  }
}

export default StockPage;
