import React, { useContext } from "react";
import Loader from "../Component/Loader";
import ReactPaginate from "react-paginate";
import { UseContext } from "../Context/UseContext";

const ExchangeLink = () => {
  const [exchange, setExchange] = React.useState([]);
  const { uuid,data } = useContext(UseContext);
  const [itemOffset, setItemOffset] = React.useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = exchange && exchange.slice(itemOffset, endOffset);
  const pageCount = exchange ? Math.ceil(exchange.length / itemsPerPage) : "";

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % exchange.length;
    setItemOffset(newOffset);
  };
  React.useEffect(() => {
    fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid}/exchanges`, {
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "b0e5fdedf1msh31670962ccd7408p140db3jsne4f802e641e3",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setExchange(res.data.exchanges);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uuid]);
  console.log(exchange, "<---");
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
      {exchange.length > 0 ? (
        <div className="market-container">
          <h1 className="market-header">Exchange Crypto Stats</h1>
          <div className="market-title">
            <div>
              <div className="market-title-head">24h Volume</div>
              <div>
                <span className="market-title-icon">
                  <i className="bi bi-lightning"></i>
                </span>
                <span className="market-title-data">
                  {data &&
                    data.map((el) => (
                      <React.Fragment key={el.uuid}>
                        {el.uuid === uuid
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
                  <th className="tabel-thead-head">Number of Market</th>
                  <th className="tabel-thead-head">BTC Price</th>
                  <th className="tabel-thead-head">Recommanded</th>
                  <th className="tabel-thead-head">Verified</th>
                  <th className="tabel-thead-head">Price</th>
                  <th className="tabel-thead-head radius-end">
                    Coin Ranking Url
                  </th>
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
                          src={el.iconUrl}
                          alt={el.name}
                          className="tbody-avatar-img"
                        />
                      </span>
                    </td>
                    <td className="tbody-tr-td td-name">{el.name}</td>
                    <td className="tbody-tr-td">{el.numberOfMarkets}</td>
                    <td className="tbody-tr-td">
                      {getRoundedFigure(el.btcPrice)}
                    </td>
                    <td className="tbody-tr-td">
                      <span>
                        {el.recommended === true ? (
                          <i
                            className="bi bi-check-lg"
                            style={{ color: "green", fontSize: "20px" }}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-slash-circle"
                            style={{ color: "red", fontSize: "20px" }}
                          />
                        )}
                      </span>
                    </td>
                    <td className="tbody-tr-td">
                      <span>
                        {el.verified === false ? (
                          <i
                            className="bi bi-slash-circle"
                            style={{ color: "red", fontSize: "20px" }}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-check-lg"
                            style={{ color: "green", fontSize: "20px" }}
                          />
                        )}
                      </span>
                    </td>
                    <td className="tbody-tr-td">{`${getRoundedFigure(
                      el.price
                    )}`}</td>
                    <td className="tbody-tr-td">
                      <a
                        href={el.coinrankingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="bi bi-link-45deg"
                          style={{ color: "black", fontSize: "24px" }}
                        ></i>
                      </a>
                    </td>
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

export default ExchangeLink;
