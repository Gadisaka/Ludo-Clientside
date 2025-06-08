import React from "react";
import DieRollingPage from "./Dierollingbutton";
import LudoBoard from "./Ludoboard";
import socket from "../socket";
import { useGame } from "../context/GameContext";
import useSocketEvents from "../hooks/useSocketEvents";
import useUserStore from "../store/zutstand";

const PlayingPage = ({ roomId, onLeaveGame }) => {
  const {
    value,
    isRolling,
    players,
    currentTurn,
    gameStatus,
    lastRoll,
    error,
    rollDice,
  } = useGame();

  useSocketEvents(roomId);

  // const [displayName, setDisplayName] = useState("");

  return (
    <div className="text-white flex flex-col w-full h-screen items-center">
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

      <div className="w-full max-w-xl   rounded-lg">
        {lastRoll && (
          <div className="text-center">
            <p>
              Last roll:{" "}
              {players.find((p) => p.id === lastRoll.roller)?.name || "Unknown"}{" "}
              rolled a {lastRoll.value}
            </p>
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      <LudoBoard roomId={roomId} />
      <DieRollingPage
        value={value}
        isRolling={isRolling}
        isMyTurn={socket.id === currentTurn}
        gameStatus={gameStatus}
        onRoll={() => rollDice(roomId, socket)}
      />

      <div className="flex w-full justify-between items-center mb-4">
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex items-center justify-center py-2 w-[100px] h-fit rounded ${
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
