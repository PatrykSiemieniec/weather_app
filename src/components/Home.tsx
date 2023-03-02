import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import DailyWeather from "./DailyWeather";
const Home = () => {
  let URL = "http://api.weatherapi.com/v1";
  const [currentWeather, setCurrentWeather] = useState<any>({});
  const [days, setDays] = useState<number>(14);

  const getCurrentWeather = async () => {
    await axios
      .get(`${URL}/current.json`, {
        params: {
          key: "6909915ba3164cf6a83131706232801",
          q: "Skarzysko-Kamienna",
        },
      })
      .then((res) => setCurrentWeather(res.data))
      .catch((error) => console.log(error));
    console.log(currentWeather);
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);

  return (
    <div className="flex w-screen h-auto justify-center">
      <div className="grid grid-rows-7 grid-cols-6 gap-4 p-7 w-4/5 bor">
        <div className="col-span-4 row-span-4 bg-slate-50 p-8 ">
          <p className="text-2xl">Pogoda dzisiaj</p>
          <div className="flex justify-end gap-10">
            <div className="text-xl">
              <p className="text-xl">Twoja lokalizacja</p>
              <h1 className="text-3xl">{currentWeather?.location?.name}</h1>

              <div className="flex items-center ">
                <img
                  className="w-48"
                  src={currentWeather?.current?.condition?.icon}
                ></img>
                <p>{currentWeather?.current?.condition?.text}</p>
              </div>
            </div>
            <div>
              <h2 className=" text-lg">
                Temperatura:
                <div className=" text-2xl font-bold">
                  {currentWeather?.current?.temp_c} °C
                </div>
              </h2>
              <h3>
                Temperatura odczuwalna: {currentWeather?.current?.feelslike_c}{" "}
                °C
              </h3>
              <h2>
                Wiatr: {currentWeather?.current?.wind_kph}kph, kierunek:{" "}
                {currentWeather?.current?.wind_dir}
              </h2>
              <h2>
                Ostatnia aktualizacja: {currentWeather?.current?.last_updated}
              </h2>
            </div>
          </div>
        </div>
        <div className="col-span-2 row-span-2 bg-slate-50">Saved locations</div>
        <div className="col-span-2 row-span-2 bg-slate-50">Sugested</div>
        <div className="col-span-6 row-span-3 bg-slate-50 flex gap-2 p-4 overflow-auto flex-col">
          <div className="flex gap-4 ">
            <p className=" text-2xl">
              Prognoza długoterminowa {"("}
              {days}
              {")"} dni{" "}
            </p>
            <button
              onClick={() => setDays(7)}
              className=" rounded-full  bg-slate-300 w-20"
            >
              7 dni
            </button>
            <button
              onClick={() => setDays(14)}
              className=" rounded-full  bg-slate-300 w-20"
            >
              14 dni
            </button>
          </div>
          <DailyWeather days={days} />
        </div>
      </div>
    </div>
  );
};

export default Home;
