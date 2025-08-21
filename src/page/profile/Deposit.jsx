import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaWallet,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../../store/walletStore";

const Deposit = () => {
  const navigate = useNavigate();
  const { 
    balance, 
    loading, 
    error, 
    deposit, 
    getBalance, 
    clearError 
  } = useWalletStore();
  
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch balance on component mount
  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const paymentMethods = [
    {
      id: "telebirr",
      name: "TeleBirr",
      icon: <FaMobileAlt className="w-6 h-6" />,
      description: "Pay with TeleBirr mobile wallet",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "cbe",
      name: "CBE Birr",
      icon: <FaUniversity className="w-6 h-6" />,
      description: "Commercial Bank of Ethiopia",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "awash",
      name: "Awash Bank",
      icon: <FaCreditCard className="w-6 h-6" />,
      description: "Awash Bank payment",
      color: "from-green-500 to-green-600",
    },
    {
      id: "ebirr",
      name: "eBirr",
      icon: <FaWallet className="w-6 h-6" />,
      description: "eBirr digital wallet",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const handleDeposit = async () => {
    if (!selectedMethod || !amount) return;
    
    try {
      clearError();
      const result = await deposit(amount, selectedMethod, phoneNumber);
      
      setSuccessMessage(`Successfully deposited ${amount} ብር via ${selectedMethod}!`);
      setShowSuccess(true);
      
      // Reset form
      setAmount("");
      setSelectedMethod("");
      setPhoneNumber("");
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error("Deposit failed:", error);
    }
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
          <h1 className="text-2xl font-bold text-white">Deposit Funds</h1>
        </div>

        {/* Current Balance */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Current Balance</p>
            <p className="text-3xl font-bold text-white">
              {loading ? "Loading..." : `${balance.toFixed(2)} ብር`}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3 text-red-400">
              <FaExclamationTriangle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-900/20 border border-green-700 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3 text-green-400">
              <FaCheckCircle className="w-5 h-5" />
              <p className="text-sm">{successMessage}</p>
            </div>
          </div>
        )}
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
          />
          <div className="flex space-x-2 mt-2">
            {[100, 500, 1000, 2000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset.toString())}
                className="border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-md px-3 py-1 text-sm"
              >
                {preset} ብር
              </button>
            ))}
          </div>
        </div>
        {/* Payment Methods */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="text-white font-semibold mb-3">
            Select Payment Method
          </div>
          {paymentMethods.map((method) => (
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
                <h3 className="text-white font-semibold">{method.name}</h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </div>
              {selectedMethod === method.id && (
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
        {/* Phone Number Input (for mobile payments) */}
        {(selectedMethod === "telebirr" || selectedMethod === "ebirr") && (
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
        )}
        {/* Deposit Button */}
        <button
          onClick={handleDeposit}
          disabled={!selectedMethod || !amount || loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-xl disabled:bg-gray-600 flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            `Deposit ${amount ? `${amount} ብር` : "Funds"}`
          )}
        </button>
        {/* Security Notice */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mt-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-300 text-sm">
                Your payment is secured by Chapa. All transactions are encrypted
                and protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
