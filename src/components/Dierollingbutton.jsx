import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import {
  dieone,
  dietwo,
  diethree,
  diefour,
  diefive,
  diesix,
} from "../components/Dies";
import socket from "../socket";

const dieMap = {
  1: dieone,
  2: dietwo,
  3: diethree,
  4: diefour,
  5: diefive,
  6: diesix,
};

const DieRollButton = ({ roomId, onLeaveGame }) => {
  const [value, setValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [lastRoll, setLastRoll] = useState(null);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("DieRollButton mounted with roomId:", roomId);

    socket.on("connect", () => {
      console.log("Connected to server in DieRollButton");
      setIsConnected(true);
      setError("");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server in DieRollButton");
      setIsConnected(false);
      setError("Disconnected from server. Trying to reconnect...");
    });

    socket.on(
      "room_update",
      ({ players, currentTurn, gameStatus, lastRoll }) => {
        console.log("Room update received:", {
          players,
          currentTurn,
          gameStatus,
          lastRoll,
        });
        setPlayers(players);
        setCurrentTurn(currentTurn);
        setGameStatus(gameStatus);
        setLastRoll(lastRoll);
        setIsRolling(false);
        setError("");
      }
    );

    socket.on("roll_dice", ({ value }) => {
      console.log("Dice roll received:", value);
      setValue(value);
      setIsRolling(false);
      setError("");
    });

    socket.on("error_message", (msg) => {
      console.error("Error message received:", msg);
      setError(msg);
      setIsRolling(false);
    });

    return () => {
      console.log("DieRollButton unmounting");
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

    console.log("Rolling dice in room:", roomId);
    setIsRolling(true);
    setError("");
    socket.emit("roll_dice", { roomId });
  };

  const getPlayerName = (playerId) => {
    const player = players.find((p) => p.id === playerId);
    return player ? player.name : "Unknown";
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white">
      {!isConnected && (
        <div className="text-red-500 mb-4">
          {error || "Connecting to server..."}
        </div>
      )}

      <div className="flex justify-between w-full max-w-md mb-4">
        <button
          onClick={onLeaveGame}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Leave Game
        </button>
        <p className="text-sm text-gray-300">
          Room ID: <b>{roomId}</b>
        </p>
      </div>

      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Players:</h2>
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-2 rounded ${
                  player.id === currentTurn
                    ? "bg-blue-500/20"
                    : "bg-gray-700/50"
                }`}
              >
                <span>{player.name}</span>
                {player.id === currentTurn && <span>🎲</span>}
              </div>
            ))}
          </div>
        </div>

        {lastRoll && (
          <div className="mb-4 p-3 bg-gray-700/50 rounded">
            <p className="text-center">
              Last roll: {getPlayerName(lastRoll.roller)} rolled a{" "}
              {lastRoll.value}
            </p>
          </div>
        )}

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <button
          onClick={handleSocketRoll}
          disabled={
            isRolling || socket.id !== currentTurn || gameStatus !== "playing"
          }
          className={`w-24 h-24 mx-auto p-1 bg-gray-300/30 backdrop-blur-md border border-white/20 rounded-lg text-4xl font-bold text-black flex items-center justify-center shadow-lg transition-transform duration-300 ease-in-out ${
            isRolling ? "animate-spin" : ""
          } ${
            socket.id !== currentTurn || gameStatus !== "playing"
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300/40"
          }`}
        >
          <div className="flex justify-center items-center w-full h-full">
            {dieMap[value]}
          </div>
        </button>
      </div>
    </div>
  );
};

export default DieRollButton;
