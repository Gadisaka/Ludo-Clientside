import React, { useState } from "react";
import useUserStore from "../store/zutstand";
import Deposit from "./profile/Deposit";
import Withdraw from "./profile/Withdraw";
import Transactions from "./profile/Transactions";
import {
  FaCoins,
  FaLock,
  FaArrowDown,
  FaArrowUp,
  FaHistory,
  FaUserCircle,
} from "react-icons/fa";

const Profile = () => {
  const username = useUserStore((state) => state.username) || "Guest";
  const balance = useUserStore((state) => state.balance) || 0;
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-purple-900 via-gray-900 to-yellow-900 py-12 px-2">
      <div className="bg-gray-900/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-lg border-2 border-yellow-500/30 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-yellow-400 via-yellow-600 to-purple-500 p-2 rounded-full shadow-lg border-4 border-gray-900">
          <FaUserCircle className="text-white text-6xl drop-shadow-lg" />
        </div>
        <h1 className="mt-12 text-3xl font-extrabold text-yellow-400 tracking-wide drop-shadow-lg">
          @{username}
        </h1>
        <div className="flex items-center gap-2 mt-4 mb-8 text-2xl font-bold text-white bg-gray-800/80 px-6 py-3 rounded-xl shadow-inner border border-yellow-400/30">
          <FaCoins className="text-yellow-400 animate-bounce" />
          <span className="text-yellow-300">{balance}</span>
        </div>
        <button
          className="mb-8 px-6 py-2 bg-gradient-to-r from-purple-600 via-yellow-500 to-yellow-400 text-white rounded-full font-semibold shadow-lg hover:scale-105 hover:from-yellow-500 hover:to-purple-600 transition-all flex items-center gap-2"
          onClick={() => setActiveTab(activeTab === "change" ? null : "change")}
        >
          <FaLock className="inline-block" /> Change Password
        </button>
        <div className="flex gap-4 mb-8 w-full justify-center">
          <button
            className={`flex flex-col items-center px-6 py-3 rounded-xl font-bold shadow-md border-2 transition-all duration-200 ${
              activeTab === "deposit"
                ? "bg-yellow-400 text-gray-900 border-yellow-500 scale-105"
                : "bg-gray-800/80 text-yellow-300 border-yellow-700 hover:bg-yellow-500/80 hover:text-white"
            }`}
            onClick={() =>
              setActiveTab(activeTab === "deposit" ? null : "deposit")
            }
          >
            <FaArrowDown className="text-2xl mb-1" /> Deposit
          </button>
          <button
            className={`flex flex-col items-center px-6 py-3 rounded-xl font-bold shadow-md border-2 transition-all duration-200 ${
              activeTab === "withdraw"
                ? "bg-yellow-400 text-gray-900 border-yellow-500 scale-105"
                : "bg-gray-800/80 text-yellow-300 border-yellow-700 hover:bg-yellow-500/80 hover:text-white"
            }`}
            onClick={() =>
              setActiveTab(activeTab === "withdraw" ? null : "withdraw")
            }
          >
            <FaArrowUp className="text-2xl mb-1" /> Withdraw
          </button>
          <button
            className={`flex flex-col items-center px-6 py-3 rounded-xl font-bold shadow-md border-2 transition-all duration-200 ${
              activeTab === "transactions"
                ? "bg-yellow-400 text-gray-900 border-yellow-500 scale-105"
                : "bg-gray-800/80 text-yellow-300 border-yellow-700 hover:bg-yellow-500/80 hover:text-white"
            }`}
            onClick={() =>
              setActiveTab(activeTab === "transactions" ? null : "transactions")
            }
          >
            <FaHistory className="text-2xl mb-1" /> Transaction
          </button>
        </div>
        <div className="w-full flex flex-col items-center min-h-[120px]">
          {activeTab === "deposit" && <Deposit />}
          {activeTab === "withdraw" && <Withdraw />}
          {activeTab === "transactions" && <Transactions />}
          {activeTab === "change" && (
            <div className="w-full bg-gray-800/90 rounded-xl p-6 text-center text-white shadow-lg border border-yellow-400/20 animate-fade-in">
              <h2 className="text-xl font-bold mb-2">Change Password</h2>
              <p className="text-gray-300">Feature coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
