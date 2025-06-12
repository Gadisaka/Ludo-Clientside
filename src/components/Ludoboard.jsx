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
          <div id="red-Board" className="board">
            <div>
              <span>
                <i className="fa-solid fa-location-pin piece red-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece red-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece red-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece red-piece"></i>
              </span>
            </div>
          </div>

          <div className="ludoBox verticalPath" id="p1"></div>
          <div className="ludoBox verticalPath" id="p2"></div>
          <div className="ludoBox verticalPath" id="p3"></div>
          <div className="ludoBox verticalPath" id="p4"></div>
          <div className="ludoBox verticalPath greenLudoBox" id="p5"></div>
          <div className="ludoBox verticalPath greenLudoBox" id="p6"></div>
          <div className="ludoBox verticalPath" id="p7"></div>
          <div className="ludoBox verticalPath greenLudoBox" id="p8"></div>
          <div className="ludoBox verticalPath" id="p9"></div>
          <div className="ludoBox verticalPath" id="p10"></div>
          <div className="ludoBox verticalPath greenLudoBox" id="p11"></div>
          <div className="ludoBox verticalPath" id="p12"></div>
          <div className="ludoBox verticalPath" id="p13"></div>
          <div className="ludoBox verticalPath greenLudoBox" id="p14"></div>
          <div className="ludoBox verticalPath" id="p15"></div>
          <div className="ludoBox verticalPath" id="p16"></div>
          <div className="ludoBox verticalPath greenLudoBox" id="p17"></div>
          <div className="ludoBox verticalPath" id="p18"></div>

          <div id="green-Board" className="board">
            <div>
              <span>
                <i className="fa-solid fa-location-pin piece green-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece green-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece green-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece green-piece"></i>
              </span>
            </div>
          </div>

          <div className="ludoBox horizontalPath" id="p19"></div>
          <div className="ludoBox horizontalPath " id="p20"></div>
          <div className="ludoBox horizontalPath" id="p21"></div>
          <div className="ludoBox horizontalPath" id="p22"></div>
          <div className="ludoBox horizontalPath yellowLudoBox" id="p23"></div>
          <div className="ludoBox horizontalPath yellowLudoBox" id="p24"></div>
          <div className="ludoBox horizontalPath " id="p25"></div>
          <div className="ludoBox horizontalPath  yellowLudoBox" id="p26"></div>
          <div className="ludoBox horizontalPath  " id="p27"></div>
          <div className="ludoBox horizontalPath  " id="p28"></div>
          <div className="ludoBox horizontalPath  yellowLudoBox" id="p29"></div>
          <div className="ludoBox horizontalPath " id="p30"></div>
          <div className="ludoBox horizontalPath" id="p31"></div>
          <div className="ludoBox horizontalPath yellowLudoBox" id="p32"></div>
          <div className="ludoBox horizontalPath" id="p33"></div>
          <div className="ludoBox horizontalPath" id="p34"></div>
          <div className="ludoBox horizontalPath yellowLudoBox" id="p35"></div>
          <div className="ludoBox horizontalPath" id="p36"></div>

          <div id="win-Zone"></div>

          <div className="ludoBox horizontalPath" id="p37"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p38"></div>
          <div className="ludoBox horizontalPath" id="p39"></div>
          <div className="ludoBox horizontalPath" id="p40"></div>
          <div className="ludoBox horizontalPath" id="p41"></div>
          <div className="ludoBox horizontalPath" id="p42"></div>
          <div className="ludoBox horizontalPath " id="p43"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p44"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p45"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p46"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p47"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p48"></div>
          <div className="ludoBox horizontalPath" id="p49"></div>
          <div className="ludoBox horizontalPath" id="p50"></div>
          <div className="ludoBox horizontalPath" id="p51"></div>
          <div className="ludoBox horizontalPath" id="p52"></div>
          <div className="ludoBox horizontalPath " id="p53"></div>
          <div className="ludoBox horizontalPath" id="p54"></div>

          <div id="blue-Board" className="board">
            <div>
              <span>
                <i className="fa-solid fa-location-pin piece blue-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece blue-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece blue-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece blue-piece"></i>
              </span>
            </div>
          </div>

          <div className="ludoBox verticalPath" id="p55"></div>
          <div className="ludoBox verticalPath blueLudoBox" id="p56"></div>
          <div className="ludoBox verticalPath" id="p57"></div>
          <div className="ludoBox verticalPath" id="p58"></div>
          <div className="ludoBox verticalPath blueLudoBox" id="p59"></div>
          <div className="ludoBox verticalPath" id="p60"></div>
          <div className="ludoBox verticalPath" id="p61"></div>
          <div className="ludoBox verticalPath blueLudoBox" id="p62"></div>
          <div className="ludoBox verticalPath" id="p63"></div>
          <div className="ludoBox verticalPath" id="p64"></div>
          <div className="ludoBox verticalPath blueLudoBox" id="p65"></div>
          <div className="ludoBox verticalPath" id="p66"></div>
          <div className="ludoBox verticalPath blueLudoBox" id="p67"></div>
          <div className="ludoBox verticalPath blueLudoBox" id="p68"></div>
          <div className="ludoBox verticalPath" id="p69"></div>
          <div className="ludoBox verticalPath" id="p70"></div>
          <div className="ludoBox verticalPath" id="p71"></div>
          <div className="ludoBox verticalPath" id="p72"></div>

          <div id="yellow-Board" className="board">
            <div>
              <span>
                <i className="fa-solid fa-location-pin piece yellow-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece yellow-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece yellow-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece yellow-piece"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LudoBoard;
