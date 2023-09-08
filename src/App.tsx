import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";

import { DotSpinner } from "@uiball/loaders";

const Astronomy = lazy(() => import("./components/Astronomy"));
const Historical = lazy(() => import("./components/Historical"));
const HourlyWeather = lazy(() => import("./components/HourlyWeather"));
const Home = lazy(() => import("./components/Home"));
function App() {
  const loader = (
    <div className=" flex flex-col justify-center items-center w-screen h-screen">
      <DotSpinner size={60} speed={0.9} color="black" />
      <p>Loading content...</p>
    </div>
  );
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={loader}>
                <Home />
              </Suspense>
            }
          ></Route>
          <Route
            path="/hourly"
            element={
              <Suspense fallback={loader}>
                <HourlyWeather />
              </Suspense>
            }
          ></Route>
          <Route
            path="/historical"
            element={
              <Suspense fallback={loader}>
                <Historical />
              </Suspense>
            }
          ></Route>
          <Route
            path="/astronomy"
            element={
              <Suspense fallback={loader}>
                <Astronomy />
              </Suspense>
            }
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
