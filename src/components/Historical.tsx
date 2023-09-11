import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/store";
import axios from "axios";
import { useQuery } from "react-query";
import getPreviousDay from "../utils/getPreviousDay";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { options } from "./HourlyWeather";
import { Hour } from "../types/forecast";
const Historical = () => {
  const [date, setDate] = useState<Date>(new Date());

  let URL = "https://api.weatherapi.com/v1";

  const city = useSelector((state: RootState) => state.city.city);

  const fetchHistoricalData = async (city: string) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formatedMonth = month < 10 ? "0" + month : month;
    const formatedDay = day < 10 ? "0" + day : day;

    const fullDate = `${year}-${formatedMonth}-${formatedDay}`;
    const response = await axios.get(`${URL}/history.json`, {
      params: {
        key: import.meta.env.VITE_API_KEY,
        q: city,
        dt: fullDate,
      },
    });

    console.log(response.data.forecast.forecastday[0]);
    return response.data.forecast.forecastday[0];
  };
  const { isLoading, data, isError } = useQuery(
    ["historical", city, date],
    () => fetchHistoricalData(city)
  );

  const todayDate = new Date();

  const days = [7, 6, 5, 4, 3, 2, 1, 0];
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  useEffect(() => {
    if (buttonsRef.current && buttonsRef.current[0]) {
      buttonsRef.current[0].focus();
    }
  }, []);

  const labels = data?.hour?.map((item: Hour) => item.time.slice(10, 16));
  const windData = data?.hour?.map((item: Hour) => item.wind_kph);
  const tempData = data?.hour?.map((item: Hour) => item.temp_c);
  const rainData = data?.hour?.map((item: Hour) => item.chance_of_rain);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Wind kph",
        data: windData,
        borderColor: "grey",
        backgroundColor: "lightgrey",
        pointStyle: "rectRounded",
        pointRadius: 4,
        pointHoverRadius: 10,
      },
      {
        label: "Temperature",
        data: tempData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: "rectRounded",
        pointRadius: 4,
        pointHoverRadius: 10,
      },
      {
        label: "Chance Of Rain",
        data: rainData,
        borderColor: "blue",
        backgroundColor: "lightblue",
        pointStyle: "rectRounded",
        pointRadius: 4,
        pointHoverRadius: 10,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center  p-5 ">
      <div className="mt-20 gap-6 flex flex-col">
        <section className="flex gap-4 flex-wrap justify-center">
          {days.map((item) => (
            <button
              ref={(element) => (buttonsRef.current[item] = element!)}
              key={item}
              className=" p-2 rounded border border-black flex gap-1 focus:bg-green-400 focus:border-green-700 min-w-[100px]  justify-center"
              onClick={() =>
                setDate(new Date(getPreviousDay(todayDate, item).getTime()))
              }
            >
              <span>{getPreviousDay(todayDate, item).getDate()}.</span>
              <span>{getPreviousDay(todayDate, item).getMonth() + 1}.</span>
              <span>{getPreviousDay(todayDate, item).getFullYear()}</span>
            </button>
          ))}
        </section>
        <section className="flex justify-evenly gap-10 flex-col md:flex-row ">
          <div className="border rounded border-black p-5 w-full md:w-1/3 flex items-center justify-evenly">
            {" "}
            <>
              <div className="text-xl ">
                <div className="flex items-center flex-col">
                  <img className=" w-32" src={data?.day?.condition?.icon}></img>
                </div>
              </div>
              <div>
                <div className="border-b-2">{data?.date}</div>
                <h2 className=" text-lg">
                  Temperature:
                  <div className=" text-2xl font-bold flex gap-3 items-center ">
                    {data?.day?.maxtemp_c} °C
                    <sub>{data?.day.mintemp_c} °C</sub>
                  </div>
                </h2>
                <h2>Wind: {data?.day?.maxwind_kph}kph</h2>
              </div>
            </>
          </div>
          <div className="border rounded border-black p-5 md:p-5 w-full md:w-2/3">
            <Line options={options} data={chartData} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Historical;
