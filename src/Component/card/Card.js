import React from "react";
import Container from "react-bootstrap/Container";
import { NavLink, Link } from "react-router-dom";
import Loader from "../feature/Loader";
import millify from "millify";

const Card = ({ currentItems }) => {
  return (
    <Container fluid className="main-container">
      <div className="grid-item">
        {currentItems ? (
          currentItems.map((el, id) => (
            <div className="card-container m-3" key={id}>
              <NavLink to={`/crypto/${el.uuid}`} className="card-navlink">
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
                    <span>{millify(parseFloat(el.price))}</span>
                  </p>
                  <p className="card-body-text">
                    <span className="card-body-fontsize">Market Cap:</span>
                    <span>{millify(parseFloat(el.marketCap))}</span>
                  </p>
                  <p className="card-body-text">
                    <span className="card-body-fontsize">Daily Change:</span>
                    <span>{el.change}</span>
                  </p>
                </div>
              </NavLink>
              <ul className="card-links-list">
                <li className="card-links-link">
                  <Link to={`/market/${el.uuid}`}>
                    Market Statistics Overview
                  </Link>
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
