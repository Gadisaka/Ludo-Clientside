// import React, { useState } from "react";
// import socket from "../socket";

// const GameSetup = ({ roomId, onStartGame }) => {
//   const [winCondition, setWinCondition] = useState(1);

//   const handleStartGame = () => {
//     socket.emit("start_game", { roomId, winCondition });
//     onStartGame();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
//       <h2 className="text-2xl mb-4">Game Setup</h2>
//       <p className="mb-4">Choose how many pieces must reach home to win:</p>
//       <select
//         value={winCondition}
//         onChange={(e) => setWinCondition(Number(e.target.value))}
//         className="p-2 bg-gray-700 rounded mb-4"
//       >
//         {[1, 2, 3, 4].map((num) => (
//           <option key={num} value={num}>
//             {num} Piece{num > 1 ? "s" : ""}
//           </option>
//         ))}
//       </select>
//       <button
//         onClick={handleStartGame}
//         className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
//       >
//         Start Game
//       </button>
//     </div>
//   );
// };

// export default GameSetup;
