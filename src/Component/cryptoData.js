import React, { useContext } from "react";
import GoToTop from "./GoToTop";
import { UseContext } from "../Context/UseContext";
import Loader from "./Loader";
import CryptoContent from "./cryptoContent";

const Crypto = () => {
  const [show, setShow] = React.useState(false);
  const { uuid, coindetail, setCoindetail } = useContext(UseContext);

  // --------GoToTop Button function----------
  window.addEventListener("scroll", () => {
    if (window.scrollY > 415) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  React.useEffect(() => {
    fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, {
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "b0e5fdedf1msh31670962ccd7408p140db3jsne4f802e641e3",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setCoindetail(res.data);
      });
  }, [uuid, setCoindetail]);

  return (
    <>
      {coindetail ? (
        <main className="c-data-Container">
          <CryptoContent />
          {show && <GoToTop />}
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Crypto;
