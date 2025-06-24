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

    // Listen for game status changes
    socket.on("game_status_changed", ({ status, message }) => {
      setGameStatus(status);
      setError(message);
      // Clear the message after 5 seconds
      setTimeout(() => setError(""), 5000);
    });

    // Listen for player disconnection
    socket.on("player_disconnected", ({ playerName, timeout }) => {
      setError(
        `${playerName} has disconnected. They have ${timeout} seconds to reconnect.`
      );
    });

    // Listen for player reconnection
    socket.on("player_reconnected", ({ playerName }) => {
      setError(`${playerName} has reconnected!`);
      // Clear the error message after 3 seconds
      setTimeout(() => setError(""), 3000);
    });

    // Listen for auto-play (for disconnected player)
    socket.on("auto_play", ({ playerColor, value, moved, pieceIndex }) => {
      setIsRolling(false);
      setValue(value);
      setError(
        `Auto-play: ${playerColor} rolled ${value}${
          moved ? ` and moved piece ${pieceIndex}` : " but could not move"
        }`
      );
      setTimeout(() => setError(""), 2000);
    });

    // Listen for player lost due to disconnect
    socket.on("player_lost_due_to_disconnect", ({ playerColor }) => {
      setError(`Player (${playerColor}) lost due to disconnect.`);
      setTimeout(() => setError(""), 4000);
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
      socket.off("roll_dice");
      socket.off("error_message");
      socket.off("player_disconnected");
      socket.off("player_reconnected");
      socket.off("game_status_changed");
      socket.off("auto_play");
      socket.off("player_lost_due_to_disconnect");
      socket.off("rolling_dice");
    };
  }, [roomId]);
};

export default useSocketEvents;
