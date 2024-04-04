import React from "react";
import Graphs from "../Graphs/Graphs";
import millify from "millify";
import NewsCard from "../NewsCard";

const CryptoContent = ({ coindetail }) => {
  let key = "24hVolume";
  return (
    <>
      <div className="c-data-header">
        <span className="header-icon-span">
          <img
            src={coindetail.coin.iconUrl}
            className="header-icon-img"
            alt="coin-img"
          />
        </span>
        <h1 className="header-h1" style={{ color: coindetail.coin.color }}>
          {coindetail.coin.name}
        </h1>
        <a href={coindetail.coin.websiteUrl}>
          <i className="bi bi-tag fs-4 text-dark"></i>
        </a>
      </div>
      <p className="c-data-para">{coindetail.coin.description}</p>
      <div className="c-data-grid">
        <h3 className="c-data-grid-h3">{`${coindetail.coin.name} Value Statics`}</h3>
        <p className="c-data-grid-para">
          {`An overview showing the statistics of ${coindetail.coin.name}, such as the base
                and quote currency, the rank, and trading volume.`}
        </p>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-currency-dollar"></i>
            </span>
            <div className="grid-listitem-name">Price to USD</div>
          </div>
          <div className="grid-listitem-price">
            {` $ ${millify(parseFloat(coindetail.coin.price))}`}
          </div>
        </div>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-hash"></i>
            </span>
            <div className="grid-listitem-name">Rank</div>
          </div>
          <div className="grid-listitem-price">{coindetail.coin.rank}</div>
        </div>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-lightning"></i>
            </span>
            <div className="grid-listitem-name">24h Volume</div>
          </div>
          <div className="grid-listitem-price">
            {" "}
            {` $ ${millify(parseFloat(coindetail.coin[key]))}`}
          </div>
        </div>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-currency-dollar"></i>
            </span>
            <div className="grid-listitem-name">Market Cap</div>
          </div>
          <div className="grid-listitem-price">
            {" "}
            {` $ ${millify(parseFloat(coindetail.coin.marketCap))}`}
          </div>
        </div>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-currency-dollar"></i>
            </span>
            <div className="grid-listitem-name">All-time-high(daily avg.)</div>
          </div>
          <div className="grid-listitem-price">
            {" "}
            {` $ ${millify(parseFloat(coindetail.coin.allTimeHigh.price))}`}
          </div>
        </div>
      </div>
      <div className="c-data-grid">
        <h3 className="c-data-grid-h3">Other Stats info</h3>
        <p className="c-data-grid-para">
          {`An overview showing the statistics of ${coindetail.coin.name}, such as the base
              and quote currency, the rank, and trading volume.`}
        </p>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-graph-up"></i>
            </span>
            <div className="grid-listitem-name">Number of Markets</div>
          </div>
          <div className="grid-listitem-price">
            {coindetail.coin.numberOfMarkets}
          </div>
        </div>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-currency-yen"></i>
            </span>
            <div className="grid-listitem-name">Number of Exchanges</div>
          </div>
          <div className="grid-listitem-price">
            {coindetail.coin.numberOfExchanges}
          </div>
        </div>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-exclamation-circle"></i>
            </span>
            <div className="grid-listitem-name">Aproved Supply</div>
          </div>
          <div className="grid-listitem-price">
            <i className="bi bi-check-lg"></i>
          </div>
        </div>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-exclamation-circle"></i>
            </span>
            <div className="grid-listitem-name">Total Supply</div>
          </div>
          <div className="grid-listitem-price">
            {" "}
            {` $ ${millify(parseFloat(coindetail.coin.supply.total))}`}
          </div>
        </div>
        <div className="c-data-grid-list">
          <div className="grid-listitem">
            <span className="grid-listitem-icon">
              <i className="bi bi-exclamation-circle"></i>
            </span>
            <div className="grid-listitem-name">Circulating Supply</div>
          </div>
          <div className="grid-listitem-price">
            {" "}
            {` $ ${millify(parseFloat(coindetail.coin.supply.circulating))}`}
          </div>
        </div>
      </div>
      {/* ---------Url's------------ */}
      <div className="c-data-grid">
        <h3 className="c-data-grid-h3">{`${coindetail.coin.name} Url's`}</h3>
        <div className="map-grid-list">
          {coindetail.coin.links.map((el) => (
            <div className="map-grid-innerlist" key={el.url}>
              <div className="map-grid-listitem">{el.type}</div>
              <a
                className="map-grid-link"
                href={el.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {el.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* -----------chart header--------- */}

      <div className="chartheader">
        <div>
          <h1 className="chartheader-h1">Bitcoin Price Chart</h1>
          <div className="chartheader-line">
            <div>Changes:</div>
            <div
              style={{
                color: coindetail.coin.change.includes("-") ? "red" : "green",
              }}
            >
              {coindetail.coin.change}%
            </div>
          </div>
          <div className="chartheader-line">
            <div>Current Bitcoin Price:</div>
            <div> {` ${millify(parseFloat(coindetail.coin.price))} $`}</div>
          </div>
        </div>
      </div>
      <Graphs />
      <h1 className="mt-5">Latest Crypto News</h1>
      <NewsCard/>
    </>
  );
};

export default CryptoContent;
