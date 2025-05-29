// DieRollButton.tsx
import React, { useState } from "react";
import { Howl } from "howler";
import {
  dieone,
  dietwo,
  diethree,
  diefour,
  diefive,
  diesix,
} from "../components/Dies";

const diceSound = new Howl({
  src: ["/dice-roll.mp3"], // Make sure this exists in the public folder
});

const getRandomDie = () => Math.floor(Math.random() * 6) + 1;

// Helper to map number to SVG die
const dieMap = {
  1: dieone,
  2: dietwo,
  3: diethree,
  4: diefour,
  5: diefive,
  6: diesix,
};

const DieRollButton = () => {
  const [value, setValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = () => {
    if (isRolling) return;

    setIsRolling(true);
    diceSound.play();

    setTimeout(() => {
      const newValue = getRandomDie();
      setValue(newValue);
      setIsRolling(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleRoll}
      className="w-24 h-24 p-1 bg-gray-300/30 backdrop-blur-md border border-white/20 rounded-lg text-4xl font-bold text-black flex items-center justify-center shadow-lg transition-transform duration-300 ease-in-out"
    >
      <div
        className={`flex justify-center items-center w-full h-full ${
          isRolling ? "animate-spin" : ""
        }`}
      >
        {dieMap[value]}
      </div>
    </button>
  );
};

export default DieRollButton;
