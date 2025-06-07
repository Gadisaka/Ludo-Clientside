import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [value, setValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [lastRoll, setLastRoll] = useState(null);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const rollDice = (roomId, socket) => {
    if (!roomId) return setError("You must be in a room to roll!");
    if (isRolling) return;
    if (socket.id !== currentTurn) return setError("Not your turn!");
    if (gameStatus !== "playing") return setError("Game hasn't started yet!");

    setIsRolling(true);
    setError("");
    socket.emit("roll_dice", { roomId });
  };

  return (
    <GameContext.Provider
      value={{
        value,
        setValue,
        isRolling,
        setIsRolling,
        players,
        setPlayers,
        currentTurn,
        setCurrentTurn,
        gameStatus,
        setGameStatus,
        lastRoll,
        setLastRoll,
        error,
        setError,
        isConnected,
        setIsConnected,
        rollDice,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
