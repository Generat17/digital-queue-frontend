import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Reception from "./pages/Reception";
import Scoreboard from "./pages/Scoreboard";
import StartPage from "./pages/StartPage";
import Test from "./pages/Test";
import "./App.scss";
import Wait from "./pages/Wait";
import Workstation from "./pages/Workstation";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/reception" element={<Reception />} />
          <Route path="/wait/:service" element={<Wait />} />
          <Route path="/test" element={<Test />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/workstation/:workstationID" element={<Workstation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
