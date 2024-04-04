import React from "react";
import DropDownSearchBar from "../Component/feature/SearchBar";
import DropDown from "../Component/feature/Filter";

function HeaderBar() {
  return (
    <div className="header-section">
      <DropDownSearchBar />
      <DropDown />
    </div>
  );
}

export default HeaderBar;
