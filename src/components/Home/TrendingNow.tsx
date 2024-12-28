import React from "react";

const trendingNews = [
  {
    title:
      "India mourns as Manmohan Singh cremated with state honours at Nigambodh Ghat",
    url: "https://www.hindustantimes.com/india-news/manmohan-singh-funeral-live-updates-101695000000000.html",
    snippet:
      "The mortal remains of former Prime Minister Manmohan Singh were consigned to flames at Nigambodh Ghat in New Delhi.",
    date: "2024-12-28",
  },
  {
    title:
      "Team Pushpa 2 responds to Nitish Kumar Reddy's viral ‘thaggede le’ celebration",
    url: "https://www.hindustantimes.com/telugu-cinema/team-pushpa-2-responds-to-nitish-kumar-reddy-s-viral-thaggede-le-celebration-101695000000001.html",
    snippet:
      "Cricketer Nitish Kumar Reddy celebrated scoring his first Test half-century with Allu Arjun's famous gesture from the Pushpa films.",
    date: "2024-12-28",
  },
  {
    title:
      "Gavaskar issues 'don't take Indian cricket for granted' warning for Nitish Reddy",
    url: "https://www.hindustantimes.com/cricket/gavaskar-issues-dont-take-indian-cricket-for-granted-warning-for-nitish-reddy-101695000000002.html",
    snippet:
      "Sunil Gavaskar praised Nitish Reddy but also issued a word of caution to the young cricketer.",
    date: "2024-12-28",
  },
  {
    title:
      "Inside Salman Khan's birthday party in Jamnagar with family, friends, fireworks",
    url: "https://www.hindustantimes.com/bollywood/inside-salman-khans-birthday-party-in-jamnagar-with-family-friends-fireworks-101695000000003.html",
    snippet:
      "Salman Khan and his family celebrated his birthday in Jamnagar, Gujarat. Here are some photos from the event.",
    date: "2024-12-28",
  },
  {
    title:
      "Beyonce's mom defends her against critics of her Christmas Day performance",
    url: "https://www.hindustantimes.com/music/beyonces-mom-defends-her-against-critics-of-her-christmas-day-performance-101695000000004.html",
    snippet:
      "Beyonce's mother, Tina Knowles, responded to critics of her daughter's recent performance.",
    date: "2024-12-28",
  },
];

function TrendingNow() {
  return (
    <div className="h-[35vh] p-[10px] rounded-md overflow-y-auto">
      <span>
        <b>
          <span className="text-red-500">TRENDING NEWS</span>{" "}
          <span>BY ABLOG</span>
        </b>
      </span>
      {trendingNews.map((trending) => (
        <p className="bg-white p-2 mb-1 text-[12px] rounded-md">
          {trending.title}
        </p>
      ))}
    </div>
  );
}

export default TrendingNow;
