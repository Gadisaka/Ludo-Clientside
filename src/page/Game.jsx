import React, { useState, useEffect } from "react";
import PlayingPage from "../components/PlayingPage";
import GameLobby from "../components/GameLobby";

const Game = () => {
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    // Check if we've already reloaded
    const hasReloaded = localStorage.getItem("gamePageReloaded");

    if (!hasReloaded) {
      // Set the flag before reloading
      localStorage.setItem("gamePageReloaded", "true");
      window.location.reload();
    } else {
      // Clear the flag for next time
    }
  }, []); // Empty dependency array means this runs once when component mounts

  const handleGameStart = (roomId) => {
    setCurrentRoom(roomId);
  };

  const handleLeaveGame = () => {
    setCurrentRoom(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {currentRoom ? (
        <PlayingPage roomId={currentRoom} onLeaveGame={handleLeaveGame} />
      ) : (
        <div className="w-full h-full py-6 px-4">
          <GameLobby onGameStart={handleGameStart} />
        </div>
      )}
    </div>
  );
};

export default Game;
