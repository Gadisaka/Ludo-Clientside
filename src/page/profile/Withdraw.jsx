import React, { useState } from "react";
import {
  FaArrowLeft,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaWallet,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const currentBalance = 2450.75;

  const withdrawMethods = [
    {
      id: "telebirr",
      name: "TeleBirr",
      icon: <FaMobileAlt className="w-6 h-6" />,
      description: "Withdraw to TeleBirr wallet",
      color: "from-orange-500 to-red-500",
      fee: "2%",
      minAmount: 50,
    },
    {
      id: "cbe",
      name: "CBE Bank",
      icon: <FaUniversity className="w-6 h-6" />,
      description: "Withdraw to CBE bank account",
      color: "from-blue-500 to-blue-600",
      fee: "Free",
      minAmount: 100,
    },
    {
      id: "awash",
      name: "Awash Bank",
      icon: <FaCreditCard className="w-6 h-6" />,
      description: "Withdraw to Awash bank account",
      color: "from-green-500 to-green-600",
      fee: "1%",
      minAmount: 100,
    },
    {
      id: "ebirr",
      name: "eBirr",
      icon: <FaWallet className="w-6 h-6" />,
      description: "eBirr digital wallet",
      color: "from-purple-500 to-purple-600",
      fee: "1.5%",
      minAmount: 25,
    },
  ];

  const selectedMethodData = withdrawMethods.find(
    (m) => m.id === selectedMethod
  );
  const withdrawAmount = parseFloat(amount) || 0;
  const fee =
    selectedMethodData?.fee === "Free"
      ? 0
      : withdrawAmount *
        (parseFloat(selectedMethodData?.fee?.replace("%", "") || "0") / 100);
  const totalDeduction = withdrawAmount + fee;

  const handleWithdraw = async () => {
    if (!selectedMethod || !amount || totalDeduction > currentBalance) return;
    alert(
      `Withdrawal of ${amount} ብር via ${selectedMethod} initiated! Fee: ${fee.toFixed(
        2
      )} ብር`
    );
  };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="text-white hover:bg-gray-700 rounded-full p-2"
            aria-label="Back"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">Withdraw Funds</h1>
        </div>
        {/* Current Balance */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Available Balance</p>
            <p className="text-3xl font-bold text-white">
              {currentBalance.toFixed(2)} ብር
            </p>
          </div>
        </div>
        {/* Amount Input */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-4">
          <label htmlFor="amount" className="block text-gray-300 mb-2">
            Amount (ብር)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 text-2xl h-14 rounded-md px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            max={currentBalance}
          />
          <div className="flex space-x-2 mt-2">
            {[100, 500, 1000, currentBalance].map((preset, index) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset.toString())}
                className="border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-md px-3 py-1 text-sm"
              >
                {index === 3 ? "Max" : `${preset} ብር`}
              </button>
            ))}
          </div>
        </div>
        {/* Withdrawal Methods */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="text-white font-semibold mb-3">
            Select Withdrawal Method
          </div>
          {withdrawMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center space-x-4 mb-2 ${
                selectedMethod === method.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center text-white`}
              >
                {method.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">{method.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {method.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 text-sm font-medium">
                      Fee: {method.fee}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Min: {method.minAmount} ብር
                    </p>
                  </div>
                </div>
              </div>
              {selectedMethod === method.id && (
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
        {/* Account Details Input */}
        {selectedMethod === "telebirr" || selectedMethod === "ebirr" ? (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-4">
            <label htmlFor="phone" className="block text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+251 9XX XXX XXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : selectedMethod === "cbe" || selectedMethod === "awash" ? (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-4">
            <label htmlFor="account" className="block text-gray-300 mb-2">
              Bank Account Number
            </label>
            <input
              id="account"
              type="text"
              placeholder="Enter account number"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : null}
        {/* Fee Breakdown */}
        {selectedMethod && amount && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Withdrawal Amount:</span>
                <span>{withdrawAmount.toFixed(2)} ብር</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Transaction Fee:</span>
                <span>{fee.toFixed(2)} ብር</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between text-white font-semibold">
                <span>Total Deduction:</span>
                <span>{totalDeduction.toFixed(2)} ብር</span>
              </div>
            </div>
          </div>
        )}
        {/* Warning for insufficient funds */}
        {totalDeduction > currentBalance && (
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-6 mb-4">
            <div className="flex items-center space-x-3 text-red-400">
              <FaExclamationTriangle className="w-5 h-5" />
              <p className="text-sm">
                Insufficient balance for this withdrawal amount including fees.
              </p>
            </div>
          </div>
        )}
        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          disabled={
            !selectedMethod || !amount || totalDeduction > currentBalance
          }
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 text-lg rounded-xl disabled:bg-gray-600"
        >
          Withdraw {amount ? `${amount} ብር` : "Funds"}
        </button>
        {/* Processing Time Notice */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mt-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-300 text-sm">
                Withdrawals are typically processed within 24-48 hours. Bank
                transfers may take 1-3 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
