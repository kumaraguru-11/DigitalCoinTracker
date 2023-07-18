import React, { useContext } from "react";
import { UseContext } from "../Context/UseContext";
import DropDown from "../Component/dropDown";

function HeaderBar() {
  const { input, setInput, secondarydata, setData } = useContext(UseContext);
  const handleInput = (e) => {
    let inputValue = e.target.value;
    setInput(inputValue);
    const searchdata = secondarydata.filter((item) => {       
      return (
        (inputValue.length > 0 &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())) ||
        (inputValue.length === 0 && item)
      );
    });
    setData(searchdata);
  };
  return (
    <div className="header-section">
      <input
        type="text"
        value={input}
        placeholder="search for cryptocurriences ??"
        onChange={(e) => handleInput(e)}
      />
      <DropDown />
    </div>
  );
}

export default HeaderBar;
