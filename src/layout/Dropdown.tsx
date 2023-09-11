import { Menu, Transition } from "@headlessui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineClockCircle,
} from "react-icons/ai";

import { GoHistory } from "react-icons/go";
import { BsMoonStars, BsGithub, BsLinkedin } from "react-icons/bs";

function Dropdown() {
  return (
    <Menu>
      <Menu.Button>
        <AiOutlineMenu />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" bg-[#475164] h-full flex flex-col gap-4 fixed z-50 right-0 top-0 p-5  text-white border-l border-black ">
          <Menu.Item>
            {({ close }) => (
              <div
                className="flex justify-end text-2xl h-20 mt-4 -mr-2"
                onClick={close}
              >
                <AiOutlineClose />
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            <NavLink
              to="/"
              className="text-xl lg:text-2xl p-1 flex gap-2 items-center  "
            >
              <AiOutlineHome />
              <b>Main Page</b>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              to="/hourly"
              className="text-xl lg:text-2xl p-1 flex gap-2 items-center  "
            >
              <AiOutlineClockCircle />
              <b>Hourly Weather</b>
            </NavLink>
          </Menu.Item>

          <Menu.Item>
            <NavLink
              to="/historical"
              className="text-xl lg:text-2xl p-1 flex gap-2 items-center  "
            >
              <GoHistory />
              <b>Historical</b>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              to="/astronomy"
              className="text-xl lg:text-2xl p-1  flex gap-2 items-center"
            >
              <BsMoonStars />
              <b>Astronomy</b>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://github.com/PatrykSiemieniec/weather_app"
              className="text-xl lg:text-2xl p-1  flex gap-2 items-center mt-auto"
            >
              <BsGithub />
              <b>Github</b>
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://www.linkedin.com/in/patryksiemieniec99/"
              className="text-xl lg:text-2xl p-1  flex gap-2 items-center"
            >
              <BsLinkedin />
              <b>LinkedIn</b>
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
