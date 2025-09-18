import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTelegramAuthStore from "../store/telegramAuthStore";

const TelegramAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    loading,
    error,
    isTelegramWebApp,
    needsPhoneNumber,
    authenticateWithTelegram,
    updatePhoneNumber,
    autoAuthenticate,
    clearError,
  } = useTelegramAuthStore();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isRequestingPhone, setIsRequestingPhone] = useState(false);

  useEffect(() => {
    // Initialize Telegram Web App and attempt auto-authentication
    const initAuth = async () => {
      try {
        await autoAuthenticate();
      } catch (err) {
        console.error("Auto-authentication failed:", err);
      }
    };

    initAuth();
  }, [autoAuthenticate]);

  useEffect(() => {
    // Redirect if user is authenticated and doesn't need phone number
    if (user && !needsPhoneNumber) {
      navigate("/");
    }
  }, [user, needsPhoneNumber, navigate]);

  const handleRequestPhoneNumber = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsRequestingPhone(true);
      window.Telegram.WebApp.requestContact((contact) => {
        if (contact && contact.phone_number) {
          setPhoneNumber(contact.phone_number);
          handleSubmitPhoneNumber(contact.phone_number);
        } else {
          setIsRequestingPhone(false);
        }
      });
    }
  };

  const handleSubmitPhoneNumber = async (phone = phoneNumber) => {
    try {
      clearError();
      if (needsPhoneNumber) {
        await updatePhoneNumber(phone);
      } else {
        await authenticateWithTelegram(phone);
      }
    } catch (err) {
      console.error("Phone number submission failed:", err);
    }
  };

  const handleManualPhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      handleSubmitPhoneNumber();
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Authenticating with Telegram...</p>
        </div>
      </div>
    );
  }

  // Show error if not in Telegram Web App
  if (!isTelegramWebApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Access Restricted
          </h2>
          <p className="text-blue-100 mb-6">
            This game can only be accessed through Telegram. Please open this
            link in Telegram to play.
          </p>
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-200 text-sm">
              <strong>How to access:</strong>
              <br />
              1. Open Telegram
              <br />
              2. Search for the bot
              <br />
              3. Click "Play Game" or use the menu
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show phone number request if needed
  if (needsPhoneNumber) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg mb-4">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Phone Number Required
            </h2>
            <p className="text-blue-100 text-sm">
              We need your phone number to complete your account setup and
              enable game features.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Share Phone Button */}
            <button
              onClick={handleRequestPhoneNumber}
              disabled={isRequestingPhone}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isRequestingPhone ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Requesting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Share My Phone Number</span>
                </div>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-blue-200">or</span>
              </div>
            </div>

            {/* Manual Phone Input */}
            <form onSubmit={handleManualPhoneSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-blue-100 mb-2"
                >
                  Enter Phone Number Manually
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1234567890"
                  className="block w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={!phoneNumber.trim()}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Continue
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-blue-200 text-xs">
              Your phone number is used for account verification and game
              features only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Initializing...</p>
      </div>
    </div>
  );
};

export default TelegramAuth;
