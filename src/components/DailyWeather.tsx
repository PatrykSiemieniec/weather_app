import React, { useState, useEffect } from "react";
import axios from "axios";

const DailyWeather = (props: any) => {
  let URL = "http://api.weatherapi.com/v1";
  const [forecastData, setForecastData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>();
  let data: any = [];
  let days: number = props.days;

  const getData = () => {
    axios
      .get(`${URL}/forecast.json`, {
        params: {
          key: "6909915ba3164cf6a83131706232801",
          q: "Skarzysko-Kamienna",
          days: days,
        },
      })
      .then((res) => {
        const response = res.data.forecast.forecastday;
        let index = 0;
        for (const key in response) {
          data.push({
            id: index++,
            icon: response[key]?.day?.condition?.icon,
            date: response[key]?.date,
            maxTemp: response[key]?.day?.maxtemp_c,
            minTemp: response[key]?.day?.mintemp_c,
          });
        }
        console.log(response);
        setForecastData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, [days]);

  const handleClick = (data: any) => {
    setSelectedData(data);
    console.log(selectedData);
  };
  const displayForecast = forecastData.map((item: any, idx: number) => (
    <DailyWeatherItems
      key={idx}
      id={item.id}
      icon={item.icon}
      minTemp={item.minTemp}
      maxTemp={item.maxTemp}
      date={item.date}
      onClick={() => handleClick(item)}
    />
  ));
  return <div className="flex gap-1 p-2">{displayForecast}</div>;
};

const DailyWeatherItems = (props: any) => {
  return (
    <div className="w-full h-80 bg-slate-200">
      <div
        className="flex flex-col text-center cursor-pointer"
        onClick={props.onClick}
      >
        <img src={props.icon} />
        <div>min. {props.minTemp}°C</div>
        <div>max. {props.maxTemp}°C</div>
        <div>
          <b>{props.date}</b>
        </div>
      </div>
    </div>
  );
};

export default DailyWeather;
