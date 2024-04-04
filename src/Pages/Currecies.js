import React from "react";
import GoToTop from "../Component/feature/GoToTop";
import Pagination from "../Component/card/Pagination";

function Currecies() {
  const [show, setShow] = React.useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 415) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  return (
    <div>
      <Pagination />
      {show && <GoToTop />}
    </div>
  );
}

export default Currecies;
