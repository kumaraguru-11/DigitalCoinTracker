import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import crypto from "../assests/crypto.png";
import { Link } from "react-router-dom";

function SidebarMenu() {
  const [shrink, setShrink] = React.useState(false);
  return (
    <div className={`sidemenu sm-toggle ${shrink ? "sm-state-toggle" : ""}`}>
      <div className="sm-header">
        <img src={crypto} alt="cryptologo" className="logo"></img>
        <span className={`sb-h2 ${shrink ? "sb-state-h2" : ""}`}>
          <h2>Cryptoverse</h2>
        </span>
      </div>
      <Nav
        variant="pills"
        defaultActiveKey="/home"
        className="d-flex flex-column mx-1"
      >
        <Nav.Item>
          <Nav.Link className="mt-2" eventKey="link-1" as={Link} to={"/"}>
            <span
              className={`bi bi-house text-light ms-2 font-icon ${
                shrink ? "font-state-icon" : ""
              }`}
            ></span>
            <span
              className={`text-light fs-6 ms-2 sb-text ${
                shrink ? "sb-state-text" : ""
              }`}
            >
              Home
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            className="mt-2"
            as={Link}
            to={"/currencies"}
          >
            <span
              className={`bi bi-graph-up text-light ms-2 font-icon ${
                shrink ? "font-state-icon" : ""
              }`}
            ></span>
            <span
              className={`text-light fs-6 ms-2 sb-text ${
                shrink ? "sb-state-text" : ""
              }`}
            >
              Currencies
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            className="mt-2"
            as={Link}
            to={"/refrencecurrencies"}
          >
            <span
              className={`bi bi-pencil-square text-light ms-2 font-icon ${
                shrink ? "font-state-icon" : ""
              } `}
            ></span>
            {/* ${open ? "opened" : "closed"} */}
            <span
              className={`text-light fs-6 ms-2 sb-text ${
                shrink ? "sb-state-text" : ""
              }`}
            >
              Refrence Currencies
            </span>
          </Nav.Link>
          <Nav.Link eventKey="link-4" className="mt-2" as={Link} to={"/news"}>
            <span
              className={`bi bi-lightbulb text-light ms-2 font-icon ${
                shrink ? "font-state-icon" : ""
              }`}
            ></span>
            <span
              className={` text-light fs-6 ms-2 sb-text ${
                shrink ? "sb-state-text" : ""
              }`}
            >
              News
            </span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <button
        className={`sidebar-btn ${shrink ? "sidebar-state-btn" : ""}`}
        type="button"
        aria-label="Close"
        onClick={() => setShrink(!shrink)}
      >
        {shrink ? (
          <i className="bi bi-caret-right"></i>
        ) : (
          <i className="bi bi-caret-left"></i>
        )}
      </button>
    </div>
  );
}

export default SidebarMenu;
