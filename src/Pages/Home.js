import React from "react";
import Pagination from "../Component/card/Pagination";
import millify from "millify";
import NewsCard from "../Component/NewsCard";

function Home() {
  const [coininfo, setCoininfo] = React.useState();
  React.useEffect(() => {
    fetch("https://coinranking1.p.rapidapi.com/coins", {
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "b0e5fdedf1msh31670962ccd7408p140db3jsne4f802e641e3",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setCoininfo(res.data.stats);
      });
  }, []);

  return (
    <>
      {coininfo && (
        <div>
          <h3 className="home-h1">Global Crypto Stats</h3>
          <div className="home-data-container">
            <div className="home-stats1">
              <div className="home-stats-head">Total Cryptocurrencies</div>
              <div className="home-stats-data">
                <span className="home-icon">
                  <i className="bi bi-exclamation-circle"></i>
                </span>
                <span>{millify(parseFloat(coininfo.total))}</span>
              </div>
            </div>
            <div className="home-stats1">
              <div className="home-stats-head">Total Exchanges</div>
              <div className="home-stats-data">
                <span className="home-icon">
                  <i className="bi bi-currency-yen"></i>
                </span>
                <span>{millify(parseFloat(coininfo.totalExchanges))}</span>
              </div>
            </div>
            <div className="home-stats1">
              <div className="home-stats-head">Total Market Cap</div>
              <div className="home-stats-data">
                <span className="home-icon">
                  <i className="bi bi-currency-dollar"></i>{" "}
                </span>
                <span>{millify(parseFloat(coininfo.totalMarketCap))}</span>
              </div>
            </div>
            <div className="home-stats1">
              <div className="home-stats-head">Total 24h Volume</div>
              <div className="home-stats-data">
                <span className="home-icon">
                  <i className="bi bi-lightning"></i>
                </span>
                <span>{millify(parseFloat(coininfo.total24hVolume))}</span>
              </div>
            </div>
            <div className="home-stats1">
              <div className="home-stats-head">Total Market</div>
              <div className="home-stats-data">
                <span className="home-icon">
                  <i className="bi bi-currency-dollar"></i>
                </span>
                <span>{millify(parseFloat(coininfo.totalMarkets))}</span>
              </div>
            </div>
          </div>
          <h3 className="m-3">Top 10 Cryptocurrencies in the world</h3>
          <Pagination />
          <h3 className="m-3">Latest Cryptocurrencies News</h3>
          <NewsCard />
        </div>
      )}
    </>
  );
}

export default Home;
