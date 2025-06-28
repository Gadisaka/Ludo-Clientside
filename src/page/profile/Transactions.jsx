import React from "react";
import { FaCoins, FaArrowDown, FaArrowUp } from "react-icons/fa";

const mockTransactions = [
  { id: 1, type: "deposit", amount: 100, date: "2025-06-25" },
  { id: 2, type: "withdraw", amount: 50, date: "2025-06-24" },
  { id: 3, type: "deposit", amount: 200, date: "2025-06-23" },
];

const iconMap = {
  deposit: <FaArrowDown className="text-green-500" />,
  withdraw: <FaArrowUp className="text-red-500" />,
};

const Transactions = () => (
  <div className="w-full bg-gradient-to-r from-yellow-100 via-purple-200 to-yellow-300 rounded-xl p-6 shadow-lg animate-fade-in">
    <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
      <FaCoins className="text-yellow-500" /> Transactions
    </h2>
    <ul className="divide-y divide-yellow-300">
      {mockTransactions.map((tx) => (
        <li key={tx.id} className="flex items-center justify-between py-3">
          <span className="flex items-center gap-2">
            {iconMap[tx.type]}
            <span className="capitalize font-semibold text-gray-800">
              {tx.type}
            </span>
          </span>
          <span
            className={`font-bold ${
              tx.type === "deposit" ? "text-green-600" : "text-red-600"
            }`}
          >
            {tx.type === "deposit" ? "+" : "-"}
            {tx.amount}
          </span>
          <span className="text-gray-500 text-sm">{tx.date}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Transactions;
