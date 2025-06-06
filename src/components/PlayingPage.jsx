import React, { useState, useEffect } from "react";
import DieRollingPage from "./Dierollingbutton";
import LudoBoard from "./Ludoboard";
import socket from "../socket";

const PlayingPage = ({ roomId, onLeaveGame }) => {
  const [value, setValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [lastRoll, setLastRoll] = useState(null);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      setError("");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setError("Disconnected from server. Trying to reconnect...");
    });

    socket.on(
      "room_update",
      ({ players, currentTurn, gameStatus, lastRoll }) => {
        setPlayers(players);
        setCurrentTurn(currentTurn);
        setGameStatus(gameStatus);
        setLastRoll(lastRoll);
        setIsRolling(false);
        setError("");
      }
    );

    socket.on("roll_dice", ({ value }) => {
      setValue(value);
      setIsRolling(false);
      setError("");
    });

    socket.on("error_message", (msg) => {
      setError(msg);
      setIsRolling(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room_update");
      socket.off("roll_dice");
      socket.off("error_message");
    };
  }, [roomId]);

  const handleSocketRoll = () => {
    if (!roomId) {
      setError("You must be in a room to roll!");
      return;
    }
    if (isRolling) return;
    if (socket.id !== currentTurn) {
      setError("Not your turn!");
      return;
    }
    if (gameStatus !== "playing") {
      setError("Game hasn't started yet!");
      return;
    }

    setIsRolling(true);
    setError("");
    socket.emit("roll_dice", { roomId });
    console.log(isConnected);
  };

  return (
    <div className="text-white flex flex-col w-full items-center justify-center">
      <div className="w-full max-w-4xl flex justify-between items-center px-4">
        <button
          onClick={onLeaveGame}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          Leave Game
        </button>
        <p className="text-sm text-gray-300">
          Room ID: <b>{roomId}</b>
        </p>
      </div>

      {/* Display players and last roll info */}
      <div className="w-full max-w-xl  p-4 rounded-lg">
        {lastRoll && (
          <div className="   rounded text-center">
            <p>
              Last roll:{" "}
              {players.find((p) => p.id === lastRoll.roller)?.name || "Unknown"}{" "}
              rolled a {lastRoll.value}
            </p>
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      {/* Die and Board */}
      <LudoBoard />
      <DieRollingPage
        value={value}
        isRolling={isRolling}
        isMyTurn={socket.id === currentTurn}
        gameStatus={gameStatus}
        onRoll={handleSocketRoll}
      />
      <div className="flex w-full    justify-between items-center mb-4">
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex items-center  justify-center py-2 w-[100px] h-fit rounded ${
              player.id === currentTurn ? "bg-blue-500/20" : "bg-gray-700/50"
            }`}
          >
            {player.id === currentTurn && <span>🎲</span>}
            <span
              className={`text-white text-2xl font-bold ${
                player.id === currentTurn ? "text-yellow-500" : ""
              }`}
            >
              {player.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayingPage;
