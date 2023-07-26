import React from "react";
import DropDownSearchBar from "../Component/DropDownSearchBar";
import DropDown from "../Component/dropDown";

function HeaderBar() {
  return (
    <div className="header-section">
      <DropDownSearchBar/>
      <DropDown />
    </div>
  );
}

export default HeaderBar;
