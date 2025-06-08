import React from "react";
import {
  dieone,
  dietwo,
  diethree,
  diefour,
  diefive,
  diesix,
} from "../components/Dies";

const dieMap = {
  1: dieone,
  2: dietwo,
  3: diethree,
  4: diefour,
  5: diefive,
  6: diesix,
};

const DieRollingPage = ({
  value = 1,
  isRolling,
  // isMyTurn,
  // gameStatus,
  onRoll,
}) => {
  const isDisabled = false;

  return (
    <div className="flex justify-center bg-gray-300/30 border rounded-lg border-white/20 mt-4 backdrop-blur-md ">
      <button
        onClick={onRoll}
        disabled={isDisabled}
        className={`w-24 h-24 p-1   text-4xl font-bold text-black flex items-center justify-center  transition-transform duration-300 ease-in-out ${
          isRolling ? "animate-spin" : ""
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : " "}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          {dieMap[value]}
        </div>
      </button>
    </div>
  );
};

export default DieRollingPage;
