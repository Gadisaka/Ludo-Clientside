import React, { useState } from "react";
import PlayingPage from "../components/PlayingPage";
import GameLobby from "../components/GameLobby";

const Game = () => {
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleGameStart = (roomId) => {
    setCurrentRoom(roomId);
  };

  const handleLeaveGame = () => {
    setCurrentRoom(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      {currentRoom ? (
        <PlayingPage roomId={currentRoom} onLeaveGame={handleLeaveGame} />
      ) : (
        <GameLobby onGameStart={handleGameStart} />
      )}
    </div>
  );
};

export default Game;
