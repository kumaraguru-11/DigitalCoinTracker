import React from "react";
import ReactPaginate from "react-paginate";
import Loader from "../Component/Loader";
import { useSelector } from "react-redux";

const CryptoMarkets = () => {
  const [market, setMarket] = React.useState([]);
  const [itemOffset, setItemOffset] = React.useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = market && market.slice(itemOffset, endOffset);
  const pageCount = market ? Math.ceil(market.length / itemsPerPage) : "";

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % market.length;
    setItemOffset(newOffset);
  };

  const data = useSelector((state) => state.coins.coins.data);
  const uuid = useSelector((state) => state.uuid);
  React.useEffect(() => {
    fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid.uuid}/markets`, {
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "b0e5fdedf1msh31670962ccd7408p140db3jsne4f802e641e3",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setMarket(res.data.markets);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uuid]);
  const getRoundedFigure = (Value) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(Value)) >= 1.0e9
      ? (Math.abs(Number(Value)) / 1.0e9).toFixed(1) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(Value)) >= 1.0e6
      ? (Math.abs(Number(Value)) / 1.0e6).toFixed(1) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(Value)) >= 1.0e3
      ? (Math.abs(Number(Value)) / 1.0e3).toFixed(1) + "K"
      : Math.abs(Number(Value).toFixed(1));
  };
  return (
    <>
      {market.length > 0 ? (
        <div className="market-container">
          <h1 className="market-header">Market Crypto Stats</h1>
          <div className="market-title">
            <div>
              <div className="market-title-head">24h Volume</div>
              <div>
                <span className="market-title-icon">
                  <i className="bi bi-lightning"></i>
                </span>
                <span className="market-title-data">
                  {data &&
                    data.coins.map((el) => (
                      <React.Fragment key={el.uuid}>
                        {el.uuid === uuid.uuid
                          ? ` ${getRoundedFigure(el["24hVolume"])}`
                          : ""}
                      </React.Fragment>
                    ))}
                </span>
              </div>
            </div>
            <div>
              <div className="market-title-head">Total</div>
              <div>
                <span className="market-title-icon">
                  <i className="bi bi-hand-thumbs-up"></i>
                </span>
                <span className="market-title-data">10.7k</span>
              </div>
            </div>
          </div>
          <div className="market-table-wrapper">
            <table className="market-table">
              <thead className="market-table-thead">
                <tr>
                  <th className="tabel-thead-head radius-start">Rank</th>
                  <th className="tabel-thead-head">Avatar</th>
                  <th className="tabel-thead-head th-textalign-start">Name</th>
                  <th className="tabel-thead-head">Market Share</th>
                  <th className="tabel-thead-head">BTC Price</th>
                  <th className="tabel-thead-head">Recommanded</th>
                  <th className="tabel-thead-head">Price</th>
                  <th className="tabel-thead-head radius-end">24h Volume</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((el) => (
                  <tr key={el.uuid} className="tbody-tr">
                    <td className="tbody-tr-td">
                      <div>{el.rank}</div>
                    </td>
                    <td className="tbody-tr-td">
                      <span className="tbody-avatar">
                        <img
                          src={el.exchange.iconUrl}
                          alt={el.exchange.name}
                          className="tbody-avatar-img"
                        />
                      </span>
                    </td>
                    <td className="tbody-tr-td td-name">{el.exchange.name}</td>
                    <td className="tbody-tr-td">{el.marketShare}</td>
                    <td className="tbody-tr-td">
                      {getRoundedFigure(el.btcPrice)}
                    </td>
                    <td className="tbody-tr-td">
                      <span>
                        {el.recommended === true ? (
                          <i
                            className="bi bi-check-lg"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-slash-circle"
                            style={{ color: "red" }}
                          />
                        )}
                      </span>
                    </td>
                    <td className="tbody-tr-td">{`${getRoundedFigure(
                      el.price
                    )}`}</td>
                    <td className="tbody-tr-td">{`${getRoundedFigure(
                      el["24hVolume"]
                    )}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default CryptoMarkets;
