import React, { useContext } from "react";
import { UseContext } from "../Context/UseContext";
import Container from "react-bootstrap/Container";

const Card = ({ getRoundedFigure }) => {
  const { data } = useContext(UseContext);
  // console.log(data)
  return (
    <Container fluid className="main-container">
      <div className="grid-item">
        {data &&
          data.map((el, id) => (
            <div className="m-3" key={id}>
              <div className="card-container">
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
              </div>
              <ul className="card-links-list">
                <li className="card-links-link">
                  <span>
                    <a href="@">View Market</a>
                  </span>
                </li>
                <li className="card-links-link">
                  <span>
                    <a href="@">View Exchanges</a>
                  </span>
                </li>
              </ul>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Card;
