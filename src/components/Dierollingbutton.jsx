import React from "react";
import {
  dieone,
  dietwo,
  diethree,
  diefour,
  diefive,
  diesix,
} from "../components/Dies";
import animation3d from "../assets/Animation - 1750682737621.gif";

const dieMap = {
  1: dieone,
  2: dietwo,
  3: diethree,
  4: diefour,
  5: diefive,
  6: diesix,
};

const DieRollingPage = ({
  value = 1,
  isRolling,
  isMyTurn,
  gameStatus,
  onRoll,
  players,
  currentTurn,
  currentTurnPlayerName, // Name of player whose turn it is
  waitingForMove = false, // NEW: Hide die when waiting for player to make a move
}) => {
  const isDisabled = isRolling || !isMyTurn || gameStatus !== "playing";
  const isGameActive = gameStatus === "playing";

  // Find current turn player info
  const currentPlayer = players?.find((player) => player.id === currentTurn);
  const displayTurnPlayerName =
    currentTurnPlayerName || currentPlayer?.name || "Unknown Player";

  // Find the opponent (the other player who is not the current user)

  // Determine what to show based on game state

  // Enhanced styling based on game state - Glass-like appearance
  const getContainerStyle = () => {
    if (!isGameActive) {
      return "bg-white/10 backdrop-blur-md border-white/20 shadow-lg";
    }
    if (isMyTurn && !waitingForMove) {
      return "bg-white/20 backdrop-blur-lg border-white/30 shadow-2xl ring-1 ring-white/20";
    }
    return "bg-white/5 backdrop-blur-sm border-white/10 shadow-md";
  };

  const getButtonStyle = () => {
    if (!isGameActive) {
      return "bg-white/30 backdrop-blur-sm text-gray-500 cursor-not-allowed border-white/20";
    }
    if (isMyTurn && !isRolling && !waitingForMove) {
      return "bg-white/40 backdrop-blur-md hover:bg-white/50 text-gray-800 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer border-white/30";
    }
    if (isRolling) {
      return "bg-white/50 backdrop-blur-md text-gray-800 animate-pulse border-white/40";
    }
    return "bg-white/20 backdrop-blur-sm text-gray-500 cursor-not-allowed border-white/20";
  };

  const getTurnIndicatorStyle = () => {
    if (isMyTurn) {
      return "text-white font-bold drop-shadow-lg";
    }
    return "text-gray-100 font-semibold drop-shadow-md";
  };

  return (
    <div className="w-full max-w-md mx-auto mt-3 ">
      {/* Glass Container - Wide Layout */}
      <div
        className={`flex items-center  justify-between p-3 rounded-xl border transition-all duration-300 ${getContainerStyle()}`}
      >
        {/* Player Info Section */}
        <div className="flex flex-col space-y-1 flex-1 ">
          <div className={`text-sm font-medium ${getTurnIndicatorStyle()}`}>
            {isMyTurn ? "Your Turn!" : `${displayTurnPlayerName}'s Turn`}
          </div>
          <div className="flex items-center space-x-2 text-xs text-white/80">
            <div
              className={`w-2 h-2 rounded-full ${
                isMyTurn ? "bg-green-400 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span>
              {!isGameActive
                ? "Game inactive"
                : waitingForMove && isMyTurn
                ? "Make your move"
                : isMyTurn
                ? "Ready to roll"
                : "Waiting for turn"}
            </span>
          </div>
        </div>

        {/* Dice Section */}
        <div className="flex items-center space-x-3 ">
          {/* Status/Value Display */}

          {/* Dice/Action Area */}
          <div className="flex-shrink-0">
            {isRolling ? (
              // Show rolling animation for ALL players when someone is rolling
              <div className="flex items-center justify-center w-16 h-16 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20">
                <img
                  src={animation3d}
                  alt="Rolling dice"
                  className="w-12 h-12 object-contain"
                />
              </div>
            ) : waitingForMove && isMyTurn ? (
              // Show "Make Move" state when player rolled and needs to move
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-xs text-white/80 font-medium text-center">
                  Make
                </div>
                <div className="text-xs text-white/80 font-medium text-center">
                  Move
                </div>
              </div>
            ) : (
              // Show dice button for current player when it's their turn
              <button
                onClick={onRoll}
                disabled={isDisabled || waitingForMove}
                className={`w-16 h-16 p-1 rounded-lg border transition-all duration-300 ease-in-out ${getButtonStyle()}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {dieMap[value]}
                  </div>
                </div>
              </button>
            )}
          </div>
          {!waitingForMove && (
            <div className="text-center">
              <div className="text-xs text-white/60 font-medium">Last Roll</div>
              <div className="text-lg font-bold text-white">{value}</div>
            </div>
          )}
        </div>

        {/* Player Names Section */}
        {/* <div className="flex flex-col space-y-1 text-right min-w-0 flex-1">
          <div className="text-xs text-white/60">Players</div>
          <div className="flex justify-end items-center space-x-2 text-xs">
            <span className="text-white/80 truncate">
              {playerName || "Player"}
            </span>
            <span className="text-white/40">vs</span>
            <span className="text-white/80 truncate">{opponentName}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DieRollingPage;
