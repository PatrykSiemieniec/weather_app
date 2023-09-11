import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col p-8 ">
      <div className="mt-20 flex justify-center items-center flex-col gap-5">
        <p className=" text-5xl">PAGE NOT FOUND </p>
        <NavLink
          to="/"
          className="p-4 rounded border border-black hover:bg-slate-600 hover:text-white hover:border-white"
        >
          Back to main page
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
