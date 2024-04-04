import React, { useState } from "react";
import GoToTop from "../feature/GoToTop";
import Loader from "../feature/Loader";
import CryptoContent from "./cryptoContent";
import { useParams } from "react-router-dom";

const Crypto = () => {
  const [show, setShow] = useState(false);
  const [coindetail, setCoindetail] = useState();
  const uuid = useParams();
  // --------GoToTop Button function----------
  window.addEventListener("scroll", () => {
    if (window.scrollY > 415) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  React.useEffect(() => {
    fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid["uuid"]}`, {
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
          <CryptoContent coindetail={coindetail} />
          {show && <GoToTop />}
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Crypto;
