import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../store/zutstand";
const Navbar = () => {
  const avatar = useUserStore((state) => state.avatar);
  // Zustand store to manage user data

  useEffect(() => {
    if (avatar === null) {
      console.log("No avatar set. Please choose an avatar.");
    }
  }, [avatar]);

  return (
    <div className="w-full h-16 bg-gray-950 flex items-center justify-between px-4">
      <div className="flex items-center justify-center">
        <Link className="w-full" to="/">
          <h1 className="text-white text-2xl font-bold">
            Ethio<span className="text-yellow-500">Ludo</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <button className="text-yellow-500 p-1 flex border-2 rounded-full items-center">
          {avatar !== null ? (
            <img
              src={avatar}
              alt="User Avatar"
              className="w-[30px] h-[30px] rounded-full"
            />
          ) : (
            <svg
              fill="#ffc60d"
              width="30px"
              height="30px"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
