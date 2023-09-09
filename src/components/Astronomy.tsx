import axios from "axios";
import { useQuery } from "react-query";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

import { WiMoonrise, WiMoonset } from "react-icons/wi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DotSpinner } from "@uiball/loaders";

import stars from "../assets/stars.png";
import starsPlaceholder from "../assets/starsPlaceholder.jpg";

import FullMoon from "../assets/moonPhases/Full Moon.png";
import NewMoon from "../assets/moonPhases/New Moon.png";

import FirstQuarter from "../assets/moonPhases/First Quarter.png";
import LastQuarter from "../assets/moonPhases/Last Quarter.png";

import WaningCrescent from "../assets/moonPhases/Waning Crescent.png";
import WaningGibbous from "../assets/moonPhases/Waning Gibbous.png";

import WaxingCrescent from "../assets/moonPhases/Waxing Crescent.png";
import WaxingGibbous from "../assets/moonPhases/Waxing Gibbous.png";

const Astronomy = () => {
  const city = useSelector((state: RootState) => state.city.city);

  const getAstronomy = async (city: string) => {
    const response = await axios.get(
      "https://api.weatherapi.com/v1/astronomy.json",
      {
        params: {
          key: import.meta.env.VITE_API_KEY,
          q: city,
          days: "3",
        },
      }
    );

    return response.data.astronomy.astro;
  };

  const { isLoading, data, isError } = useQuery(["astronomy", city], () =>
    getAstronomy(city)
  );

  const moonPhases: {
    [key: string]: string;
  } = {
    "First Quarter": FirstQuarter,
    "Full Moon": FullMoon,
    "Last Quarter": LastQuarter,
    "New Moon": NewMoon,
    "Waning Crescent": WaningCrescent,
    "Waning Gibbous": WaningGibbous,
    "Waxing Crescent": WaxingCrescent,
    "Waxing Gibbous": WaxingGibbous,
  };

  const loadingContent = <DotSpinner size={25} speed={0.9} color="white" />;
  const errorContent = (
    <div className="flex items-center justify-center mt-40 text-4xl z-50 text-white">
      <p>Something went wrong...</p>
    </div>
  );

  const componentContent = (
    <>
      <div className="text-white w-72 h-72 mt-32 z-20 animate-appear">
        <LazyLoadImage
          src={moonPhases[data?.moon_phase]}
          alt={data?.moon_phase}
        />
      </div>
      <div className="text-white z-20 flex flex-col items-center gap-8 p-6  justify-center text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="animate-typing overflow-hidden whitespace-nowrap text-3xl md:text-5xl text-white font-bold">
            {isLoading ? loadingContent : data?.moon_phase}
          </span>
          <span>Moon Phase</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className=" text-3xl md:text-5xl">
            {isLoading ? loadingContent : data?.moon_illumination + "%"}
          </span>
          <span>Moon Illumination</span>
        </div>
        <div>
          <span className="flex items-center text-xl md:text-3xl">
            <WiMoonrise size={30} />
            {data?.moonrise}
          </span>
          <span className="flex items-center text-xl md:text-3xl">
            <WiMoonset size={30} />
            {data?.moonset}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen min-w-screen flex items-center flex-col gap-2 bg-cover bg-black">
      <LazyLoadImage
        src={stars}
        placeholderSrc={starsPlaceholder}
        alt="Background"
        className="absolute inset-0 w-full h-screen object-cover z-0 animate-move"
      />
      {isError ? errorContent : componentContent}
    </div>
  );
};

export default Astronomy;
