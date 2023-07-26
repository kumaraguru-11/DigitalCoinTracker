import React, { useState, useContext, useRef, useEffect } from "react";
import { UseContext } from "../Context/UseContext";
import { useNavigate } from "react-router-dom";

const DropDownSearchBar = () => {
  const { list, setList, secondarydata, setUuid } = useContext(UseContext);
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  });

  const handleOutsideClick = (event) => {
    if (!ref.current.contains(event.target)) {
      setFocus(false);
      //  console.log("click outside")
    } else {
      value !== "" ? setValue("") : setValue(value);
      setFocus(true);
    }
  };

  // const handleFocus = () => {
  //   setFocus(!focus);
  // };

  const handleChange = (e) => {
    setValue(e.target.value);
    let inputValue = e.target.value;
    const searchinput = secondarydata.filter((val) => {
      return (
        (inputValue.length > 0 &&
          val.name.toLowerCase().includes(inputValue.toLowerCase())) ||
        (inputValue.length === 0 && val)
      );
    });
    setList(searchinput);
  };

  const handleValue = (value, uuid) => {
    setFocus(false);
    setValue(value);
    setUuid(uuid);
    navigate(`/crypto/${uuid}`);
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      secondarydata.map((el) => {
        if (el.name.toLowerCase() === value.toLowerCase()) {
          // setFocus(false);
          setUuid(el.uuid);
          navigate(`/crypto/${el.uuid}`);
        }
        return null;
      });
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
        // onFocus={() => handleFocus()}
        onChange={(e) => handleChange(e)}
        onKeyDown={handleSubmit}
        ref={ref}
      />
      <div className="dd-list" style={{ display: focus ? "block" : "none" }}>
        {list &&
          list.map((el) => (
            <React.Fragment key={el.uuid}>
              <li
                onClick={() => {
                  handleValue(el.name, el.uuid);
                }}
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
