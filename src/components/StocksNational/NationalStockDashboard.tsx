import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { createChart } from "lightweight-charts";
import Feed from "../Home/Feed/Feed";
import Loading, { MainLoader } from "../Loading";
import { indianStocks } from "../../utils/constants";

interface StockData {
  time: string;
  close: number;
}

const NationalStockDashboard: React.FC = () => {
  const [symbol, setSymbol] = useState<string>("TCS.NS");
  const [symbols, setSymbols] = useState<any>([]);
  const [price, setPrice] = useState<any>([]);
  const [volume, setVolume] = useState<any>([]);
  const [stock, setStock] = useState<any>([]);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const [chartData, setChartData] = useState<StockData[]>([]);
  const [news, setNews] = useState<any>([]);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState<string>(""); // User input query
  const [results, setResults] = useState<any[]>([]); // Search results
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading indicator
  const [debounceTimeout, setDebounceTimeout] = useState<number | undefined>();
  const [chartColor, setChartColor] = useState<string>("");
  const [minPrice, setMinPrice] = useState<any>(0);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (searchQuery: string) => {
    setIsLoading(true);
    setError("");

    try {
      const filteredResults = indianStocks.filter((stock) =>
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults(filteredResults);
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes with a debounce delay
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const newTimeout = window.setTimeout(() => {
      if (value) fetchSearchResults(value);
      else setResults([]);
    }, 500); // 500ms debounce delay

    setDebounceTimeout(newTimeout);
  };

  const handleSymbolSelect = (sym: string) => {
    setSymbol(sym);
    setQuery("");
    setResults([]);
    console.log(`Selected Symbol: ${sym}`);
    fetchStockData(sym);
    // Add additional logic to handle selected symbol
  };

  const fetchStockData = async (sym: string) => {
    setLoading(true);
    setError("");
    setChartData([]);
    setNews([]);

    try {
      const apiKey =
        process.env.REACT_APP_FINNHUB_API_KEY ??
        "ctojfdhr01qpsuefplsgctojfdhr01qpsuefplt0";
      if (!apiKey) {
        setError("API key not found. Please configure it in the .env file.");
        return;
      }

      const endTimestamp = Math.floor(Date.now() / 1000);
      const startTimestamp = endTimestamp - 30 * 24 * 60 * 60; // 30 days ago

      const options = {
        method: "GET",
        url: "https://yahoo-finance166.p.rapidapi.com/api/market/get-quote",
        params: {
          symbols: sym ?? "AAPU",
        },
        headers: {
          "x-rapidapi-key":
            "d4c8a67a12msh8eb9f10bf7d21d8p1b3744jsn6dc8f6d6a3bd",
          "x-rapidapi-host": "yahoo-finance166.p.rapidapi.com",
        },
      };

      const options_v2 = {
        method: "GET",
        url: "https://yahoo-finance166.p.rapidapi.com/api/stock/get-chart",
        params: {
          region: "US",
          range: "1d",
          symbol: sym ?? "AAPL",
          interval: "5m",
        },
        headers: {
          "x-rapidapi-key":
            "d4c8a67a12msh8eb9f10bf7d21d8p1b3744jsn6dc8f6d6a3bd",
          "x-rapidapi-host": "yahoo-finance166.p.rapidapi.com",
        },
      };

      const options_v3 = {
        method: "GET",
        url: "https://yahoo-finance166.p.rapidapi.com/api/news/list-by-symbol",
        params: {
          s: sym ?? "AAPL,GOOGL,TSLA",
          region: "US",
          snippetCount: "10",
        },
        headers: {
          "x-rapidapi-key":
            "d4c8a67a12msh8eb9f10bf7d21d8p1b3744jsn6dc8f6d6a3bd",
          "x-rapidapi-host": "yahoo-finance166.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options_v2);
        const response_2 = await axios.request(options);
        const response_3 = await axios.request(options_v3);
        console.log(response_3.data);

        setNews(response_3.data.data.main.stream);

        const data = response.data.chart.result[0];
        const timestamps = data.timestamp;
        const closes = data.indicators.quote[0].close;

        const chartData = timestamps.map((timestamp: any, index: any) => {
          const date = new Date(timestamp * 1000); // Convert Unix timestamp to Date
          let hours = date.getHours();
          const minutes = date.getMinutes();

          const period = hours >= 12 ? "PM" : "AM";
          hours = hours % 12; // Convert to 12-hour format
          hours = hours ? hours : 12; // If hours is 0, set it to 12 (12 AM or 12 PM)

          // Zero-padding for minutes
          const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
            minutes < 10 ? "0" : ""
          }${minutes} ${period}`;
          return {
            time: formattedTime,
            price: closes[index],
          };
        });
        setChartData(chartData);

        const stock = response_2.data.quoteResponse.result[0];
        setChartColor(stock.regularMarketChange > 0 ? "#4caf50" : "#f44336");
        // setStock(stock);

        const priceData = [
          { name: "Open", value: stock.regularMarketOpen },
          { name: "High", value: stock.regularMarketDayHigh },
          { name: "Low", value: stock.regularMarketDayLow },
          { name: "Price", value: stock.regularMarketPrice },
        ];
        console.log(Math.min(...chartData.map((data: any) => data.price)));
        setMinPrice(stock.regularMarketDayLow);

        // const volumeData = [
        //   { name: "Market Volume", value: stock.regularMarketVolume },
        //   { name: "Market Cap", value: stock.marketCap },
        // ];
        // setVolume(volumeData);
        setPrice(priceData);
        // setChartData(chartData);

        if (chartContainerRef.current) {
          // Initialize chart
          const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            crosshair: {
              mode: 0,
            },
            grid: {
              horzLines: {
                visible: true,
                color: "rgba(42, 46, 57, 0.1)",
              },
              vertLines: {
                visible: false,
              },
            },
          });

          chart
            .addAreaSeries({
              topColor: "rgba(0,204,255,0.3)",
              bottomColor: "rgba(0,204,255,0)",
              lineColor: "rgba(0,204,255,1)",
            })
            .setData(chartData);

          // Handle resizing
          const handleResize = () => {
            chart.resize(chartContainerRef.current!.clientWidth, 400);
          };

          window.addEventListener("resize", handleResize);

          return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
          };
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch stock data. Please try again.");
    }
  };

  useEffect(() => {
    fetchStockData(symbol);
  }, []);

  return (
    <div className="md:p-[20px]">
      <p className="text-sm p-[20px] md:p-0">National Stocks</p>
      <div
        className="text-sm p-[20px] md:p-0"
        style={{ position: "relative", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Search for a stock (e.g., Tata)"
          value={query}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        {isLoading && (
          <div style={{ position: "absolute", right: "10px", top: "10px" }}>
            Loading...
          </div>
        )}
        {results.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "40px",
              left: "0",
              width: "300px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px",
              maxHeight: "200px",
              overflowY: "auto",
              listStyle: "none",
              padding: "0",
              margin: "0",
              zIndex: 1000,
            }}
          >
            {results.map((result) => (
              <li
                key={result.key}
                onClick={() => handleSymbolSelect(result.key)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  backgroundColor: symbol === result.key ? "#f0f8ff" : "#fff",
                }}
              >
                {result.name} ({result.key})
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {chartData.length > 0 && (
        <>
          <div className="flex md:flex-row flex-col gap-[10px] w-[100%] justify-between items-center">
            <div className="w-[300px] md:w-[500px]">
              <p className="text-[12px] p-[20px] md:p-0">
                Stock Chart for <b>{symbol}</b>
              </p>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    tickFormatter={(time) => time}
                    interval={50}
                  />
                  <YAxis domain={[minPrice, "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={chartColor}
                    fill={chartColor}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center items-center bg-gray-100">
              <div
                className={`border-2 rounded-3xl p-8 w-50 shadow-xl backdrop-blur-lg bg-opacity-10`}
                style={{
                  borderColor: chartColor || "#ffffff", // Default to white if chartColor is not provided
                }}
              >
                <div className="space-y-6">
                  {price.map((item: any) => (
                    <div
                      key={item.name}
                      className="flex  justify-between items-center"
                    >
                      <p className="text-gray-800 text-[10px] mr-2 font-medium">
                        {item.name}
                      </p>
                      <div className="flex items-center">
                        <p
                          className="text-md font-semibold mr-2"
                          style={{
                            color: chartColor || "#333333", // Use chartColor or default to dark text
                          }}
                        >
                          {item.value}
                        </p>
                        {item.name === "Price" && (
                          <div>
                            {item.value >
                            price.find((p: any) => p.name === "Open")?.value ? (
                              // Green Triangle for Price > Open
                              <div
                                className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-green-500"
                                title="Price is up"
                              ></div>
                            ) : item.value <
                              price.find((p: any) => p.name === "Open")
                                ?.value ? (
                              // Red Triangle for Price < Open
                              <div
                                className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-red-500"
                                title="Price is down"
                              ></div>
                            ) : (
                              // No Triangle for equal Price and Open
                              <span className="text-sm text-gray-500">
                                (No change)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {news && news.length > 0 && <Feed stocks={news} />}

      {loading && <MainLoader />}
    </div>
  );
};

export default NationalStockDashboard;
