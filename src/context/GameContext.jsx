import React, { createContext, useContext, useState, useEffect } from "react";
import socket from "../socket";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [lastRoll, setLastRoll] = useState(null);
  const [error, setError] = useState(null);
  const [gameSettings, setGameSettings] = useState({
    stake: 0,
    requiredPieces: 4,
  });
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

  useEffect(() => {
    socket.on("room_update", (data) => {
      console.log("Room update received:", data); // Debug log
      setPlayers(data.players);
      setCurrentTurn(data.currentTurn);
      setGameStatus(data.gameStatus);
      if (data.gameSettings) {
        console.log("Updating game settings:", data.gameSettings); // Debug log
        setGameSettings(data.gameSettings);
      }
    });

    socket.on("room_created", (data) => {
      console.log("Room created datas received:", data);
    });

    return () => {
      socket.off("room_update");
    };
  }, []);

  const contextValue = {
    value: diceValue,
    setValue: setDiceValue,
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
    gameSettings,
    isConnected,
    setIsConnected,
    rollDice,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
