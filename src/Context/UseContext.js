import React, { createContext } from "react";

export const UseContext = createContext("");

const Wrapper = ({ children }) => {
  const [data, setData] = React.useState();
  const [secondarydata, setSecondaryData] = React.useState();
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    fetch("https://coinranking1.p.rapidapi.com/coins", {
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
      });
  }, []);
  return (
    <>
      <UseContext.Provider
        value={{
          data,
          input,
          setInput,
          setData,
          secondarydata,
          setSecondaryData,
        }}
      >
        {children}
      </UseContext.Provider>
    </>
  );
};

export default Wrapper;
