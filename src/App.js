import React from "react";
import SidebarMenu from "./layouts/SidebarMenu";
import HeaderBar from "./layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Currecies from "./Pages/Currecies";
import refrencecurrencies from "./Pages/RefrenceCurrencies";
import News from "./Pages/News";
import Crypto from "./Component/cryptoData";
import CryptoMarkets from "./links/CryptoMarkets";
import ExchangeLink from "./links/ExchangeLink";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <SidebarMenu />
        <div className="content">
          <HeaderBar />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/Currencies" Component={Currecies} />
            <Route path="/refrencecurrencies" Component={refrencecurrencies} />
            <Route path="/news" Component={News} />
            <Route path={`/crypto/:uuid`} element={<Crypto/>} />
            <Route path={`/market/:uuid`} Component={CryptoMarkets} />
            <Route path={`/exchange/:uuid`} Component={ExchangeLink} />
          </Routes>
        </div>
      </div>
    </Router>
    // </Wrapper>
  );
}

export default App;
