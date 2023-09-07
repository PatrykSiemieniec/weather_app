import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";

import Home from "./components/Home";
import HourlyWeather from "./components/HourlyWeather";
import Historical from "./components/Historical";
import Astronomy from "./components/Astronomy";
function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/hourly" element={<HourlyWeather />}></Route>
          <Route path="/historical" element={<Historical />}></Route>
          <Route path="/astronomy" element={<Astronomy />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
