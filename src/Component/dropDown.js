import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { sorted } from "../features/CoinsSlice";

const DropDown = () => {
  const data = useSelector((state) => state.coins.coins.data);
  const dispatch = useDispatch();

  const handleAscendingOrder = () => {
    let temp = JSON.parse(JSON.stringify(data));
    const sortedData = temp.coins.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    dispatch(sorted(sortedData));
  };
  const handleDecendingOrder = () => {
    let temp = JSON.parse(JSON.stringify(data));
    const sortedData = temp.coins.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
    dispatch(sorted(sortedData));
  };
  const handleLowtoHigh = () => {
    let temp = JSON.parse(JSON.stringify(data));
    const sortedData = temp.coins.sort((a, b) => {
      const PriceA = parseFloat(a.price);
      const PriceB = parseFloat(b.price);
      if (PriceA < PriceB) {
        return -1;
      }
      if (PriceA > PriceB) {
        return 1;
      }
      return 0;
    });
    dispatch(sorted(sortedData));
  };
  const handleHightoLow = () => {
    let temp = JSON.parse(JSON.stringify(data));
    const sortedData = temp.coins.sort((a, b) => {
      const PriceA = parseFloat(a.price);
      const PriceB = parseFloat(b.price);
      if (PriceA < PriceB) {
        return 1;
      }
      if (PriceA > PriceB) {
        return -1;
      }
      return 0;
    });
    dispatch(sorted(sortedData));
  };

  return (
    <div>
      <Dropdown className="d-inline ms-3 dropdown">
        <Dropdown.Toggle id="dropdown-autoclose-outside">
          Filter
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleAscendingOrder}>A-Z</Dropdown.Item>
          <Dropdown.Item onClick={handleDecendingOrder}>Z-A</Dropdown.Item>
          <Dropdown.Item onClick={handleLowtoHigh}>
            Price Low to Price High
          </Dropdown.Item>
          <Dropdown.Item onClick={handleHightoLow}>
            Price High to Price Low
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropDown;
