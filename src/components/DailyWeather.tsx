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
  const { isLoading, data, error } = useQuery(["forecast", city], () =>
    fetchForecastData(city)
  );

  if (isLoading) return <p>Loading...</p>;

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

const DailyWeatherItems: FC<DailyWeatherItemsProps> = (props) => {
  return (
    <div className=" bg-white bg-opacity-20 p-6  rounded backdrop-blur-lg drop-shadow-lg flex flex-wrap w-full justify-center flex-col items-center ">
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
            src={props.icon}
          />
          <div>
            <div className="flex flex-col items-center ">
              <b className=" text-lg">{props.nameOfDay}</b>
              <em className=" text-sm">{props.date}</em>
            </div>
            <div className="flex gap-1 items-center">
              <TbTemperature
                style={{
                  fontSize: "1.4rem",
                }}
              />
              <span className="text-xl">{props.maxTemp}°C</span>
              <span className="text-sm">
                {props.minTemp}
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
                {props.maxwind_kph} km/h
              </div>
              <div className="flex gap-1 items-center">
                <TbUvIndex
                  style={{
                    fontSize: "1.4rem",
                  }}
                />
                {props.uv}
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
            {props.sunset}
          </span>

          <span className="flex">
            <TbSunrise
              style={{
                fontSize: "1.4rem",
              }}
            />
            {props.sunrise}
          </span>
        </section>
      </div>
    </div>
  );
};

export default DailyWeather;
