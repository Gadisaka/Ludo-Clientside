// src/hooks/useSocketEvents.js
import { useEffect } from "react";
import socket from "../socket";
import { useGame } from "../context/GameContext";

const useSocketEvents = (roomId) => {
  const {
    setPlayers,
    setCurrentTurn,
    setGameStatus,
    setLastRoll,
    setValue,
    setIsRolling,
    setError,
    setIsConnected,
  } = useGame();

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

    // Listen for initial game state
    socket.on("initial_game_state", (gameState) => {
      console.log("Initial game state received in useSocketEvents:", gameState);
    });

    // listed for while the die is rolling
    socket.on("rolling_dice", () => {
      setIsRolling(true);
      setError("");
    });

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
      socket.off("initial_game_state");
      socket.off("roll_dice");
      socket.off("error_message");
    };
  }, [roomId]);
};

export default useSocketEvents;
