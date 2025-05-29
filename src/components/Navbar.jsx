import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gray-950 flex items-center justify-between px-4">
      <div className="flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">
          Ethio<span className="text-yellow-500">Ludo</span>
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <button className="text-yellow-500 p-2 ">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
