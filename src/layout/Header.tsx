import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { suggestedCity } from "../types";
import { useDispatch } from "react-redux/es/exports";
import { choseCity } from "../store/citySlice";
import Dropdown from "./Dropdown";
import { BsGithub, BsLinkedin } from "react-icons/bs";
const Header = () => {
  const [suggestedCity, setSuggestedCity] = useState<suggestedCity[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [width, setWidth] = useState<number>(window.innerWidth);

  const dispatch = useDispatch();

  const searchAndAutocomplete = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
    const city = e.target.value;
    if (city.length < 2) return;

    const URL = "https://api.weatherapi.com/v1/search.json";
    await axios
      .get(URL, {
        params: {
          key: import.meta.env.VITE_API_KEY,
          q: city,
        },
      })
      .then((res) => {
        setSuggestedCity(res.data);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWidth(width);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //bg-gray-700
  return (
    <div className=" flex bg-[#3C4453] text-white fixed w-screen z-50 ">
      <div className="flex w-full flex-row p-4 justify-between items-center placeholder:sm:gap-10  sm:ml-12 sm:mr-12  ">
        <div className="flex gap-4  sm:gap-10 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " border-b borderd-white text-xl lg:text-2xl"
                : "text-xl lg:text-2xl"
            }
          >
            <b>Weather</b>
          </NavLink>
          <div>
            <input
              id="searchCity"
              onChange={searchAndAutocomplete}
              type="search"
              className=" h-10 w-40 sm:w-48 p-4 text-black"
              placeholder="Search city..."
              value={inputValue}
            />
            <div className="flex flex-col absolute min-w-48 bg-white text-black z-50 border-black border">
              {inputValue &&
                suggestedCity.map((item) => (
                  <span
                    onClick={() => {
                      dispatch(choseCity(item.name));
                      setSuggestedCity([]);
                      setInputValue("");
                    }}
                    className="p-2 cursor-pointer text-lg  hover:bg-slate-200"
                    key={item.id}
                  >
                    {item.name}{" "}
                    <sub className=" text-slate-500 text-sm">
                      {item.country}
                    </sub>
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div>
          {width > 1150 ? (
            <div className="flex gap-10 items-center">
              <NavLink
                to="/hourly"
                className={({ isActive }) =>
                  isActive
                    ? " border-b borderd-white text-xl lg:text-2xl"
                    : "text-xl lg:text-2xl"
                }
              >
                <b>Hourly Weather</b>
              </NavLink>

              <NavLink
                to="/historical"
                className={({ isActive }) =>
                  isActive
                    ? " border-b borderd-white text-xl lg:text-2xl"
                    : "text-xl lg:text-2xl"
                }
              >
                <b>Historical</b>
              </NavLink>
              <NavLink
                to="/astronomy"
                className={({ isActive }) =>
                  isActive
                    ? " border-b borderd-white text-xl lg:text-2xl"
                    : "text-xl lg:text-2xl"
                }
              >
                <b>Astronomy</b>
              </NavLink>
              <div className="flex gap-3">
                <a href="https://github.com/PatrykSiemieniec/weather_app">
                  <BsGithub />
                </a>
                <a href="https://www.linkedin.com/in/patryksiemieniec99/">
                  <BsLinkedin />
                </a>
              </div>
            </div>
          ) : (
            <Dropdown />
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
