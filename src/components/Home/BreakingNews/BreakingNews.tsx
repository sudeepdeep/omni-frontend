import React from "react";
import NewsCard from "./NewsCard";

export const allNews: any = [
  {
    title:
      "India extends mandate for imported coal-based power plants to run at full capacity",
    url: "https://www.reuters.com/world/india/india-extends-mandate-imported-coal-based-power-plants-run-full-capacity-2024-12-27/",
    snippet:
      "India has extended its mandate for imported coal-based power plants to operate at full capacity until February 28. This directive affects major companies such as Tata Power, Adani Power, and Vedanta, which collectively contribute to an annual capacity of nearly 16 gigawatts.",
    date: "2024-12-27",
    images: ["https://via.placeholder.com/300x200?text=Coal+Power+1"],
  },
  {
    title: "India roars ahead of China to top Asian IPO rankings",
    url: "https://www.ft.com/content/24d8bd5a-7003-49c3-90b7-e2c6cda61de3",
    snippet:
      "India has surpassed China to become Asia's leading market for initial public offerings (IPOs) in 2024. This surge is fueled by companies like Swiggy and Hyundai Motor, making India the world's second-largest equity fundraising market after the US.",
    date: "2024-12-26",
    images: [
      "https://via.placeholder.com/300x200?text=IPO+1",
      "https://via.placeholder.com/300x200?text=IPO+2",
      "https://via.placeholder.com/300x200?text=IPO+3",
      "https://via.placeholder.com/300x200?text=IPO+4",
      "https://via.placeholder.com/300x200?text=IPO+5",
    ],
  },
  {
    title:
      "India's growth trajectory poised to pick up in Oct-March, cenbank bulletin says",
    url: "https://www.reuters.com/world/india/indias-growth-trajectory-poised-pick-up-oct-march-cenbank-bulletin-says-2024-12-24/",
    snippet:
      "India's economic growth is anticipated to gain momentum in the latter half of the 2024-25 fiscal year, driven by domestic private consumption and a sustained revival in rural demand, according to the Reserve Bank of India's monthly bulletin.",
    date: "2024-12-24",
    images: [
      "https://via.placeholder.com/300x200?text=Economic+Growth+1",
      "https://via.placeholder.com/300x200?text=Economic+Growth+2",
      "https://via.placeholder.com/300x200?text=Economic+Growth+3",
    ],
  },
  {
    title:
      "India's push for home-grown satellite constellation gets 30 aspirants",
    url: "https://www.reuters.com/world/india/indias-push-home-grown-satellite-constellation-gets-30-aspirants-2024-12-24/",
    snippet:
      "Thirty Indian companies have responded to the space regulator's call to build and operate Earth observation satellite constellations, aiming to reduce the country's reliance on foreign data for defense, infrastructure management, and other critical mapping needs.",
    date: "2024-12-24",
    images: [
      "https://via.placeholder.com/300x200?text=Satellite+1",
      "https://via.placeholder.com/300x200?text=Satellite+2",
      "https://via.placeholder.com/300x200?text=Satellite+3",
    ],
  },
  {
    title: "Blockbuster retirement rumour surrounds Indian cricket team",
    url: "https://www.news.com.au/sport/cricket/blockbuster-retirement-rumour-surrounds-indian-cricket-team/news-story/92639510db24ca024238d3b9ed7219f3",
    snippet:
      "India faces retirement rumours among their veteran cricketers as they head into the Boxing Day Test against Australia with the current Border-Gavaskar series tied at 1-1. Speculation surrounds players like Rohit Sharma, Virat Kohli, and Ravindra Jadeja.",
    date: "2024-12-24",
    images: [
      "https://via.placeholder.com/300x200?text=Cricket+1",
      "https://via.placeholder.com/300x200?text=Cricket+2",
      "https://via.placeholder.com/300x200?text=Cricket+3",
    ],
  },
];

function BreakingNews() {
  return (
    <div className="h-[70vh] w-fullrounded-md overflow-y-auto p-[10px]">
      <span>
        <b>
          <span className="text-red-500">BREAKING NEWS</span>{" "}
          <span>BY ABLOG</span>
        </b>
      </span>
      {allNews.map((newss: any) => (
        <NewsCard news={newss} />
      ))}
    </div>
  );
}

export default BreakingNews;
