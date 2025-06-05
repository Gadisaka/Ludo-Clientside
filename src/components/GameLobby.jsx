import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://ludo-serverside.onrender.com", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
  transports: ["websocket", "polling"],
});

const GameLobby = ({ onGameStart }) => {
  const [playerName, setPlayerName] = useState("");
  const [availableGames, setAvailableGames] = useState([]);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to server");
      setIsConnected(true);
      setIsConnecting(false);
      setError("");
      socket.emit("get_available_games");
    };

    const handleDisconnect = (reason) => {
      console.log("Disconnected from server:", reason);
      setIsConnected(false);
      setIsConnecting(false);
      setError(
        `Disconnected from server. ${
          reason === "io server disconnect"
            ? "Server disconnected"
            : "Trying to reconnect..."
        }`
      );
    };

    const handleConnectError = (error) => {
      console.error("Connection error:", error);
      setError(
        "Failed to connect to server. Please check if the server is running."
      );
      setIsConnecting(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("available_games", (games) => {
      console.log("Received available games:", games);
      setAvailableGames(games);
    });
    socket.on("error_message", (msg) => {
      console.error("Server error:", msg);
      setError(msg);
    });

    // Initial connection check
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("available_games");
      socket.off("error_message");
    };
  }, []);

  const handleCreateGame = () => {
    if (!playerName.trim()) {
      setError("Please enter your name");
      return;
    }
    socket.emit("create_room", { playerName: playerName.trim() });
    socket.once("room_created", ({ roomId }) => {
      onGameStart(roomId);
    });
  };

  const handleJoinGame = (roomId) => {
    if (!playerName.trim()) {
      setError("Please enter your name");
      return;
    }
    console.log("Attempting to join room:", roomId);
    socket.emit("join_room", { roomId, playerName: playerName.trim() });

    // Listen for room update to confirm successful join
    socket.once("room_update", (data) => {
      console.log("Successfully joined room:", data);
      onGameStart(roomId);
    });

    // Listen for any errors during join
    socket.once("error_message", (msg) => {
      console.error("Error joining room:", msg);
      setError(msg);
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-gray-800 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">Ludo Game Lobby</h1>

      {isConnecting && (
        <div className="text-yellow-500 mb-4">Connecting to server...</div>
      )}

      {!isConnected && !isConnecting && (
        <div className="text-red-500 mb-4">
          {error || "Failed to connect to server"}
        </div>
      )}

      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full px-4 py-2 rounded text-black mb-4"
          disabled={!isConnected}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex flex-col gap-4">
          {isConnected && availableGames.length > 0 ? (
            <>
              <h2 className="text-xl text-white mb-2">Available Games:</h2>
              <div className="space-y-3">
                {availableGames.map((game) => (
                  <div
                    key={game.roomId}
                    className="flex items-center justify-between bg-gray-700 p-4 rounded"
                  >
                    <div className="text-white">
                      <p>Host: {game.hostName}</p>
                      <p className="text-sm text-gray-300">
                        Players: {game.playerCount}/4
                      </p>
                    </div>
                    <button
                      onClick={() => handleJoinGame(game.roomId)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Join Game
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : isConnected ? (
            <div className="text-center text-gray-300 mb-4">
              No available games. Create one to start playing!
            </div>
          ) : null}

          <button
            onClick={handleCreateGame}
            disabled={!isConnected}
            className={`w-full px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors ${
              !isConnected ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Create New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
