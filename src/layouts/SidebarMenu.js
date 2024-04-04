import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import crypto from "../assests/crypto.png";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function SidebarMenu() {
  const [shrink, setShrink] = React.useState(false);
  const location = useLocation();
  const handleDefault = () => {
    if (location.pathname === "/currencies") {
      return "link-2";
    } else if (location.pathname === "/") {
      return "link-1";
    } else if (location.pathname === "/refrencecurrencies") {
      return "link-3";
    } else if (location.pathname === "/news") {
      return "link-4";
    }else{
      return 'link-2';
    }
  };
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
        defaultActiveKey={handleDefault}
        className="d-flex flex-column mx-1"
      >
        <Nav.Item>
          <Nav.Link
            className="mt-2"
            eventKey="link-1"
            as={Link}
            to={"/"}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Home"
            data-tooltip-place="right"
          >
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
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Currencies"
            data-tooltip-place="right"
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
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Refrence Currencies"
            data-tooltip-place="right"
          >
            <span
              className={`bi bi-pencil-square text-light ms-2 font-icon ${
                shrink ? "font-state-icon" : ""
              } `}
            ></span>
            <span
              className={`text-light fs-6 ms-2 sb-text ${
                shrink ? "sb-state-text" : ""
              }`}
            >
              Refrence Currencies
            </span>
          </Nav.Link>
          <Nav.Link
            eventKey="link-4"
            className="mt-2"
            as={Link}
            to={"/news"}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="News"
            data-tooltip-place="right"
          >
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
      <Tooltip id="my-tooltip" />
    </div>
  );
}

export default SidebarMenu;
