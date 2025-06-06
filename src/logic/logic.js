// // importing all boards
// const blue_Board = document.getElementById("blue-Board");
// const red_Board = document.getElementById("red-Board");
// const green_Board = document.getElementById("green-Board");
// const yellow_Board = document.getElementById("yellow-Board");

// // initial variables

// let playerTurns = [];
// let currentPlayerTurnIndex = 0;
// let prevPlayerTurnIndex;
// let currentPlayerTurnStatus = true; //true - user hasn't played yet, false - user has played
// let teamHasBonus = false; // bonus when killed, reached home

// let diceResult;

// let pathArray = [
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

// let homePathEntries = {
//   blue: ["bh1", "bh2", "bh3", "bh4", "bh5", "home"],
//   yellow: ["yh1", "yh2", "yh3", "yh4", "yh5", "home"],
//   red: ["rh1", "rh2", "rh3", "rh4", "rh5", "home"],
//   green: ["gh1", "gh2", "gh3", "gh4", "gh5", "home"],
// };

// let safePaths = [
//   "r1",
//   "r9",
//   "b1",
//   "b9",
//   "y1",
//   "y9",
//   "g1",
//   "g9",
//   ...homePathEntries.blue,
//   ...homePathEntries.red,
//   ...homePathEntries.yellow,
//   ...homePathEntries.green,
// ];

// let homePathArray = [
//   ...homePathEntries.blue,
//   ...homePathEntries.red,
//   ...homePathEntries.yellow,
//   ...homePathEntries.green,
// ];

// // setting player pieces class
// class Player_Piece {
//   constructor(team, position, score, homePathEntry, playerId, gameEntry) {
//     this.team = team; // team color
//     this.position = position; // current position on the board
//     this.score = score; // score of the player
//     this.homePathEntry = homePathEntry; // entry point to the home path
//     this.playerId = playerId; // unique identifier for the player
//     this.gameEntry = gameEntry; // entry point to the game
//     this.status = 0; //0 means locked and 1 means unlocked

//     this.initialPosition = position;
//   }

//   unlockPiece() {
//     this.status = 1;
//     this.position = this.gameEntry;
//     let element = document.querySelector(`[piece_id="${this.id}"]`);
//     let toAppendDiv = document.getElementById(this.gameEntry);
//     toAppendDiv.appendChild(element);
//   }

//   unlockPosition(position) {
//     this.position = position;
//   }

//   movePiece(array) {
//     //function to move the piece
//     let filteredArray = array;

//     moveElementSequentially(this.id, filteredArray);
//     this.score += filteredArray.length;
//   }

//   sentMeToBoard() {
//     //
//     this.score = 0;
//     this.position = this.initialPosition; // Reset position to initial
//     this.status = 0; // Lock the piece again
//     let element = document.querySelector(`[piece_id="${this.id}"]`);
//     let toAppendDiv = document.getElementById(this.initialPosition);
//     toAppendDiv.appendChild(element);
//   }
// }
// // two players only for now
// let numPvP = 2;
// let playerPieces = [];
// let boardDetails = [
//   { boardColor: "blue", board: blue_Board, homeEntry: "y13", gameEntry: "b1" },
//   { boardColor: "red", board: red_Board, homeEntry: "b13", gameEntry: "r1" },
//   {
//     boardColor: "green",
//     board: green_Board,
//     homeEntry: "r13",
//     gameEntry: "g1",
//   },
//   {
//     boardColor: "yellow",
//     board: yellow_Board,
//     homeEntry: "g13",
//     gameEntry: "y1",
//   },
// ];

// for (let i = 0; i < numPvP; i++) {
//   let boardColor = boardDetails[i].boardColor;
//   let homeEntry = boardDetails[i].homeEntry;
//   let gameEntry = boardDetails[i].gameEntry;

//   const parentDiv = document.createElement("div");
//   for (let i = 0; i < 4; i++) {
//     const span = document.createElement("span");
//     const icon = document.createElement("i");
//     icon.classList.add(
//       "fa-solid",
//       "fa-location-pin",
//       `piece`,
//       `${boardColor}-piece`
//     );

