import React from "react";
import { FaArrowUp } from "react-icons/fa";

const Withdraw = () => (
  <div className="w-full bg-gradient-to-r from-purple-300 via-yellow-200 to-yellow-400 rounded-xl p-6 shadow-lg flex flex-col items-center animate-fade-in">
    <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
      <FaArrowUp className="text-yellow-500 animate-bounce" /> Withdraw Coins
    </h2>
    <input
      type="number"
      placeholder="Enter amount (mock)"
      className="w-2/3 px-4 py-2 rounded-lg border-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg text-center mb-4 bg-white/80"
      disabled
    />
    <button
      className="px-6 py-2 bg-yellow-400 text-purple-900 font-bold rounded-full shadow-md cursor-not-allowed opacity-60"
      disabled
    >
      Withdraw (Coming Soon)
    </button>
  </div>
);

export default Withdraw;
