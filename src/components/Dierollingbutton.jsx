import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import {
  dieone,
  dietwo,
  diethree,
  diefour,
  diefive,
  diesix,
} from "../components/Dies";
import io from "socket.io-client";

const getRandomDie = () => Math.floor(Math.random() * 6) + 1;

const dieMap = {
  1: dieone,
  2: dietwo,
  3: diethree,
  4: diefour,
  5: diefive,
  6: diesix,
};

const socket = io("http://localhost:4000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const DieRollButton = () => {
  const [value, setValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(null);

  useEffect(() => {
    socket.on("room_created", ({ roomId }) => {
      setRoomId(roomId);
      alert(`Room created! Share this ID with your friend: ${roomId}`);
    });

    socket.on("room_update", ({ players, currentTurn }) => {
      setPlayers(players);
      setCurrentTurn(currentTurn);
      setIsRolling(false);
    });

    socket.on("roll_dice", ({ value }) => {
      setValue(value);
      setIsRolling(false);
    });

    socket.on("error_message", (msg) => alert(msg));

    return () => {
      socket.off("room_created");
      socket.off("room_update");
      socket.off("roll_dice");
      socket.off("error_message");
    };
  }, []);

  const handleSocketRoll = () => {
    if (!roomId) return alert("You must be in a room to roll!");
    if (isRolling) return;
    if (socket.id !== currentTurn) return alert("Not your turn!");

    setIsRolling(true);

    setTimeout(() => {
      const newValue = getRandomDie();
      setValue(newValue);
      socket.emit("roll_dice", { roomId, value: newValue });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white">
      {!roomId ? (
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-green-500 rounded text-white"
            onClick={() => socket.emit("create_room")}
          >
            Create Game
          </button>
          <button
            className="px-4 py-2 bg-blue-500 rounded text-white"
            onClick={() => socket.emit("join_room")}
          >
            Join Game
          </button>
        </div>
      ) : (
        <>
          <p>
            Room ID: <b>{roomId}</b>
          </p>
          <p>Players: {players.join(", ")}</p>
          <p>
            {currentTurn === socket.id
              ? "🎲 Your turn!"
              : "⏳ Waiting for opponent..."}
          </p>
          <button
            onClick={handleSocketRoll}
            disabled={isRolling || socket.id !== currentTurn}
            className={`w-24 h-24 p-1 bg-gray-300/30 backdrop-blur-md border border-white/20 rounded-lg text-4xl font-bold text-black flex items-center justify-center shadow-lg transition-transform duration-300 ease-in-out ${
              isRolling ? "animate-spin" : ""
            }`}
          >
            <div className="flex justify-center items-center w-full h-full">
              {dieMap[value]}
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default DieRollButton;
