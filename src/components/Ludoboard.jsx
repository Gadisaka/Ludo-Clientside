import React, { useState, useEffect } from "react";
import "../../public/style.css";
import socket from "../socket";
import { useGame } from "../context/GameContext";
import useUserStore from "../store/zutstand";

const LudoBoard = ({ roomId }) => {
  const { currentTurn, players, setGameStatus } = useGame();
  const setCurrentPlayerColor = useUserStore(
    (state) => state.setCurrentPlayerColor
  );
  const [redPositions, setRedPositions] = useState([null, null, null, null]);
  const [greenPositions, setGreenPositions] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [yellowPositions, setYellowPositions] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [bluePositions, setBluePositions] = useState([null, null, null, null]);

  let piecePosId;

  const redPath = [
    "b13",
    "r1",
    "r2",
    "r3",
    "r4",
    "r5",
    "b12",
    "rh1",
    "rh2",
    "rh3",
    "rh4",
    "rh5",
    "b11",
    "b10",
    "b9",
    "b8",
    "b7",
    "b6",
  ];

  const greenPath = [
    "r11",
    "r12",
    "r13",
    "r10",
    "gh1",
    "g1",
    "r9",
    "gh2",
    "g2",
    "r8",
    "gh3",
    "g3",
    "r7",
    "gh4",
    "g4",
    "r6",
    "gh5",
    "g5",
  ];

  const yellowPath = [
    "g6",
    "g7",
    "g8",
    "g9",
    "g10",
    "g11",
    "yh5",
    "yh4",
    "yh3",
    "yh2",
    "yh1",
    "g12",
    "y5",
    "y4",
    "y3",
    "y2",
    "y1",
    "g13",
  ];

  const bluePath = [
    "b5",
    "bh5",
    "y6",
    "b4",
    "bh4",
    "y7",
    "b3",
    "bh3",
    "y8",
    "b2",
    "bh2",
    "y9",
    "b1",
    "bh1",
    "y10",
    "y13",
    "y12",
    "y11",
  ];

  const ALL_PATHS = [
    "r1",
    "r2",
    "r3",
    "r4",
    "r5",
    "r6",
    "r7",
    "r8",
    "r9",
    "r10",
    "r11",
    "r12",
    "r13",
    "g1",
    "g2",
    "g3",
    "g4",
    "g5",
    "g6",
    "g7",
    "g8",
    "g9",
    "g10",
    "g11",
    "g12",
    "g13",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "b9",
    "b10",
    "b11",
    "b12",
    "b13",
    "y1",
    "y2",
    "y3",
    "y4",
    "y5",
    "y6",
    "y7",
    "y8",
    "y9",
    "y10",
    "y11",
    "y12",
    "y13",
  ];

  // Get current player's color
  const playerColor = players.find((p) => p.id === socket.id)?.color;
  setCurrentPlayerColor(playerColor);

  // Listen for game events
  useEffect(() => {
    socket.on("piece_moved", ({ color, positions }) => {
      switch (color) {
        case "red":
          setRedPositions(positions);
          console.log(positions, "grgrgr");

          break;
        case "green":
          setGreenPositions(positions);
          break;
        case "yellow":
          setYellowPositions(positions);
          break;
        case "blue":
          setBluePositions(positions);
          break;
        default:
          console.error("Invalid color");
      }
    });

    socket.on("piece_killed", ({ color, pieceIndex }) => {
      switch (color) {
        case "red":
          setRedPositions((prev) => {
            const updated = [...prev];
            updated[pieceIndex] = null;
            return updated;
          });
          break;
        case "green":
          setGreenPositions((prev) => {
            const updated = [...prev];
            updated[pieceIndex] = null;
            return updated;
          });
          break;
        case "yellow":
          setYellowPositions((prev) => {
            const updated = [...prev];
            updated[pieceIndex] = null;
            return updated;
          });
          break;
        case "blue":
          setBluePositions((prev) => {
            const updated = [...prev];
            updated[pieceIndex] = null;
            return updated;
          });
          break;
        default:
          console.error("Invalid color");
      }
    });

    socket.on("piece_finished", ({ color, pieceIndex }) => {
      // Handle piece finishing (you might want to show an animation or message)
      console.log(`${color} piece ${pieceIndex} has finished!`);
    });

    socket.on("game_over", ({ color }) => {
      setGameStatus("finished");
      // You might want to show a game over message or animation
      console.log(`Game over! ${color} player has won!`);
    });

    return () => {
      socket.off("piece_moved");
      socket.off("piece_killed");
      socket.off("piece_finished");
      socket.off("game_over");
    };
  }, [setGameStatus]);

  function movePieceByColor(color, index) {
    // Only allow movement if it's the player's turn and it's their color
    if (socket.id !== currentTurn) {
      console.log("Not your turn!");
      return;
    }

    if (color !== playerColor) {
      console.log("You can only move your own pieces!");
      return;
    }

    // Emit the piece movement
    socket.emit("move_piece", {
      roomId,
      color,
      pieceIndex: index,
    });
  }

  return (
    <>
      <div className="ludoContainer">
        <div id="ludoBoard">
          {/* RED HOME */}
          <div id="red-Board" className="board">
            <div>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} onClick={() => movePieceByColor("red", i)}>
                  {!redPositions[i] && (
                    <i className="fa-solid fa-location-pin piece red-piece"></i>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* GREEN PATH */}
          <div id="green-Path" className="verticalPath">
            {greenPath.map((id) => (
              <div
                className={`ludoBox ${
                  id.startsWith("gh") || id === "g1" ? "greenLudoBox" : ""
                }`}
                id={id}
                key={id}
                onClick={() => {
                  let posIndex;
                  ALL_PATHS.map((pathId) => {
                    piecePosId = greenPositions.find((pos) => pos === pathId);
                    if (piecePosId !== undefined) {
                      console.log(piecePosId);
                      posIndex = ALL_PATHS.findIndex((p) => piecePosId === p);

                      console.log(posIndex);
                      return;
                    }
                    if (piecePosId !== -1 && piecePosId !== undefined) {
                      movePieceByColor("green", posIndex + 1);
                      console.log(piecePosId);
                    }
                  });
                }}
              >
                {greenPositions.map((pos, idx) =>
                  pos === id ? (
                    <i
                      key={idx}
                      className="fa-solid fa-location-pin piece green-piece"
                    />
                  ) : null
                )}
              </div>
            ))}
          </div>

          {/* GREEN HOME */}
          <div id="green-Board" className="board">
            <div>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} onClick={() => movePieceByColor("green", i)}>
                  {!greenPositions[i] && (
                    <i className="fa-solid fa-location-pin piece green-piece"></i>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* RED PATH */}
          <div id="red-Path" className="horizontalPath">
            {redPath.map((id) => (
              <div
                className={`ludoBox ${
                  id.startsWith("rh") || id === "r1" ? "redLudoBox" : ""
                }`}
                id={id}
                key={id}
                onClick={() => {
                  const pieceIndex = redPositions.findIndex(
                    (pos) => pos === id
                  );
                  if (pieceIndex !== -1) {
                    movePieceByColor("red", pieceIndex);
                  }
                }}
              >
                {redPositions.map((pos, idx) =>
                  pos === id ? (
                    <i
                      key={idx}
                      className="fa-solid fa-location-pin piece red-piece"
                    />
                  ) : null
                )}
              </div>
            ))}
          </div>
          <div id="win-Zone"></div>
          <div id="yellow-Path" className="horizontalPath">
            {yellowPath.map((id) => (
              <div
                className={`ludoBox ${
                  id.startsWith("yh") || id === "y1" ? "yellowLudoBox" : ""
                }`}
                id={id}
                key={id}
                onClick={() => {
                  const pieceIndex = yellowPositions.findIndex(
                    (pos) => pos === id
                  );
                  if (pieceIndex !== -1) {
                    movePieceByColor("yellow", pieceIndex);
                  }
                }}
              >
                {yellowPositions.map((pos, idx) =>
                  pos === id ? (
                    <i
                      key={idx}
                      className="fa-solid fa-location-pin piece yellow-piece"
                    />
                  ) : null
                )}
              </div>
            ))}
          </div>

          <div id="blue-Board" className="board">
            <div>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} onClick={() => movePieceByColor("blue", i)}>
                  {!bluePositions[i] && (
                    <i className="fa-solid fa-location-pin piece blue-piece"></i>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div id="blue-Path" className="verticalPath">
            {bluePath.map((id) => (
              <div
                className={`ludoBox ${
                  id.startsWith("bh") || id === "b1" ? "blueLudoBox" : ""
                }`}
                id={id}
                key={id}
                onClick={() => {
                  const pieceIndex = bluePositions.findIndex(
                    (pos) => pos === id
                  );
                  if (pieceIndex !== -1) {
                    movePieceByColor("blue", pieceIndex);
                  }
                }}
              >
                {bluePositions.map((pos, idx) =>
                  pos === id ? (
                    <i
                      key={idx}
                      className="fa-solid fa-location-pin piece blue-piece"
                    />
                  ) : null
                )}
              </div>
            ))}
          </div>

          <div id="yellow-Board" className="board">
            <div>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} onClick={() => movePieceByColor("yellow", i)}>
                  {!yellowPositions[i] && (
                    <i className="fa-solid fa-location-pin piece yellow-piece"></i>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LudoBoard;
