import { FC, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/store";
import axios from "axios";
import { useQuery } from "react-query";
import { forecast } from "../types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      min: 0,
    },
  },
};

const HourlyWeather: FC = () => {
  const [day, setDay] = useState<number>(0);
  // const [labels,setLabels] = useState();
  // const [tempDay,setTempDay] = useState();
  // const [chanceoOfRainDay,setChanceOfRainDay] = useState();
  // const [windDay,setWindDay] = useState();
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

    return response.data.forecast.forecastday;
  };
  const { isLoading, data, error } = useQuery(["forecast", city], () =>
    fetchForecastData(city)
  );

  console.log(data);

  const allLabels = data?.map((item: forecast) =>
    item.hour.map((item) => item.time.slice(10, 16))
  );

  const temperature = data?.map((item: forecast) =>
    item.hour.map((item) => item.temp_c)
  );

  const chanceOfRain = data?.map((item: forecast) =>
    item.hour.map((item) => item.chance_of_rain)
  );

  const wind = data?.map((item: forecast) =>
    item.hour.map((item) => item.wind_kph)
  );
  let labels, tempDay, chanceOfRainDay, windDay;
  if (data) {
    labels = allLabels[day];
    tempDay = temperature[day];
    chanceOfRainDay = chanceOfRain[day];
    windDay = wind[day];
  }

  const temperatureData = {
    labels,
    datasets: [
      {
        label: "Temperatura",
        data: tempDay,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const chanceOfRainData = {
    labels,
    datasets: [
      {
        label: "Szansa na opady deszczu ",
        data: chanceOfRainDay,
        borderColor: "blue",
        backgroundColor: "lightblue",
      },
    ],
  };
  const windData = {
    labels,
    datasets: [
      {
        label: "Wiatr km/h",
        data: windDay,
        borderColor: "grey",
        backgroundColor: "lightgrey",
      },
    ],
  };

  return (
    <div className="flex justify-center p-5">
      <div className="lg:w-750">
        <p className=" text-center text-3xl">
          {" "}
          Pogoda godzinowa <b>{city}</b>
        </p>
        <div className="flex gap-5 justify-center">
          <button
            className="bg-white p-2 bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg focus:bg-green-400 "
            onClick={() => setDay(0)}
          >
            Dzisiaj
          </button>
          <button
            className="bg-white p-2 bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg  focus:bg-green-400"
            onClick={() => setDay(1)}
          >
            Jutro
          </button>
          <button
            className="bg-white p-2 bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg  focus:bg-green-400"
            onClick={() => setDay(2)}
          >
            Pojutrze
          </button>
        </div>

        <Line options={options} data={temperatureData} />
        <Line options={options} data={chanceOfRainData} />
        <Line options={options} data={windData} />
      </div>
    </div>
  );
};

export default HourlyWeather;
