import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Info from "./pages/Info";
import Reception from "./pages/Reception";
import Scoreboard from "./pages/Scoreboard";
import Test from "./pages/Test";
import "./App.scss";
import Wait from "./pages/Wait";
import Workstation from "./pages/Workstation";

const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Info />} />
          <Route path="/reception" element={<Reception />} />
          <Route path="/wait/:service" element={<Wait />} />
          <Route path="/test" element={<Test />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route
            path="/workstation/:workstation"
            element={
              <Workstation
                accessToken={accessToken}
                setAccessToken={setAccessToken}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
