import React, { useEffect } from "react";
import GameLobby from "../components/GameLobby";

const Game = () => {
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

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="w-full h-full py-6 px-4">
        <GameLobby />
      </div>
    </div>
  );
};

export default Game;
