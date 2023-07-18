import React from "react";
import GoToTop from "../Component/GoToTop";
import Card from "../Component/Card";

function Currecies() {
  const [show, setShow] = React.useState(false);
  window.addEventListener("scroll", () => {
    if(window.scrollY > 415){
      setShow(true)
    }else{
      setShow(false)
    }
  });
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
    <div>
      <Card getRoundedFigure={getRoundedFigure} />
      {show && <GoToTop />}
    </div>
  );
}

export default Currecies;
