import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";

import Home from "./components/Home";
import HourlyWeather from "./components/HourlyWeather";

function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/daily" element={<Home />}></Route>
          <Route path="/hourly" element={<HourlyWeather />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
