import { FC } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setHoursData } from "../store/forecastSlice";
import type { RootState } from "../store/store";
import {
  TbSunset,
  TbSunrise,
  TbTemperature,
  TbUvIndex,
  TbWind,
} from "react-icons/tb";
import getNameOfDay from "../utils/getNameOfDay";
import { useQuery } from "react-query";
import { forecast } from "../types";
import { DotSpinner } from "@uiball/loaders";

interface DailyWeatherItemsProps {
  icon: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  nameOfDay: string;
  sunrise: string;
  sunset: string;
  uv: number;
  maxwind_kph: number;
}

const DailyWeather: FC = () => {
  const dispatch = useDispatch();
  let URL = "https://api.weatherapi.com/v1";

  const city = useSelector((state: RootState) => state.city.city);

  const fetchForecastData = async (city: string) => {
    const response = await axios.get(`${URL}/forecast.json`, {
      params: {
        key: import.meta.env.VITE_API_KEY,
        q: city,
        days: "3",
      },
    });

    dispatch(setHoursData(response.data.forecast.forecastday));

    return response.data.forecast.forecastday.slice(1, 3);
  };
  const { isLoading, data, isError } = useQuery(["forecast", city], () =>
    fetchForecastData(city)
  );

  const loadingContent = (
    <div className="flex items-center justify-center min-w-200">
      <DotSpinner size={25} speed={0.9} color="white" />
    </div>
  );
  const errorContent = (
    <div className="flex items-center justify-center min-w-200">
      <p>Something went wrong...</p>
    </div>
  );

  if (isLoading) {
    return loadingContent;
  }
  if (isError) {
    return errorContent;
  }

  return (
    <div className="flex gap-1 p-2 flex-col">
      {data?.map((item: forecast) => (
        <DailyWeatherItems
          key={item.date_epoch}
          icon={item.day.condition.icon}
          nameOfDay={getNameOfDay(item.date)}
          minTemp={item.day.mintemp_c}
          maxTemp={item.day.maxtemp_c}
          date={item.date}
          sunset={item.astro.sunset}
          sunrise={item.astro.sunrise}
          uv={item.day.uv}
          maxwind_kph={item.day.maxwind_kph}
        />
      ))}
    </div>
  );
};

const DailyWeatherItems: FC<DailyWeatherItemsProps> = ({
  nameOfDay,
  date,
  icon,
  maxTemp,
  minTemp,
  sunrise,
  sunset,
  uv,
  maxwind_kph,
}) => {
  const dailyWeatherContent = (
    <div className="flex  flex-col gap-3 ">
      <section className="flex justify-center ">
        <img
          style={{
            position: "fixed",
            left: "-10px",
            top: "-10px",
            width: "80px",
            height: "80px",
            zIndex: "-100",
          }}
          src={icon}
        />
        <div>
          <div className="flex flex-col items-center ">
            <b className=" text-lg">{nameOfDay}</b>
            <em className=" text-sm">{date}</em>
          </div>
          <div className="flex gap-1 items-center">
            <TbTemperature
              style={{
                fontSize: "1.4rem",
              }}
            />
            <span className="text-xl">{maxTemp}°C</span>
            <span className="text-sm">
              {minTemp}
              °C
            </span>
          </div>
          <div className="flex  justify-around">
            <div className="flex">
              <TbWind
                style={{
                  fontSize: "1.4rem",
                }}
              />
              {maxwind_kph} km/h
            </div>
            <div className="flex gap-1 items-center">
              <TbUvIndex
                style={{
                  fontSize: "1.4rem",
                }}
              />
              {uv}
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center gap-1">
        <span className="flex">
          <TbSunset
            style={{
              fontSize: "1.4rem",
            }}
          />
          {sunset}
        </span>

        <span className="flex">
          <TbSunrise
            style={{
              fontSize: "1.4rem",
            }}
          />
          {sunrise}
        </span>
      </section>
    </div>
  );

  return (
    <div className=" bg-white bg-opacity-20 p-6  rounded backdrop-blur-lg drop-shadow-lg flex flex-wrap w-full justify-center flex-col items-center ">
      {dailyWeatherContent}
    </div>
  );
};

export default DailyWeather;
