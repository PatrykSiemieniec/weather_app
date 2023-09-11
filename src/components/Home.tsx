import DailyWeather from "./DailyWeather";
import CurrentWeather from "./CurrentWeather";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 justify-center md:flex-row p-4 text-white   ">
      <section className="bg-[#217abc] p-10 lg:min-w-750 mt-20 rounded">
        <CurrentWeather />
      </section>

      <section className=" bg-[#217abc] p-10   rounded backdrop-blur-lg drop-shadow-lg md:mt-20 ">
        <div className="flex gap-4 flex-col ">
          <p className=" text-xl lg:text-2xl">Forecast</p>
        </div>
        <DailyWeather />
      </section>
    </div>
  );
};

export default Home;
