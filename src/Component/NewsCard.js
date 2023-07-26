import React from "react";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

const NewsCard = () => {
  const [news, setNews] = React.useState("");
  const location = useLocation();
 const news2= location.pathname!=="/news" ? news.slice(0,6) : news;
  React.useEffect(() => {
    fetch(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrencies&safeSearch=Off&textFormat=Raw&freshness=Day&count=20`,
      {
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "b0e5fdedf1msh31670962ccd7408p140db3jsne4f802e641e3",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      }
    )
      .then((resp) => resp.json())
      .then((res) => {
        // console.log("res-->", res);
        setNews(res.value);
      });
  }, []);
  // console.log("news",news)
  return (
    <div className="news-continer">
      <div className="news-grid">
        {news2 ?  (
          news2.map((el) => (
            <div className="news-card" key={el.url}>
              <a href={el.url} target="_blank" rel="noreferrer" title={el.name}>
                <div className="news">
                  <div className="news-content">
                    <div className="news-header">
                      <h2>{el.name}</h2>
                      <img
                        src={el.image && el.image.thumbnail.contentUrl}
                        alt="imgage not found"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="news-published-detail">
                      <div className="news-published-person-detail">
                        <span className="news-card-icon">
                          <i className="bi bi-person"></i>
                        </span>
                        <span>{el.provider[0].name}</span>
                      </div>
                      <div className="news-published-time-detail">
                        <span className="news-card-icon">
                          <i className="bi bi-calendar4"></i>
                        </span>
                        <span>{timeAgo(el.datePublished)}</span>
                      </div>
                    </div>
                    <p>{el.description}</p>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );

  function timeAgo(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const secondsDifference = timeDifference / 1000;
    const minutesDifference = secondsDifference / 60;
    const hoursDifference = minutesDifference / 60;
    const daysDifference = hoursDifference / 24;
    const weeksDifference = daysDifference / 7;
    const monthsDifference = daysDifference / 30;

    if (monthsDifference >= 1) {
      return `${Math.floor(monthsDifference)} month${
        Math.floor(monthsDifference) > 1 ? "s" : ""
      } ago`;
    } else if (weeksDifference >= 1) {
      return `${Math.floor(weeksDifference)} week${
        Math.floor(weeksDifference) > 1 ? "s" : ""
      } ago`;
    } else if (daysDifference >= 1) {
      return `${Math.floor(daysDifference)} day${
        Math.floor(daysDifference) > 1 ? "s" : ""
      } ago`;
    } else if (hoursDifference >= 1) {
      return `${Math.floor(hoursDifference)} hour${
        Math.floor(hoursDifference) > 1 ? "s" : ""
      } ago`;
    } else if (minutesDifference >= 1) {
      return `${Math.floor(minutesDifference)} minute${
        Math.floor(minutesDifference) > 1 ? "s" : ""
      } ago`;
    } else if (secondsDifference >= 1) {
      return `${Math.floor(secondsDifference)} second${
        Math.floor(secondsDifference) > 1 ? "s" : ""
      } ago`;
    } else {
      return "just now";
    }
  }
};

export default NewsCard;
