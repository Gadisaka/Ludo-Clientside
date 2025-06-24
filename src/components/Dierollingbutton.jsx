import React from "react";
import {
  dieone,
  dietwo,
  diethree,
  diefour,
  diefive,
  diesix,
} from "../components/Dies";
import animation3d from "../assets/Animation - 1750682737621.gif";

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
  isMyTurn,
  gameStatus,
  onRoll,
  players,
  currentTurn,
}) => {
  const isDisabled = isRolling || !isMyTurn || gameStatus !== "playing";
  const block = !isMyTurn || gameStatus !== "playing";

  players.filter((player) => player.id === currentTurn);

  return (
    <div className="flex justify-center bg-blue-500/20 border rounded-lg border-white/20 ">
      <button
        onClick={onRoll}
        disabled={isDisabled}
        className={`w-24 h-24 p-1   text-4xl font-bold text-black flex items-center justify-center  transition-transform duration-300 ease-in-out  ${
          block ? "opacity-50 cursor-not-allowed" : " "
        }`}
      >
        <div className="w-full h-full flex items-center justify-center">
          {isRolling ? (
            <img src={animation3d} alt="3d" className="z-100 w-24 h-24" />
          ) : (
            dieMap[value]
          )}
        </div>
      </button>
    </div>
  );
};

export default DieRollingPage;
