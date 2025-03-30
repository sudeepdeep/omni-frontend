import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";

interface HelmetProps {
  appTitle: string;
  favicon: string;
  description: string;
}

function Helmet({ appTitle, favicon, description }: HelmetProps) {
  return (
    <ReactHelmet htmlAttributes={{ lang: "en" }}>
      {/* Title & Basic Meta */}
      <title>{appTitle || "Civic Reports - Your News, Your Voice"}</title>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content={
          description ||
          "Stay updated with the latest Local, State, National, Business, Stock, and Political news. Share your own stories and engage with the community on Civic Reports."
        }
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content="news, civic reports, local news, world news, business news, political news, user-generated news, stock market updates"
      />
      <link rel="icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta
        property="og:title"
        content={appTitle || "Civic Reports - Your News, Your Voice"}
      />
      <meta
        property="og:description"
        content={
          "Civic Reports lets you read, post, and share the latest news across various categories. Join a community-driven news platform."
        }
      />
      <meta property="og:image" content={favicon} />
      <meta property="og:url" content="https://civicreports.vercel.app/" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={appTitle || "Civic Reports - Your News, Your Voice"}
      />
      <meta
        name="twitter:description"
        content={
          "Read, share, and discuss the latest news in Local, State, National, Business, Stocks, and Politics on Civic Reports."
        }
      />
      <meta name="twitter:image" content={favicon} />
      <meta name="twitter:site" content="@CivicReports" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://civicreports.vercel.app/" />
    </ReactHelmet>
  );
}

export default Helmet;
