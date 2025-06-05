import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("https://ludo-serverside.onrender.com/", {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: true,
  transports: ["websocket", "polling"],
  forceNew: true,
});

function Game() {
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      setError(null);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setError("Failed to connect to server. Please try again.");
    });

    socket.on("gameState", (state) => {
      console.log("Received game state:", state);
      setGameState(state);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("gameState");
    };
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!gameState) {
    return <div>Loading game...</div>;
  }

  return (
    <div className="game-container">
      <h1>Ludo Game</h1>
      {/* Add your game UI here */}
    </div>
  );
}

export default Game;
