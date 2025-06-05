import React, { useState } from "react";
import GameLobby from "./components/GameLobby";
import DieRollButton from "./components/Dierollingbutton";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
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
        <DieRollButton roomId={currentRoom} onLeaveGame={handleLeaveGame} />
      ) : (
        <GameLobby onGameStart={handleGameStart} />
      )}
    </div>
  );
};

export default App;
