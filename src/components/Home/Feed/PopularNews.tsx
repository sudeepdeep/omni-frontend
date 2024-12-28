import React from "react";

const popularNews = [
  {
    url: "https://www.eenadu.net/",
    text: "Eenadu",
    image:
      "https://play-lh.googleusercontent.com/gjC4N6FUlFP1eGIxhoLqOZcTM-9FJda0GIx2rgFyHvmvIpzclUVKumaeLGAKNQfi-40",
  },
  {
    url: "https://www.eenadu.net/",
    text: "Sakshi",
    image:
      "https://cdn6.aptoide.com/imgs/1/b/0/1b0104abc950d88308c32ff6155c01d6_icon.png",
  },
  {
    url: "https://www.eenadu.net/",
    text: "Andra Jyothi",
    image:
      "https://images.jdmagicbox.com/comp/vijayawada/01/0866p866std3000001/catalogue/andhra-jyothi-office-gannavaram-vijayawada-newspaper-publishers-e1n33mt0bc.jpg",
  },
  {
    url: "https://www.eenadu.net/",
    text: "Vaartha",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKcQtW9uZ1c3bzn7APNkd12qSBKWZho8tgZg&s",
  },
];

function PopularNews() {
  return (
    <div className="h-[10vh]">
      <b>Popular News Papers</b>
      <div className="flex gap-[10px] flex-wrap">
        {popularNews.map((pn): any => (
          <div className="w-[50px] h-[50px] overflow-hidden rounded-lg">
            <img
              src={pn.image}
              className="w-full h-full object-cover cursor-pointer"
              alt="newspaper"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularNews;
