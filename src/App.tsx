import { useState } from "react";
import cloud from "./assets/cloud-icon.svg";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import DailyWeather from "./components/DailyWeather";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/daily" element={<Home />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
