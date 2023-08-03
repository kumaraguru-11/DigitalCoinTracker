import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { picked } from "../features/UuidSlice";
import { modified } from "../features/CoinsSlice";

const DropDownSearchBar = () => {
  const secondarydata = useSelector((state) => state.coins.coinsSource.data);
  const list = useSelector((state) => {
    return state.coins.coinslist.data;
  });
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current.contains(event.target)) {
        setFocus(false);
      } else {
        if (value !== "") {
          setValue("");
        }
        setFocus(true);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    let inputValue = e.target.value;
    const searchinput = secondarydata.coins.filter((val) => {
      return (
        (inputValue.length > 0 &&
          val.name.toLowerCase().includes(inputValue.toLowerCase())) ||
        (inputValue.length === 0 && val)
      );
    });
    dispatch(modified(searchinput));
  };

  const handleValue = (value, uuid) => {
    setFocus(false);
    setValue(value);
    dispatch(picked(uuid));
    navigate(`/crypto/${uuid}`);
  };

  const handleSubmit = (event) => {
    // if (event.key === "Enter") {
    //   secondarydata.coins.map((el) => {
    //     if (el.name.toLowerCase() === value.toLowerCase()) {
    //       //   setUuid(el.uuid);
    //       dispatch(picked(el.uuid));
    //       navigate(`/crypto/${el.uuid}`);
    //     }
    //     return null;
    //   });
    // }
    if (event.key === "Enter") {
      const foundCoin = secondarydata.coins.find(
        (el) => el.name.toLowerCase() === value.toLowerCase()
      );

      if (foundCoin) {
        dispatch(picked(foundCoin.uuid));
        navigate(`/crypto/${foundCoin.uuid}`);
        setFocus(false);
      }
    }
  };
  return (
    <div className=" dd-search ">
      <input
        placeholder="search..."
        list="data"
        className="dd-input"
        value={value}
        id="outside"
        onChange={(e) => handleChange(e)}
        onKeyDown={handleSubmit}
        ref={ref}
      />
      <div className="dd-list " style={{ display: focus ? "block" : "none" }}>
        {list &&
          list.coins.map((el) => (
            <React.Fragment key={el.uuid}>
              <li
                onClick={() => {
                  handleValue(el.name, el.uuid);
                }}
                className="dd-list-li"
              >
                {el.name}
              </li>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default DropDownSearchBar;
