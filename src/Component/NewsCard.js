import React from "react";
import Loader from "./feature/Loader";
import { useLocation } from "react-router-dom";
import TimeAgo from "timeago-react";

// `https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk`
//x-rapidapi Host:cryptocurrency-news2.p.rapidapi.com
const NewsCard = () => {
  const [news, setNews] = React.useState("");
  const location = useLocation();
  const news2 = location.pathname !== "/news" && news.status==='success'? news.slice(0, 6) : news;
  React.useEffect(() => {
    fetch(
      "https://google-news13.p.rapidapi.com/search?keyword=cryptocurrency&lr=en-US",
      {
        headers: {
          "X-RapidAPI-Key":
            "ffc6c94612msh07710f41c73452dp1126fdjsn1b944e487f04",
          "X-RapidAPI-Host": "google-news13.p.rapidapi.com",
        },
      }
    )
      .then((resp) => resp.json())
      .then((res) => {
        setNews(res);
      });
  }, []);

  return (
    <div className="news-continer">
      <div className="news-grid">
        {news2 && news.status === "success" ? (
          news2.items.map((el) => (
            <div className="news-card" key={el.newsUrl}>
              <a
                href={el.newsUrl}
                target="_blank"
                rel="noreferrer"
                title={el.title}
              >
                <div className="news">
                  <div className="news-content">
                    <div className="news-header">
                      <h2>{el.title}</h2>
                      <img
                        src={el.images?.thumbnailProxied}
                        alt="img404"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="news-published-detail">
                      <div className="news-published-time-detail">
                        <span className="news-card-icon">
                          <i className="bi bi-calendar4"></i>
                        </span>
                        <span>
                          <TimeAgo datetime={el.timestamp} />
                        </span>
                      </div>
                    </div>
                    <p>{el.snippet}</p>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : news.message || news.status !== "success" ? (
          <h1>unavailable</h1>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default NewsCard;
