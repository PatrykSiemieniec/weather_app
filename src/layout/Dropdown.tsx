import { Menu, Transition } from "@headlessui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
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
        <Menu.Items className=" flex flex-col gap-1 p-1  fixed z-50 right-4  bg-sky bg-opacity-50 text-white rounded-lg border ">
          <Menu.Item>
            <NavLink
              to="/hourly"
              className="text-xl lg:text-2xl p-1 bg-white bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg"
            >
              <b>Pogoda godzinowa</b>
            </NavLink>
          </Menu.Item>

          <Menu.Item disabled>
            <NavLink
              to="/hourly"
              className="text-xl lg:text-2xl p-1  bg-white bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg"
            >
              <b>Marine</b>
            </NavLink>
          </Menu.Item>
          <Menu.Item disabled>
            <NavLink
              to="/hourly"
              className="text-xl lg:text-2xl p-1  bg-white bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg "
            >
              <b>Historical</b>
            </NavLink>
          </Menu.Item>
          <Menu.Item disabled>
            <NavLink
              to="/hourly"
              className="text-xl lg:text-2xl p-1  bg-white bg-opacity-20  rounded backdrop-blur-lg drop-shadow-lg"
            >
              <b>Astronomy</b>
            </NavLink>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
