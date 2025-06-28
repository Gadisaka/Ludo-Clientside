import React, { createContext, useContext, useState, useEffect } from "react";
import socket from "../socket";
import useUserStore from "../store/zutstand";

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
    stake: 50,
    requiredPieces: 2,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const username = useUserStore((state) => state.username);

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
    const handleConnect = () => {
      setIsConnected(true);
      // If we have a room ID and username, try to reconnect
      if (currentRoomId && username) {
        socket.emit("reconnect_to_room", {
          roomId: currentRoomId,
          playerName: username,
        });
      }
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [currentRoomId, username]);

  useEffect(() => {
    socket.on("room_update", (data) => {
      console.log("Room update received:", data);
      setPlayers(data.players);
      setCurrentTurn(data.currentTurn);
      setGameStatus(data.gameStatus);
      if (data.gameSettings) {
        console.log("Updating game settings:", data.gameSettings);
        setGameSettings(data.gameSettings);
      }
    });

    socket.on("room_created", (data) => {
      console.log("Room created data received:", data);
      setCurrentRoomId(data.roomId);
      setGameSettings(data.gameSettings);
    });

    socket.on("player_reconnected", (data) => {
      console.log(`${data.playerName} has reconnected`);
    });

    return () => {
      socket.off("room_update");
      socket.off("room_created");
      socket.off("player_reconnected");
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
    currentRoomId,
    setCurrentRoomId,
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
