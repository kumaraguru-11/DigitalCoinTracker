import React from "react";
import ErrorImg from "../../assests/errorImg.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      style={{
        height: "87vh",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img src={ErrorImg} alt="errorImg" height={400} width={400} />
      <Link to={"/"}>Go To Home</Link>
    </div>
  );
};

export default PageNotFound;
