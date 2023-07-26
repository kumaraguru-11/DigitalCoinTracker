import React, { createContext, useState } from "react";

export const UseContext = createContext("");

const Wrapper = ({ children }) => {
  const [data, setData] = useState();
  const [list, setList] = useState();
  const [secondarydata, setSecondaryData] = useState();
  const [uuid, setUuid] = useState("");
  const [coindetail, setCoindetail] = useState();

  React.useEffect(() => {
    fetch("https://coinranking1.p.rapidapi.com/coins?limit=200", {
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "b0e5fdedf1msh31670962ccd7408p140db3jsne4f802e641e3",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setData(res.data.coins);
        setSecondaryData(res.data.coins);
        setList(res.data.coins)
      });
  }, []);
  return (
    <>
      <UseContext.Provider
        value={{
          list,
          setList,
          data,
          setData,
          secondarydata,
          setSecondaryData,
          setUuid,
          uuid,
          coindetail,
          setCoindetail,
        }}
      >
        {children}
      </UseContext.Provider>
    </>
  );
};

export default Wrapper;
