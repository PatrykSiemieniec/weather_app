import * as React from "react";
import { NavLink } from "react-router-dom";
export default function Header() {
  const activeStyle = {
    textDecoration: "underline",
  };
  return (
    <div className="w-screen h-24 bg-gray-700 flex items-center text-white gap-16 place-content-around  ">
      <div className="flex gap-10">
        <NavLink to="/" className="text-4xl">
          Weather App
        </NavLink>
        <input
          type="search"
          className=" h-10 w-48 p-4 text-black"
          placeholder="Search location..."
        />
      </div>
      <ul className="flex gap-12 text-2xl ">
        <NavLink
          to="/daily"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Hourly Weather
        </NavLink>
        <li>Sth1</li>
        <li>Sth2</li>
      </ul>
    </div>
  );
}
