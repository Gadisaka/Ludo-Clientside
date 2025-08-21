import React, { useState, useEffect } from "react";
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

const GameHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch game history on component mount
  useEffect(() => {
    fetchGameHistory();
  }, []);

  const fetchGameHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch game history from the backend
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/games/history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch game history");
      }

      const data = await response.json();

      // Transform the data to match our component's expected format
      const transformedHistory = data.games.map((game) => {
        const isWinner = game.winnerId === user?.id;
        const hasBots = game.players && game.players.some((p) => p.isBot);
        const cutPercentage = import.meta.env.VITE_GAME_CUT_PERCENTAGE || 10; // Default to 10%

        return {
          id: game._id,
          gameType: hasBots
            ? "Bot Match"
            : game.players && game.players.length === 2
            ? "2-Player Match"
            : "Multi-Player Match",
          result: isWinner ? "won" : "lost",
          amount: isWinner
            ? 2 * game.stake - (2 * game.stake * cutPercentage) / 100 // Use dynamic cut percentage
            : -game.stake, // Lost stake
          playerCount: game.players ? game.players.length : 2, // Default to 2 if not available
          date: new Date(game.createdAt).toISOString().split("T")[0],
          time: new Date(game.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          duration: calculateGameDuration(game.createdAt, game.updatedAt),
          stake: game.stake,
          roomId: game.roomId,
          players: game.players || [],
          hasBots: hasBots || false,
        };
      });

      setGameHistory(transformedHistory);
    } catch (err) {
      console.error("Error fetching game history:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateGameDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "Unknown";

    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;

    const minutes = Math.floor(durationMs / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

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
              onClick={fetchGameHistory}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
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
                onClick={fetchGameHistory}
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
            {/* Stats Summary */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center">
                <FaTrophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {gameHistory.filter((game) => game.result === "won").length}
                </p>
                <p className="text-gray-400">Games Won</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center">
                <FaBullseye className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {gameHistory.filter((game) => game.result === "lost").length}
                </p>
                <p className="text-gray-400">Games Lost</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center">
                <FaClock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {gameHistory.length}
                </p>
                <p className="text-gray-400">Total Games</p>
              </div>
            </div> */}
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
                              {game.gameType}
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
                              <FaClock className="w-4 h-4" />
                              <span>{game.duration}</span>
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
