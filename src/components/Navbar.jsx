import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useUserStore from "../store/zutstand";
import img from "../assets/ludoimage.png";
const Navbar = () => {
  const avatar = useUserStore((state) => state.avatar);

  // Zustand store to manage user data

  useEffect(() => {
    if (avatar === null) {
      console.log("No avatar set. Please choose an avatar.");
    }
  }, [avatar]);

  return (
    <div className="w-full h-16  flex fixed bottom-0 left-0  items-center justify-center px-4">
      <div className="flex items-center  justify-between w-full h-full px-8 rounded-t-xl  bg-gray-950 ">
        <NavLink className="" to="/">
          {({ isActive }) => (
            <svg
              width={isActive ? "28px" : "20px"}
              height={isActive ? "28px" : "20px"}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`text-gray-800 hover:text-amber-700 transition-transform duration-200 ${
                isActive ? "scale-125" : "scale-100"
              } active:scale-90`}
            >
              <path
                d="M3 10.75L12 4l9 6.75"
                stroke={isActive ? "#22c55e" : "#fff"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <rect
                x="6"
                y="14"
                width="12"
                height="6"
                rx="2"
                stroke={isActive ? "#22c55e" : "#fff"}
                strokeWidth="2"
                fill="none"
              />
            </svg>
          )}
        </NavLink>
        <NavLink className="" to="/notification">
          {({ isActive }) => (
            <svg
              width={isActive ? "38px" : "30px"}
              height={isActive ? "38px" : "30px"}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${
                isActive ? "scale-125" : "scale-100"
              } active:scale-90`}
            >
              <path
                d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z"
                fill={isActive ? "#22c55e" : "#fff"}
              />
              <path
                d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2v1h16v-1l-2-2z"
                stroke={isActive ? "#22c55e" : "#fff"}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </NavLink>
        <NavLink
          className=" border-8 mb-10 border-gray-900 rounded-full "
          to="/game"
        >
          {({ isActive }) => (
            <img
              src={img}
              alt="img"
              className={`rounded-full transition-transform duration-200 w-[60px] h-[60px]  ${
                isActive ? "ring-4 ring-green-500 scale-125" : "scale-100"
              } active:scale-90`}
            />
          )}
        </NavLink>
        <NavLink className="" to="/history">
          {({ isActive }) => (
            <svg
              width={isActive ? "28px" : "20px"}
              height={isActive ? "28px" : "20px"}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${
                isActive ? "scale-125" : "scale-100"
              } active:scale-90`}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke={isActive ? "#22c55e" : "#fff"}
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M12 7v5l3 3"
                stroke={isActive ? "#22c55e" : "#fff"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </NavLink>
        <NavLink className=" " to="/profile">
          {({ isActive }) => (
            <svg
              width={isActive ? "38px" : "30px"}
              height={isActive ? "38px" : "30px"}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${
                isActive ? "scale-125" : "scale-100"
              } active:scale-90`}
            >
              <circle
                cx="12"
                cy="8"
                r="4"
                stroke={isActive ? "#22c55e" : "#fff"}
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M4 20c0-3.314 3.134-6 8-6s8 2.686 8 6"
                stroke={isActive ? "#22c55e" : "#fff"}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
