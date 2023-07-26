import React, { useContext } from "react";
import { UseContext } from "../Context/UseContext";
import Container from "react-bootstrap/Container";
import { NavLink, Link } from "react-router-dom";
import Loader from "./Loader";

const Card = ({ currentItems }) => {
  const { setUuid } = useContext(UseContext);
  const handleClick = (val) => {
    setUuid(val.uuid);
  };
  // console.log(currentItems);
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
    <Container fluid className="main-container">
      <div className="grid-item">
        {currentItems ? (
          currentItems.map((el, id) => (
            <div className="card-container m-3" key={id}>
              <NavLink
                to={`/crypto/${el.uuid}`}
                className="card-navlink"
                onClick={() => handleClick(el)}
              >
                <div className="card-head">
                  <div className="card-head-wrapper">
                    <div className="card-head-title">
                      {el.rank}.{el.name}
                    </div>
                    <div className="card-icon-wrapper">
                      <span className="card-avatar">
                        <img
                          src={el.iconUrl}
                          alt={el.name}
                          className="card-image"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-body-text">
                    <span className="card-body-fontsize">Price:</span>
                    <span>{getRoundedFigure(el.price)}</span>
                  </p>
                  <p className="card-body-text">
                    <span className="card-body-fontsize">Market Cap:</span>
                    <span>{getRoundedFigure(el.marketCap)}</span>
                  </p>
                  <p className="card-body-text">
                    <span className="card-body-fontsize">Daily Change:</span>
                    <span>{el.change}</span>
                  </p>
                </div>
              </NavLink>
              <ul className="card-links-list" onClick={() => handleClick(el)}>
                <li className="card-links-link">
                  <span>
                    <Link to={`/market/${el.uuid}`}>View Market</Link>
                  </span>
                </li>
                <li className="card-links-link">
                  <span>
                    <Link to={`/exchange/${el.uuid}`}>View Exchanges</Link>
                  </span>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </Container>
  );
};

export default Card;
