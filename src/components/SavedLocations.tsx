import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { choseCity, refreshLocalStorage as refresh } from "../store/citySlice";

const SavedLocations: FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const refreshLocalStorage = useSelector(
    (state: RootState) => state.city.refreshLocalStorage
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const savedCities = localStorage.getItem("cities");
    if (!savedCities) {
      localStorage.setItem("cities", JSON.stringify({}));
    } else {
      const citiesObj = JSON.parse(savedCities);
      const citiesArr: string[] = Object.values(citiesObj);
      setCities(citiesArr);
    }
  }, [refreshLocalStorage]);

  const setCity = (city: string) => {
    dispatch(choseCity(city));
  };

  const deleteSavedCity = (city: string) => {
    const prevCities = localStorage.getItem("cities");
    if (prevCities) {
      const parsedPrevCities = JSON.parse(prevCities);
      delete parsedPrevCities[city];

      const updatedData = JSON.stringify(parsedPrevCities);
      localStorage.setItem("cities", updatedData);
      dispatch(refresh());
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {cities.map((item) => (
        <div
          key={item}
          className=" bg-white  bg-opacity-20  backdrop-blur-lg rounded-xl pl-3 pr-3 border border-black flex gap-4 text-black "
        >
          <button onClick={() => setCity(item)}>{item}</button>
          <button onClick={() => deleteSavedCity(item)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default SavedLocations;
