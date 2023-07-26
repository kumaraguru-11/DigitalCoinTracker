import React from "react";
import Pagination from "../Component/Pagination";
import NewsCard from "../Component/NewsCard";

function Home() {
  const [coininfo, setCoininfo] = React.useState();
  const getRoundedFigure = (Value) => {
    return Math.abs(Number(Value)) >= 1.0e12
      ? (Math.abs(Number(Value)) / 1.0e12).toFixed(1) + "T"
      : // Nine Zeroes for Billions
      Math.abs(Number(Value)) >= 1.0e9
      ? (Math.abs(Number(Value)) / 1.0e9).toFixed(1) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(Value)) >= 1.0e6
      ? (Math.abs(Number(Value)) / 1.0e6).toFixed(1) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(Value)) >= 1.0e3
      ? (Math.abs(Number(Value)) / 1.0e3).toFixed(1) + "K"
      : Math.abs(Number(Value).toFixed(1));
  };
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
                <span>{getRoundedFigure(coininfo.total)}</span>
              </div>
            </div>
            <div className="home-stats1">
              <div className="home-stats-head">Total Exchanges</div>
              <div className="home-stats-data">
                <span className="home-icon">
                  <i className="bi bi-currency-yen"></i>
                </span>
                <span>{getRoundedFigure(coininfo.totalExchanges)}</span>
              </div>
            </div>
            <div className="home-stats1">
              <div className="home-stats-head">Total Market Cap</div>
              <div className="home-stats-data">
                <span className="home-icon">
                  <i className="bi bi-currency-dollar"></i>{" "}
                </span>
                <span>{getRoundedFigure(coininfo.totalMarketCap)}</span>
              </div>
            </div>
            <div className="home-stats1">
              <div className="home-stats-head">Total 24h Volume</div>
              <div className="home-stats-data">
                <span className="home-icon">
                  <i className="bi bi-lightning"></i>
                </span>
                <span>{getRoundedFigure(coininfo.total24hVolume)}</span>
              </div>
            </div>
            <div className="home-stats1">
              <div className="home-stats-head">Total Market</div>
              <div className="home-stats-data">
                <span className="home-icon">
                  <i className="bi bi-currency-dollar"></i>
                </span>
                <span>{getRoundedFigure(coininfo.totalMarkets)}</span>
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