//     icon.addEventListener("click", (e) => {
//       // click event logic here
//       //   turnForUser(e);
//     });

//     let pieceID = `${boardColor}${i}`;
//     let position = `${i}_${boardColor}`;

//     const player = new Player_Piece(
//       boardColor,
//       position,
//       0,
//       homeEntry,
//       pieceID,
//       gameEntry
//     );
//     span.setAttribute("id", position);
//     icon.setAttribute("piece_id", pieceID);
//     playerPieces.push(player);
//     span.append(icon);
//     parentDiv.append(span);
//   }

//   boardDetails[i].board.append(parentDiv);
// }

// if (numPvP === 2) {
//   playerTurns = ["blue", "green"];
// } else if (numPvP === 3) {
//   playerTurns = ["blue", "green", "red"];
// } else if (numPvP === 4) {
//   playerTurns = ["blue", "green", "red", "yellow"];
// }

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const setPlayerTurn = (playerTurnIndex) => {
//   if (!playerTurnIndex) {
//     return;
//   }

//   let currentTeamTurn = playerTurns[playerTurnIndex];

//   //filtering the board details array and finding the currentTeamTurn object
//   let boardDetailObject = boardDetails.filter(
//     (obj) => obj.boardColor === currentTeamTurn
//   );
//   boardDetailObject[0].board.classList.toggle("active");
// };
// setPlayerTurn(0);

// const nextTeamTurn = async () => {
//   prevPlayerTurnIndex = currentPlayerTurnIndex;
//   if (currentPlayerTurnIndex === playerTurns.length - 1) {
//     currentPlayerTurnIndex = 0;
//   } else {
//     currentPlayerTurnIndex++;
//   }
//   // Reset the previous team's board
//   setPlayerTurn(prevPlayerTurnIndex);
//   setPlayerTurn(currentPlayerTurnIndex);

//   await delay(500);
// };

// const giveArrayForMovingPath = (piece) => {
//   let indexOfPath;
//   let movingArray = [];

//   if (pathArray.includes(piece.position)) {
//     indexOfPath = homePathEntries[piece.team].findIndex(
//       (elem) => elem === piece.position
//     );
//     let homePathArrayForPiece = homePathEntries[piece.team];

//     for (let i = 0; i < diceResult; i++) {
//       if (indexOfPath + 1 >= homePathArrayForPiece.length) {
//         indexOfPath = i;
//       } else {
//         movingArray.push(homePathArrayForPiece[indexOfPath]);
//       }
//       break; // Exit the loop if the end of the home path
//     }
//   } else {
//     indexOfPath = pathArray.findIndex((elem) => elem === piece.position);
//     for (let i = 0; i < diceResult; i++) {
//       indexOfPath = (indexOfPath + 1) % pathArray.length;
//       movingArray.push(pathArray[indexOfPath]);
//     }
//   }
//   return movingArray;
// };

// const moveElementSequentially = (elementId, array) => {
//   const elementToMove = document.querySelector(`[piece_id="${elementId}"]`);
//   let currentTeamTurn = playerTurns[currentPlayerTurnIndex];
//   let piece = playerPieces.find((obj) => obj.id === elementId);
//   let toBreak = false; // flag to break the loop when the piece reaches home

//   //   function to move the element to the next target
//   function moveToNextTarget(index) {
//     if (index >= array.length) return;

//     const currentTarget = document.getElementById(array[index]);

//     if (array[index] === "home") {
//       let indexOfPiece = playerPieces.findIndex((obj) => obj.id === piece.id);
//       playerPieces.splice(indexOfPiece, 1); // Remove the piece from the playerPieces array
//       elementToMove.remove(); // Remove the piece from the DOM
//       toBreak = true;
//       if (currentTeamTurn === "blue") {
//         currentPlayerTurnStatus = false; // Blue team has finished its turn
//       } else {
//         // rollMyDice()
//       }
//       return;
//     }
//     piece.updatePosition(array[index]); // Update the piece's position
//     // append the element to the current target
//     currentTarget.appendChild(elementToMove);

//     setTimeout(() => {
//       moveToNextTarget(index + 1);
//     }, 170);
//   }
//   !toBreak && moveToNextTarget(0); // Start moving the element
// };

// const turnForUser = async (e) => {
//   let isUserTurn = playerTurns[currentPlayerTurnIndex] === "blue";
//   let currentTeamTurn = playerTurns[currentPlayerTurnIndex];
//   if (!isUserTurn || currentPlayerTurnStatus) {
//     return;
//   }

//   // if user has any unlocked pieces
//   let totalUnlockedPieces = playerPieces.filter(
//     (obj) => obj.team === currentTeamTurn && obj.status === 1
//   ).length;

//   let piece = playerPieces.find(
//     (obj) =>
//       obj.playerId === e.target.getAttribute("piece_id") &&
//       obj.team === currentTeamTurn
//   );

//   let opponentPieces = playerPieces.filter(
//     (obj) => obj.team !== currentTeamTurn && obj.status === 1
//   );

//   let array = giveArrayForMovingPath(piece);
//   let cut = opponentPieces.find(
//     (obj) =>
//       obj.position === array[array.length - 1] &&
//       !safePaths.includes(obj.position)
//   );
//   if (cut) {
//     piece.moveMyPiece(array);
//     await delay(array.length * 175);
//     cut.sentMeToBoard();
//     currentPlayerTurnStatus = true;
//     return;
//   }

//   if (array.length < diceResult) {
//     return;
//   }
//   if (diceResult === 6) {
//     currentPlayerTurnStatus = true; //User has a chance to play again
//     if (piece.status === 0) {
//       piece.unlockPiece(); // Unlock the piece if it was locked
//       return;
//     }
//     piece.movePiece(array); // Move the piece
//   } else {
//     if (piece.status === 0) {
//       return; // If the piece is locked, do not allow movement
//     }
//     currentPlayerTurnStatus = true; //User has a chance to play again
//     piece.movePiece(array); // Move the piece
//     if (!teamHasBonus) {
//       nextTeamTurn();
//     }
//   }
// };

// const rollMyDice = async (hasBonus) => {
//   currentPlayerTurnStatus = true; // User has a chance to play again
//   await delay(700);
//   //   if (diceResult === 6 || hasBonus || teamHasBonus) {
//   //   }
// };

// const moveMyPiece = async (piece) => {
//   let array = giveArrayForMovingPath(piece);
//   if (array.length < diceResult) {
//     return false; // Not enough spaces to move
//   }

//   piece.movePiece(array); // Move the piece
//   await delay(array.length * 175); // Wait for the movement to complete
//   rollMyDice();
//   return true; //true if move was performed successfully
// };

// // die rolling logic here

// const rollDiceButton = document.getElementById("rollDiceButton");

// rollDiceButton.addEventListener("click", async () => {
//   let currentTeamTurn = playerTurns[currentPlayerTurnIndex];

//   if (!currentPlayerTurnStatus) return;

//   // Roll the dice
//   rollDiceButton.disabled = true;
//   rollDiceButton.disabled = true;
//   //   rollDice.src = rollDiceGIF.src;
//   diceResult = Math.floor(Math.random() * 6) + 1;
//   currentPlayerTurnStatus = false; //User used its chance
//   teamHasBonus = false;

//   setTimeout(async () => {
//     // rollDice.src = "../Assets/Dice_${diceResult}.png";
//     await delay(700);
//     rollDiceButton.disabled = false;
//     let totalUnlockedPieces = playerPieces.filter(
//       (obj) => obj.team === currentTeamTurn && obj.status === 1
//     );
//     if (totalUnlockedPieces.length === 0 && diceResult !== 6 && teamHasBonus) {
//       await delay(500);
//       currentPlayerTurnStatus = true;
//       nextTeamTurn();
//     }
//   }, 600);
// });
