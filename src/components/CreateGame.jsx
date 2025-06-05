// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import socket from "../socket";

// const CreateGame = ({ open, onClose, onCreate }) => {
//   const [stake, setStake] = useState("");
//   const [kingsToWin, setKingsToWin] = useState("");
//   const [playerName, setPlayerName] = useState("");
//   const [error, setError] = useState("");

//   const handleSetPlayerName = (e) => {
//     setPlayerName(e.target.value);
//     if (e.target.value.trim() === "") {
//       setError("Please enter your name");
//     } else {
//       setError("");
//     }
//   };

//   const handleCreate = () => {
//     if (!stake || !kingsToWin) return;

//     // Pass the game data to parent
//     onCreate({
//       stake: Number(stake),
//       kingsToWin: Number(kingsToWin),
//     });

//     // Reset form and close
//     setStake("");
//     setKingsToWin("");
//     onClose();
//   };

//   const handleCancel = () => {
//     setStake("");
//     setKingsToWin("");
//     onClose();
//   };

//   const handleCreateGame = () => {
//     if (!playerName.trim()) {
//       setError("Please enter your name");
//       return;
//     }
//     console.log("Creating room with name:", playerName.trim());
//     socket.emit("create_room", { playerName: playerName.trim() });

//     // Listen for room creation response
//     socket.once("room_created", ({ roomId }) => {
//       console.log("Room created successfully:", roomId);
//       onGameStart(roomId);
//     });
//   };

//   return (
//     <Dialog open={open} onClose={handleCancel}>
//       <DialogTitle>Create New Game</DialogTitle>
//       <DialogContent className="flex flex-col gap-4 mt-2 min-w-[300px]">
//         <TextField
//           label="Player Name"
//           fullWidth
//           value={playerName}
//           onChange={handleSetPlayerName}
//           error={!!error}
//           helperText={error}
//         />
//         <TextField
//           label="Stake"
//           type="number"
//           fullWidth
//           value={stake}
//           onChange={(e) => setStake(e.target.value)}
//         />
//         <TextField
//           label="Winner after how many kings?"
//           type="number"
//           fullWidth
//           value={kingsToWin}
//           onChange={(e) => setKingsToWin(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCancel} color="secondary">
//           Cancel
//         </Button>
//         <Button
//           onClick={handleCreate}
//           variant="contained"
//           color="primary"
//           disabled={!stake || !kingsToWin}
//         >
//           Create
//         </Button>
//         <button
//           onClick={handleCreateGame}
//           disabled={!isConnected}
//           className={`px-4 py-1 bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white rounded-full hover:from-green-500 hover:to-green-700 transition-colors ${
//             !isConnected ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           New +
//         </button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CreateGame;
