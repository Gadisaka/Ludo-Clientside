import React, { useEffect } from "react";
import {
  FaTrophy,
  FaClock,
  FaUsers,
  FaArrowLeft,
  FaCalendar,
  FaBullseye,
  FaSpinner,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useGameHistoryStore from "../store/gameHistoryStore";

const GameHistory = () => {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const { gameHistory, loading, error, fetchGameHistory } =
    useGameHistoryStore();

  console.log("GameHistory component render - Store state:", {
    gameHistory: gameHistory.length,
    loading,
    error,
    fetchGameHistory: typeof fetchGameHistory,
  });

  console.log("User object details:", {
    user: user,
    userId: user?.id || user?._id,
    userType: typeof user,
    hasUser: !!user,
    hasUserId: !!(user?.id || user?._id),
  });

  // Fetch game history on component mount
  useEffect(() => {
    console.log("History component useEffect triggered");
    console.log("User object:", user);
    console.log("User ID:", user?.id);
    console.log("Token:", token ? "Present" : "Missing");
    console.log("fetchGameHistory function:", fetchGameHistory);

    const userId = user?.id || user?._id;
    if (userId && token) {
      console.log("Calling fetchGameHistory with user ID:", userId);
      fetchGameHistory(userId, token);
    } else {
      console.log("No user ID or token available, cannot fetch game history");
    }
  }, [user?.id, token, fetchGameHistory]);

  // Debug useEffect - runs on every render to track user changes
  useEffect(() => {
    console.log("Debug useEffect - User changed:", user);
  });

  const getResultIcon = (result) => {
    if (result === "won") {
      return <FaTrophy className="w-5 h-5 text-yellow-400" />;
    }
    return <FaBullseye className="w-5 h-5 text-red-400" />;
  };

  const getResultColor = (result) => {
    if (result === "won") return "text-green-400";
    return "text-red-400";
  };

  const formatAmount = (amount) => {
    const absAmount = Math.abs(amount);
    return amount >= 0 ? `+${absAmount} ብር` : `-${absAmount} ብር`;
  };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-xl mb-4">
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-2"
                aria-label="Back"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <div className="text-white text-2xl flex items-center space-x-2 font-bold">
                <FaClock className="w-6 h-6 text-blue-400" />
                <span>Game History</span>
              </div>
            </div>
            <button
              onClick={() =>
                (user?.id || user?._id) &&
                token &&
                fetchGameHistory(user?.id || user?._id, token)
              }
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <FaClock className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
        {/* Game History Content */}
        {loading ? (
          <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-xl">
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSpinner className="w-12 h-12 text-blue-400 animate-spin" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Loading Game History
              </h3>
              <p className="text-gray-400 text-lg">
                Please wait while we fetch your game history...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-xl">
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBullseye className="w-12 h-12 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Error Loading History
              </h3>
              <p className="text-gray-400 text-lg mb-6">{error}</p>
              <button
                onClick={() =>
                  (user?.id || user?._id) &&
                  token &&
                  fetchGameHistory(user?.id || user?._id, token)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : gameHistory.length === 0 ? (
          <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-xl">
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClock className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Game History
              </h3>
              <p className="text-gray-400 text-lg">
                You haven't played any games yet. Start playing to see your game
                history here!
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl"
              >
                Start Playing
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Game History List */}
            <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-xl">
              <div className="p-0">
                <div className="space-y-1">
                  {gameHistory.map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-6 hover:bg-gray-800 transition-colors duration-150 border-b border-gray-700 last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                          {getResultIcon(game.result)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-white font-semibold text-lg">
                              {/* {game.gameType} */}Quick Match
                            </p>
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded-full ${
                                game.result === "won"
                                  ? "bg-green-900 text-green-300"
                                  : "bg-red-900 text-red-300"
                              }`}
                            >
                              {game.result.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center space-x-1">
                              <FaCalendar className="w-4 h-4" />
                              <span>
                                {game.date} • {game.time}
                              </span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FaUsers className="w-4 h-4" />
                              <span>{game.playerCount} players</span>
                            </span>

                            <span className="flex items-center space-x-1">
                              <span className="text-yellow-400 font-medium">
                                Stake: {game.stake} ብር
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold text-xl ${getResultColor(
                            game.result
                          )}`}
                        >
                          {formatAmount(game.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameHistory;
