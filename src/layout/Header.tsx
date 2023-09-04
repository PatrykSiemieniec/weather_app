import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { suggestedCity } from "../types";
import { useDispatch } from "react-redux/es/exports";
import { choseCity } from "../store/citySlice";
const Header = () => {
  const [suggestedCity, setSuggestedCity] = useState<suggestedCity[]>([]);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const searchAndAutocomplete = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
    const city = e.target.value;
    if (city.length < 2) return;

    const URL = "http://api.weatherapi.com/v1/search.json";
    await axios
      .get(URL, {
        params: {
          key: "6909915ba3164cf6a83131706232801",
          q: city,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSuggestedCity(res.data);
      });
  };

  return (
    <div className="bg-gray-700 flex text-white  ">
      <div className="flex flex-col p-4  sm:flex-row sm:gap-10  ml-12 ">
        <NavLink to="/" className="text-2xl lg:text-3xl">
          <b>Pogoda</b>
        </NavLink>
        <div>
          <input
            onChange={searchAndAutocomplete}
            type="search"
            className=" h-10 w-48 p-4 text-black"
            placeholder="Wyszukaj miasto..."
            value={inputValue}
          />
          <div className="flex flex-col absolute min-w-48 bg-white text-black  z-50">
            {suggestedCity.map((item) => (
              <span
                onClick={() => {
                  dispatch(choseCity(item.name));
                  setSuggestedCity([]);
                  setInputValue("");
                }}
                className="p-2 cursor-pointer"
                key={item.id}
              >
                {item.name}{" "}
                <sub className=" text-slate-500">{item.country}</sub>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
