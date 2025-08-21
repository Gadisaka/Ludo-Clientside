import React, { useState, useEffect, useRef } from "react";
import DieRollingPage from "./Dierollingbutton";
import LudoBoard from "./Ludoboard";
import socket from "../socket";
import { useGame } from "../context/GameContext";
import useSocketEvents from "../hooks/useSocketEvents";
import bg from "../assets/Picsart_25-06-24_16-26-17-659.jpg";
import { crown } from "./Dies";
import coin from "../assets/coin.png";
import { Navigate, useParams } from "react-router-dom";
// import useUserStore from "../store/zutstand";

const PlayingPage = () => {
  const { gameID: roomId } = useParams();
  const [leave, setLeave] = useState(false);
  // Timer state
  const [waitingTime, setWaitingTime] = useState(0);
  const timerRef = useRef(null);

  const {
    value,
    isRolling,
    players,
    currentTurn,
    gameStatus,
    lastRoll,
    rollDice,
    gameSettings,
    isLoadingGameSettings,
  } = useGame();

  // Debug: Log current game settings
  useEffect(() => {
    console.log(
      "PlayingPage - Current gameSettings from context:",
      gameSettings
    );
    console.log("PlayingPage - isLoadingGameSettings:", isLoadingGameSettings);
  }, [gameSettings, isLoadingGameSettings]);

  // Simple hook for socket events
  useSocketEvents(roomId);

  // Note: Game settings are now managed entirely through the GameContext

  // Fetch latest game data when component mounts
  useEffect(() => {
    if (roomId) {
      // Emit socket event to get fresh game data
      socket.emit("getGameData", { gameId: roomId });
      console.log("Requesting fresh game data for room:", roomId);
    }
  }, [roomId]);

  // Timer effect: start when waiting, stop/reset otherwise
  useEffect(() => {
    if (gameStatus === "waiting" && players.length === 1) {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setWaitingTime((prev) => prev + 1);
        }, 1000);
      }
    } else {
      setWaitingTime(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameStatus, players.length]);

  function formatTime(seconds) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function onLeaveGame() {
    setLeave(true);
  }

  if (leave) {
    return <Navigate to="/game" />;
  }

  // const [displayName, setDisplayName] = useState("");
  // {error && <p className="text-red-500 text-center">{error}</p>}

  return (
    <div className="text-white relative flex flex-col w-full h-screen justify- items-center py-8 px-4">
      <img
        src={bg}
        alt="bg"
        className="absolute top-0 left-0 min-h-screen w-full object-cover "
      />
      <div className="w-full  flex flex-col items-center px-4 space-y-2 z-100 ">
        {/* Show waiting message if game is waiting and only one player */}
        {gameStatus === "waiting" && players.length === 1 && (
          <div className="w-full absolute top-1/3 flex flex-col justify-center items-center py-4 z-100">
            <span className="text-yellow-400 text-lg font-semibold bg-gray-900/80 px-6 py-2 rounded-lg shadow-lg border border-yellow-500/30 flex flex-col items-center">
              waiting for opponent to join...
              <span className="text-xs text-gray-300 mt-1">
                Waiting time: {formatTime(waitingTime)}
              </span>
            </span>
          </div>
        )}
        {/* <div className="w-full flex justify-between items-center">
          <button
            onClick={onLeaveGame}
            className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-100"
          >
            Leave Game
          </button>
          <p className="text-sm text-gray-300 z-100">
            Room ID: <b>{roomId}</b>
          </p>
        </div> */}

        {/* Game Settings Display */}
        <div className="w-full h-[50px] flex justify-center items-center gap-1 z-100">
          <button
            className=" rounded-full p-1 cursor-pointer "
            onClick={() => onLeaveGame()}
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180 bg-red-500 rounded-full"
            >
              <path
                d="M16.5 15V19.5H5.5V5.5H16.5V10M10 12.5H22.5"
                stroke="#121923"
                stroke-width="1.2"
              />
              <path
                d="M20 10L22.5 12.5L20 15"
                stroke="#121923"
                stroke-width="1.2"
              />
            </svg>
          </button>

          {/* Refresh Game Settings Button */}
          <button
            className="rounded-full p-1 cursor-pointer transition-colors bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              socket.emit("getGameData", { gameId: roomId });
              console.log("Manual refresh requested for room:", roomId);
            }}
            title="Refresh game settings"
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582M20 20v-5h-.581M19.418 9A7.978 7.978 0 0012 4c-3.042 0-5.824 1.721-7.418 4M4.582 15A7.978 7.978 0 0012 20c3.042 0 5.824-1.721 7.418-4"
              />
            </svg>
          </button>

          <div className="flex justify-between items-center px-5 text-xl font-bold text-gray-300 z-100 w-[80%] h-[50px] bg-gray-800/30 border rounded-lg border-white/20  backdrop-blur-md  ">
            <p className="flex gap-2 justify-center items-center">
              Stake:{" "}
              <b>
                {isLoadingGameSettings ? "..." : gameSettings?.stake || "..."}
              </b>{" "}
              <img src={coin} alt="coin" className="w-6 h-6" />
            </p>
            <p className="flex gap-1 justify-center items-center">
              <b>
                {isLoadingGameSettings
                  ? "..."
                  : gameSettings?.requiredPieces || "..."}
              </b>{" "}
              King
              {isLoadingGameSettings
                ? ""
                : gameSettings?.requiredPieces > 1
                ? "s"
                : ""}{" "}
              {crown}
            </p>
          </div>
        </div>
        <div className="w-[90%] h-[50px] bg-white text-black z-100 flex justify-center items-center">
          {" "}
          ad will be displayed here
        </div>
        <div className="w-full max-w-xl rounded-lg z-100">
          {lastRoll && (
            <div className="text-center">
              <p>
                @
                {players.find((p) => p.id === lastRoll.roller)?.name ||
                  "Unknown"}{" "}
                rolled a {lastRoll.value}
              </p>
            </div>
          )}
        </div>
      </div>
      <LudoBoard roomId={roomId} />

      <div className="flex w-full justify-center items-center z-100 gap-2 ">
        {/* First player (left) */}
        {players[0] && (
          <div
            key={players[0].id}
            className={`flex items-center justify-center py-2 w-[100px] h-fit rounded ${
              players[0].id === currentTurn
                ? "bg-blue-500/20"
                : "bg-gray-700/50"
            }`}
          >
            {players[0].id === currentTurn && <span>🎲</span>}
            <span
              className={`text-white text-xl font-bold ${
                players[0].id === currentTurn ? "text-yellow-500" : ""
              }`}
            >
              @{players[0].name}
            </span>
          </div>
        )}

        {/* DieRollingPage (center) */}
        <DieRollingPage
          value={value}
          isRolling={isRolling}
          isMyTurn={socket.id === currentTurn}
          gameStatus={gameStatus}
          onRoll={() => rollDice(roomId, socket)}
          players={players}
          currentTurn={currentTurn}
        />

        {/* Second player (right) */}
        {players[1] && (
          <div
            key={players[1].id}
            className={`flex items-center justify-center py-2 w-[100px] h-fit rounded ${
              players[1].id === currentTurn
                ? "bg-blue-500/20"
                : "bg-gray-700/50"
            }`}
          >
            {players[1].id === currentTurn && <span>🎲</span>}
            <span
              className={`text-white text-xl font-bold ${
                players[1].id === currentTurn ? "text-yellow-500" : ""
              }`}
            >
              @{players[1].name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayingPage;
