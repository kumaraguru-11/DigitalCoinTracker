import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function GoToTop() {
  const goTobtton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      style={{
        float: "right",
        fontSize: "30px",
        zIndex: "999",
        position: "fixed",
        bottom: "50px",
        right: "40px",
        cursor: "pointer",
      }}
      onClick={goTobtton}
    >
      <i className="bi bi-arrow-up-circle-fill fs-1 opacity-75"></i>
    </div>
  );
}

export default GoToTop;
