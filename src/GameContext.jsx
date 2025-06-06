// import React, { createContext, useReducer, useEffect } from "react";
// import socket from "./socket";

// const pathArray = [
//   "r1",
//   "r2",
//   "r3",
//   "r4",
//   "r5",
//   "r6",
//   "r7",
//   "r8",
//   "r9",
//   "r10",
//   "r11",
//   "r12",
//   "r13",
//   "g1",
//   "g2",
//   "g3",
//   "g4",
//   "g5",
//   "g6",
//   "g7",
//   "g8",
//   "g9",
//   "g10",
//   "g11",
//   "g12",
//   "g13",
//   "y1",
//   "y2",
//   "y3",
//   "y4",
//   "y5",
//   "y6",
//   "y7",
//   "y8",
//   "y9",
//   "y10",
//   "y11",
//   "y12",
//   "y13",
//   "b1",
//   "b2",
//   "b3",
//   "b4",
//   "b5",
//   "b6",
//   "b7",
//   "b8",
//   "b9",
//   "b10",
//   "b11",
//   "b12",
//   "b13",
// ];

// const homePathEntries = {
//   blue: ["bh1", "bh2", "bh3", "bh4", "bh5", "home"],
//   green: ["gh1", "gh2", "gh3", "gh4", "gh5", "home"],
// };

// const safePaths = [
//   "r1",
//   "r9",
//   "b1",
//   "b9",
//   "y1",
//   "y9",
//   "g1",
//   "g9",
//   ...homePathEntries.blue,
//   ...homePathEntries.green,
// ];

// const initialState = {
//   players: [],
//   currentTurn: null,
//   gameStatus: "waiting",
//   lastRoll: null,
//   diceValue: 1,
//   isRolling: false,
//   pieces: [],
//   currentPlayerTurnIndex: 0,
//   currentPlayerTurnStatus: true,
//   teamHasBonus: false,
//   winCondition: 1,
//   roomId: null,
// };

// const gameReducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_GAME":
//       return { ...state, ...action.payload };
//     case "SET_DICE":
//       return { ...state, diceValue: action.payload, isRolling: false };
//     case "MOVE_PIECE":
//       const piece = action.payload;
//       const currentTeam = state.players.find(
//         (p) => p.id === state.currentTurn
//       )?.team;
//       if (
//         !currentTeam ||
//         piece.team !== currentTeam ||
//         !state.currentPlayerTurnStatus
//       )
//         return state;

//       const totalUnlocked = state.pieces.filter(
//         (p) => p.team === currentTeam && p.status === 1
//       ).length;
//       if (totalUnlocked === 0 && state.diceValue !== 6) {
//         socket.emit("next_turn", { roomId: state.roomId });
//         return { ...state, currentPlayerTurnStatus: true };
//       }

//       let newPieces = [...state.pieces];
//       const pieceIndex = newPieces.findIndex(
//         (p) => p.playerId === piece.playerId
//       );
//       let movingArray = [];

//       if (state.diceValue === 6 && piece.status === 0) {
//         newPieces[pieceIndex] = {
//           ...piece,
//           status: 1,
//           position: piece.gameEntry,
//         };
//         socket.emit("update_pieces", {
//           roomId: state.roomId,
//           pieces: newPieces,
//         });
//         return { ...state, pieces: newPieces, currentPlayerTurnStatus: true };
//       }

//       if (piece.status === 0) return state;

//       if (pathArray.includes(piece.position)) {
//         const indexOfPath = pathArray.findIndex(
//           (elem) => elem === piece.position
//         );
//         for (let i = 0; i < state.diceValue; i++) {
//           const nextIndex = (indexOfPath + i + 1) % pathArray.length;
//           movingArray.push(pathArray[nextIndex]);
//           if (pathArray[nextIndex] === homePathEntries[piece.team][0]) break;
//         }
//       } else if (homePathEntries[piece.team].includes(piece.position)) {
//         const indexOfPath = homePathEntries[piece.team].findIndex(
//           (elem) => elem === piece.position
//         );
//         for (let i = 0; i < state.diceValue; i++) {
//           if (indexOfPath + i + 1 < homePathEntries[piece.team].length) {
//             movingArray.push(homePathEntries[piece.team][indexOfPath + i + 1]);
//           }
//         }
//       }

//       if (movingArray.length < state.diceValue) return state;

//       const finalPosition = movingArray[movingArray.length - 1];
//       newPieces[pieceIndex] = {
//         ...piece,
//         position: finalPosition,
//         score: piece.score + movingArray.length,
//       };

//       const opponentPiece = newPieces.find(
//         (p) =>
//           p.team !== piece.team &&
//           p.status === 1 &&
//           p.position === finalPosition &&
//           !safePaths.includes(finalPosition)
//       );
//       if (opponentPiece) {
//         const oppIndex = newPieces.findIndex(
//           (p) => p.playerId === opponentPiece.playerId
//         );
//         newPieces[oppIndex] = {
//           ...opponentPiece,
//           position: opponentPiece.initialPosition,
//           score: 0,
//           status: 0,
//         };
//         socket.emit("update_pieces", {
//           roomId: state.roomId,
//           pieces: newPieces,
//         });
//         return {
//           ...state,
//           pieces: newPieces,
//           currentPlayerTurnStatus: true,
//           teamHasBonus: true,
//         };
//       }

//       if (finalPosition === "home") {
//         newPieces = newPieces.filter((p) => p.playerId !== piece.playerId);
//         const piecesHome =
//           newPieces.filter(
//             (p) => p.team === piece.team && p.position === "home"
//           ).length + 1;
//         if (piecesHome >= state.winCondition) {
//           socket.emit("game_won", { roomId: state.roomId, winner: piece.team });
//         }
//       }

//       socket.emit("update_pieces", { roomId: state.roomId, pieces: newPieces });
//       socket.emit("next_turn", { roomId: state.roomId });
//       return {
//         ...state,
//         pieces: newPieces,
//         currentPlayerTurnStatus: state.diceValue === 6 || state.teamHasBonus,
//       };
//     case "SET_ROOM_ID":
//       return { ...state, roomId: action.payload };
//     default:
//       return state;
//   }
// };

// export const GameContext = createContext();

// export const GameProvider = ({ children, roomId }) => {
//   const [state, dispatch] = useReducer(gameReducer, {
//     ...initialState,
//     roomId,
//   });

//   useEffect(() => {
//     const boardDetails = [
//       { boardColor: "blue", homeEntry: "y13", gameEntry: "b1" },
//       { boardColor: "green", homeEntry: "r13", gameEntry: "g1" },
//     ];

//     const pieces = [];
//     boardDetails.forEach(({ boardColor, homeEntry, gameEntry }) => {
//       for (let i = 0; i < 4; i++) {
//         const pieceID = `${boardColor}${i}`;
//         const position = `${i}_${boardColor}`;
//         pieces.push({
//           team: boardColor,
//           position,
//           score: 0,
//           homePathEntry: homeEntry,
//           playerId: pieceID,
//           gameEntry,
//           status: 0,
//           initialPosition: position,
//         });
//       }
//     });
//     dispatch({ type: "UPDATE_GAME", payload: { pieces } });
//   }, []);

//   return (
//     <GameContext.Provider value={{ state, dispatch }}>
//       {children}
//     </GameContext.Provider>
//   );
// };
