import { useState } from "react";
import axios from "axios";
import SavedLocations from "./SavedLocations";
import { useSelector } from "react-redux/es/hooks/useSelector";
import type { RootState } from "../store/store";
import { useQuery } from "react-query";
import getNameOfDay from "../utils/getNameOfDay";
import { useDispatch } from "react-redux/es/exports";
import { refreshLocalStorage } from "../store/citySlice";
import { DotSpinner } from "@uiball/loaders";
const CurrentWeather = () => {
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
  const { isLoading, data, isError } = useQuery(["currentWeather", city], () =>
    fetchWeatherData(city)
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

  const loadingContent = <DotSpinner size={25} speed={0.9} color="white" />;
  const weatherContent = (
    <>
      <div className="text-xl ">
        <p className="text-xl">Your location</p>
        <div className="flex gap-2 items-center">
          <h1 className="text-4xl">{data?.location?.name}</h1>
          <button
            onClick={() => saveCity(data?.location?.name)}
            className="bg-white p-1 bg-opacity-20  rounded backdrop-blur-lg  cursor-pointer text-sm"
          >
            Save
          </button>
        </div>

        <div className="flex items-center ">
          <img className=" w-32" src={data?.current?.condition?.icon}></img>
          <p>{data?.current?.condition?.text}</p>
        </div>
      </div>
      <div>
        <h2 className=" text-lg">
          Temperature:
          <div className=" text-2xl font-bold">{data?.current?.temp_c} °C</div>
        </h2>
        <h3>Perceived temperature: {data?.current?.feelslike_c} °C</h3>
        <h2>
          Wind: {data?.current?.wind_kph}kph, direction:{" "}
          {data?.current?.wind_dir}
        </h2>
        <h2>Last update: {data?.current?.last_updated}</h2>
      </div>
    </>
  );

  return (
    <>
      <div className="text-xl pb-8 lg:text-3xl flex gap-2 items-center">
        Current Weather, <b>{isLoading ? loadingContent : nameOfDay}</b>
      </div>
      <div className="flex flex-col items-center justify-evenly gap-10 sm:flex-row min-h-[120px] ">
        {isLoading ? (
          loadingContent
        ) : isError ? (
          <p> Something went wrong...</p>
        ) : (
          weatherContent
        )}
      </div>

      <section className="bg-white p-4 bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg flex flex-wrap max-w-xl">
        <p className="w-full text-lg"> Saved cities </p>
        <br />
        <SavedLocations />
      </section>
    </>
  );
};

export default CurrentWeather;
