import React from "react";
import Loader from "./feature/Loader";
import { useLocation } from "react-router-dom";
import TimeAgo from "timeago-react";

const NewsCard = () => {
  const [news, setNews] = React.useState("");
  const location = useLocation();
  const news2 = location.pathname !== "/news" ? news.slice(0, 6) : news;
  React.useEffect(() => {
    fetch(`https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk`, {
      headers: {
        "X-RapidAPI-Key": "ffc6c94612msh07710f41c73452dp1126fdjsn1b944e487f04",
        "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setNews(res.data);
      });
  }, []);

  return (
    <div className="news-continer">
      <div className="news-grid">
        {news2 ? (
          news2.map((el) => (
            <div className="news-card" key={el.url}>
              <a
                href={el.url}
                target="_blank"
                rel="noreferrer"
                title={el.title}
              >
                <div className="news">
                  <div className="news-content">
                    <div className="news-header">
                      <h2>{el.title}</h2>
                      <img
                        src={el.thumbnail && el.thumbnail}
                        alt="imgage not found"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="news-published-detail">
                      {/* <div className="news-published-person-detail">
                        <span className="news-card-icon">
                          <i className="bi bi-person"></i>
                        </span>
                        <span>{el.title}</span>
                      </div> */}
                      <div className="news-published-time-detail">
                        <span className="news-card-icon">
                          <i className="bi bi-calendar4"></i>
                        </span>
                        {/* <span>{el.createdAt}</span> */}
                        <span>
                          <TimeAgo datetime={el.createdAt} />
                        </span>
                        {/* <span>{timeAgo(el.createdAt)}</span> */}
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
};

export default NewsCard;
