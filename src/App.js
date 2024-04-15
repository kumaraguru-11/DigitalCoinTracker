import React from "react";
import SidebarMenu from "./layouts/SidebarMenu";
import HeaderBar from "./layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Currecies from "./Pages/Currecies";
import refrencecurrencies from "./Pages/RefrenceCurrencies";
import News from "./Pages/News";
import Crypto from "./Component/cardDetail/cryptoData";
import Market from "./Component/Market-Statistics";
import PageNotFound from "./Component/feature/PageNotFound";
import "./App.css";

function App() {
  return (
    <Router basename="/DigitalCoinTracker">
      <div className="App">
        <SidebarMenu />
        <div className="content">
          <HeaderBar />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/Currencies" Component={Currecies} />
            <Route path="/refrencecurrencies" Component={refrencecurrencies} />
            <Route path="/news" Component={News} />
            <Route path={`/crypto/:uuid`} element={<Crypto />} />
            <Route path={`/market/:uuid`} element={<Market />} />
            <Route path="*" Component={PageNotFound} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
