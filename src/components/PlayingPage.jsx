import React from "react";
import DieRollingPage from "./Dierollingbutton";
import LudoBoard from "./Ludoboard";
import socket from "../socket";
import { useGame } from "../context/GameContext";
import useSocketEvents from "../hooks/useSocketEvents";
import bg from "../assets/Picsart_25-06-24_16-26-17-659.jpg";
import { crown } from "./Dies";
import coin from "../assets/coin.png";
// import useUserStore from "../store/zutstand";

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
    gameSettings,
  } = useGame();

  useSocketEvents(roomId);

  // const [displayName, setDisplayName] = useState("");

  return (
    <div className="text-white relative flex flex-col w-full h-screen items-center py-8 px-4">
      <img
        src={bg}
        alt="bg"
        className="absolute top-0 left-0 max-h-full w-full object-cover "
      />
      <div className="w-full max-w-4xl flex flex-col items-center px-4 space-y-2">
        <div className="w-full flex justify-between items-center">
          <button
            onClick={onLeaveGame}
            className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-100"
          >
            Leave Game
          </button>
          <p className="text-sm text-gray-300 z-100">
            Room ID: <b>{roomId}</b>
          </p>
        </div>

        {/* Game Settings Display */}
        <div className="flex justify-between items-center px-5 text-xl font-bold text-gray-300 z-100 w-[80%] h-[50px] bg-gray-800/30 border rounded-lg border-white/20  backdrop-blur-md  ">
          <p className="flex gap-2 justify-center items-center">
            Stake: <b>{gameSettings?.stake}</b>{" "}
            <img src={coin} alt="coin" className="w-6 h-6" />
          </p>
          <p className="flex gap-1 justify-center items-center">
            <b>{gameSettings?.requiredPieces}</b> Kings {crown}
          </p>
        </div>
      </div>

      <div className="w-full max-w-xl rounded-lg z-100">
        {lastRoll && (
          <div className="text-center">
            <p>
              @
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
        players={players}
        currentTurn={currentTurn}
      />

      <div className="flex w-full justify-between items-center mb-4 z-100 ">
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex items-center justify-center py-2 w-[100px] h-fit rounded ${
              player.id === currentTurn ? "bg-blue-500/20" : "bg-gray-700/50"
            }`}
          >
            {player.id === currentTurn && <span>🎲</span>}
            <span
              className={`text-white text-xl font-bold ${
                player.id === currentTurn ? "text-yellow-500" : ""
              }`}
            >
              @{player.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayingPage;
