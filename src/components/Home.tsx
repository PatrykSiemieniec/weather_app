import { useState } from "react";
import axios from "axios";
import DailyWeather from "./DailyWeather";
import SavedLocations from "./SavedLocations";
import { useSelector } from "react-redux/es/hooks/useSelector";
import type { RootState } from "../store/store";
import { useQuery } from "react-query";
import getNameOfDay from "../utils/getNameOfDay";
import { useDispatch } from "react-redux/es/exports";
import { refreshLocalStorage } from "../store/citySlice";
import HourlyWeather from "./HourlyWeather";
const Home = () => {
  const [nameOfDay, setNameOfDay] = useState<string>("");

  let URL = "https://api.weatherapi.com/v1";
  const city = useSelector((state: RootState) => state.city.city);
  const dispatch = useDispatch();

  const fetchWeatherData = async (city: string) => {
    const response = await axios.get(`${URL}/current.json`, {
      params: {
        key: import.meta.env.VITE_API_KEY,
        q: city,
      },
    });
    setNameOfDay(getNameOfDay(response.data?.current?.last_updated));
    return response.data;
  };
  const { isLoading, data, error, isError } = useQuery(
    ["currentWeather", city],
    () => fetchWeatherData(city)
  );

  const saveCity = (city: string) => {
    const cities = localStorage.getItem("cities");
    if (cities) {
      let prevLocalStorage = JSON.parse(cities);

      prevLocalStorage[city] = city;

      localStorage.setItem("cities", JSON.stringify(prevLocalStorage));
      dispatch(refreshLocalStorage());
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center md:flex-row p-2">
      <section className="bg-white p-10 bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg ">
        <p className="text-xl pb-8 lg:text-3xl">
          Pogoda dzisiaj, <b>{nameOfDay}</b>{" "}
        </p>

        <div className="flex flex-col justify-end gap-10 sm:flex-row ">
          <div className="text-xl">
            <p className="text-xl">Twoja lokalizacja</p>
            <div className="flex gap-2 items-center">
              <h1 className="text-4xl">{data?.location?.name}</h1>
              <button
                onClick={() => saveCity(data?.location?.name)}
                className="bg-white p-1 bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg cursor-pointer text-sm"
              >
                Zapisz
              </button>
            </div>

            <div className="flex items-center ">
              <img className=" w-32" src={data?.current?.condition?.icon}></img>
              <p>{data?.current?.condition?.text}</p>
            </div>
          </div>
          <div>
            <h2 className=" text-lg">
              Temperatura:
              <div className=" text-2xl font-bold">
                {data?.current?.temp_c} °C
              </div>
            </h2>
            <h3>Temperatura odczuwalna: {data?.current?.feelslike_c} °C</h3>
            <h2>
              Wiatr: {data?.current?.wind_kph}km/h, kierunek:{" "}
              {data?.current?.wind_dir}
            </h2>
            <h2>Ostatnia aktualizacja: {data?.current?.last_updated}</h2>
          </div>
        </div>
        <section className="bg-white p-4 bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg flex flex-wrap max-w-xl">
          <p> Zapisane miasta </p>
          <br />
          <SavedLocations />
        </section>
      </section>

      <section className="bg-white p-10 bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg ">
        <div className="flex gap-4 flex-col ">
          <p className=" text-xl lg:text-2xl">Prognoza na kolejne dni</p>
        </div>
        <DailyWeather />
      </section>
    </div>
  );
};

export default Home;
