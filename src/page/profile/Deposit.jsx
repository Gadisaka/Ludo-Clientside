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
import useBankStore from "../../store/bankStore";
import axios from "axios";
import { API_URL } from "../../../constants";

const Deposit = () => {
  const navigate = useNavigate();
  const { balance, loading, error, getBalance, clearError, setBalance } =
    useWalletStore();
  const {
    banks,
    loading: banksLoading,
    error: banksError,
    getAllBanks,
  } = useBankStore();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  // Fetch balance and banks on component mount
  useEffect(() => {
    getBalance();
    getAllBanks();
  }, [getBalance, getAllBanks]);

  // Convert bank data to payment methods format
  const getPaymentMethods = () => {
    if (!banks || banks.length === 0) {
      return [];
    }

    return banks.map((bank) => {
      // Determine type based on bank name
      const isMobile = bank.bankName.toLowerCase().includes("telebirr");
      const type = isMobile ? "mobile" : "account";

      // Get appropriate icon and color based on bank name
      let icon, color;
      const bankNameLower = bank.bankName.toLowerCase();

      if (bankNameLower.includes("telebirr")) {
        icon = <FaMobileAlt className="w-6 h-6" />;
        color = "from-orange-500 to-red-500";
      } else if (bankNameLower.includes("cbe")) {
        icon = <FaUniversity className="w-6 h-6" />;
        color = "from-blue-500 to-blue-600";
      } else {
        // Default icon and color for unknown banks
        icon = <FaCreditCard className="w-6 h-6" />;
        color = "from-gray-500 to-gray-600";
      }

      return {
        id: bank._id,
        name: bank.bankName,
        icon,
        description: bank.accountFullName,
        color,
        type,
        number: bank.number,
      };
    });
  };

  const paymentMethods = getPaymentMethods();

  const handleDeposit = async () => {
    if (!selectedMethod || !amount) return;

    // Clear any previous verification errors
    setVerificationError("");

    // Show confirmation step
    setShowConfirmation(true);
  };

  const handleConfirmPayment = async () => {
    if (!transactionId) return;

    // Check if required fields are filled based on payment method
    const selectedPaymentMethod = paymentMethods.find(
      (method) => method.id === selectedMethod
    );
    if (selectedPaymentMethod.type === "mobile" && !phoneNumber) return;
    if (selectedPaymentMethod.type === "account" && !accountNumber) return;

    try {
      clearError();
      setVerificationError("");
      setVerificationLoading(true);

      // Determine provider based on bank name
      const bankName = selectedPaymentMethod.name.toLowerCase();
      const provider = bankName.includes("telebirr") ? "telebirr" : "cbe";

      // Get auth token
      const token = JSON.parse(localStorage.getItem("auth-storage"))?.state
        ?.token;
      if (!token) {
        throw new Error("No authentication token");
      }

      // Call the new verification endpoint
      const response = await axios.post(
        `${API_URL}/wallet/verify-deposit`,
        {
          referenceId: transactionId,
          receivedAmount: parseFloat(amount),
          receiverName: selectedPaymentMethod.description, // Bank account holder name
          receiverAccountNumber: selectedPaymentMethod.number, // Bank account number
          payerAccountNumber:
            selectedPaymentMethod.type === "mobile"
              ? phoneNumber
              : accountNumber || "none",
          paymentProvider: provider,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // Update balance from server response
        setBalance(response.data.newBalance);

        setSuccessMessage(
          `Successfully deposited ${amount} ብር via ${selectedPaymentMethod.name}!`
        );
        setShowSuccess(true);
        setShowConfirmation(false);

        // Reset form
        setAmount("");
        setSelectedMethod("");
        setPhoneNumber("");
        setAccountNumber("");
        setTransactionId("");

        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        // Display verification error
        setVerificationError(
          response.data.message || "Transaction verification failed"
        );
      }
    } catch (error) {
      console.error("Deposit failed:", error);
      setVerificationError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred during verification"
      );
    } finally {
      setVerificationLoading(false);
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

        {/* Verification Error Message */}
        {verificationError && (
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3 text-red-400">
              <FaExclamationTriangle className="w-5 h-5" />
              <p className="text-sm">{verificationError}</p>
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

          {/* Banks Loading State */}
          {banksLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
              <span className="text-gray-400">Loading payment methods...</span>
            </div>
          )}

          {/* Banks Error State */}
          {banksError && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3 text-red-400">
                <FaExclamationTriangle className="w-5 h-5" />
                <p className="text-sm">{banksError}</p>
              </div>
              <button
                onClick={getAllBanks}
                className="mt-2 text-red-400 hover:text-red-300 text-sm underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Payment Methods List */}
          {!banksLoading &&
            !banksError &&
            paymentMethods.map((method) => (
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

          {/* No Payment Methods Available */}
          {!banksLoading && !banksError && paymentMethods.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No payment methods available</p>
              <p className="text-gray-500 text-sm">
                Please contact support or try refreshing the page
              </p>
            </div>
          )}
        </div>
        {/* Deposit Button */}
        {!showConfirmation && (
          <button
            onClick={handleDeposit}
            disabled={!selectedMethod || !amount || loading || banksLoading}
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
        )}

        {/* Confirmation Step */}
        {showConfirmation && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-4">
            <h3 className="text-white font-semibold text-lg mb-4">
              Confirm Payment
            </h3>

            {/* Payment Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white font-semibold">{amount} ብር</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method:</span>
                <span className="text-white font-semibold">
                  {
                    paymentMethods.find(
                      (method) => method.id === selectedMethod
                    )?.name
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">
                  {paymentMethods.find((method) => method.id === selectedMethod)
                    ?.type === "mobile"
                    ? "Your Phone Number:"
                    : "Your Account Number:"}
                </span>
                <span className="text-white font-semibold">
                  {paymentMethods.find((method) => method.id === selectedMethod)
                    ?.type === "mobile"
                    ? phoneNumber
                    : accountNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Account Number:</span>
                <span className="text-white font-semibold">
                  {
                    paymentMethods.find(
                      (method) => method.id === selectedMethod
                    )?.number
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Receiver Name:</span>
                <span className="text-white font-semibold">
                  {
                    paymentMethods.find(
                      (method) => method.id === selectedMethod
                    )?.description
                  }
                </span>
              </div>
            </div>

            {/* Guidance Text */}
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
              <p className="text-blue-300 text-sm whitespace-pre-line">
                {(() => {
                  const selectedPaymentMethod = paymentMethods.find(
                    (method) => method.id === selectedMethod
                  );
                  if (!selectedPaymentMethod) return "";

                  const bankName = selectedPaymentMethod.name.toLowerCase();
                  const receiverName = selectedPaymentMethod.description;
                  const accountNumber = selectedPaymentMethod.number;

                  if (bankName.includes("cbe")) {
                    return `በሲቢኢ ለማስገባት እባክዎ እነዚህን ደረጃዎች ይከተሉ 
1. ${amount} ETB ወደሚከተለው አካውንት ያስተላልፉ: - የአካውንት ቁጥር: ${accountNumber} - የአካውንት ስም: ${receiverName} 
2. ከማስተላለፍ በኋላ እንደዚህ ያለ ሊንክ ያለው የማረጋገጫ መልእክት ይደርሶታል : https://apps.cbe.com.et: 100/?id=FT2516052C43... 
3. የግብይት መለያውን (FT እና 10 ፊደሎችን ተከተሎ የሚመጣውን) ይቅዱ`;
                  } else if (bankName.includes("telebirr")) {
                    return `በቴሌብር ለማስገባት እባክዎ እነዚህን ደረጃዎች ይከተሉ:

1. ${amount} ETB ወደሚከተለው አካውንት ያስተላልፉ: - የአካውንት ቁጥር: ${accountNumber} - የአካውንት ስም: ${receiverName}

2. ከማስተላለፍ በኋላ Transaction Id ያለው የማረጋገጫ መልእክት ይደርሶታል

3. የግብይት መለያውን (Transaction Id) እዚህ ያስገቡ`;
                  } else {
                    return "ከላይ ባለው አካውንት ገንዘብ ካስገቡ ቡሃላ ከደረሰኙ ላይ ያለውን Transaction Id ከታች ያስገቡ. ለማንኛውም አይነት ችግር በ 0911111111 ይደውሉ";
                  }
                })()}
              </p>
            </div>

            {/* Transaction ID Input */}
            <div className="mb-6">
              <label
                htmlFor="transactionId"
                className="block text-gray-300 mb-2"
              >
                Transaction ID
              </label>
              <input
                id="transactionId"
                type="text"
                placeholder="Enter transaction ID from your payment"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number Input (for mobile payments) */}
            {paymentMethods.find((method) => method.id === selectedMethod)
              ?.type === "mobile" && (
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-300 mb-2">
                  Your Phone Number
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

            {/* Account Number Input (for bank payments) */}
            {paymentMethods.find((method) => method.id === selectedMethod)
              ?.type === "account" && (
              <div className="mb-6">
                <label htmlFor="account" className="block text-gray-300 mb-2">
                  Your Account Number
                </label>
                <input
                  id="account"
                  type="text"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setVerificationError("");
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={!transactionId || verificationLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl disabled:bg-gray-600 flex items-center justify-center"
              >
                {verificationLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  "Verify Payment"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deposit;
