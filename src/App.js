import React from "react";
import Wrapper from "./Context/UseContext";
import SidebarMenu from "./layouts/SidebarMenu";
import HeaderBar from "./layouts/Header";
// import GoToTop from "./Component/GoToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Currecies from "./Pages/Currecies";
import refrencecurrencies from "./Pages/RefrenceCurrencies";
import News from "./Pages/News";

import "./App.css";

function App() {
  return (
    <Wrapper>
      <Router>
        <div className="App">
          <SidebarMenu />
          <div className="content">
            <HeaderBar />
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/Currencies" Component={Currecies} />
              <Route
                path="/refrencecurrencies"
                Component={refrencecurrencies}
              />
              <Route path="/news" Component={News} />
            </Routes>
            {/* <GoToTop /> */}
          </div>
        </div>
      </Router>
    </Wrapper>
  );
}

export default App;
