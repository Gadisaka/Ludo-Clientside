import React, { useState, useEffect, useCallback } from "react";
import "../../public/style.css";
import socket from "../socket";
import { useGame } from "../context/GameContext";
import useUserStore from "../store/zutstand";
import Token from "./Token";
import { ludoBoxCoordinates } from "../constants/constants";

const LudoBoard = ({ roomId }) => {
  const { currentTurn, players, setGameStatus } = useGame();
  const setCurrentPlayerColor = useUserStore(
    (state) => state.setCurrentPlayerColor
  );
  const [gameState, setGameState] = useState({
    pieces: {
      red: ["rh1", "rh2", "rh3", "rh4"],
      green: ["gh1", "gh2", "gh3", "gh4"],
      blue: ["bh1", "bh2", "bh3", "bh4"],
      yellow: ["yh1", "yh2", "yh3", "yh4"],
    },
  });
  const [error, setError] = useState(null);

  // Get current player's color
  const playerColor = players.find((p) => p.id === socket.id)?.color;
  setCurrentPlayerColor(playerColor);

  // Handle socket errors
  const handleError = useCallback((message) => {
    setError(message);
    setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
  }, []);

  // Listen for initial game state

  // Listen for game events
  useEffect(() => {
    socket.on("error_message", handleError);

    socket.on("piece_moved", (pieces) => {
      setGameState(pieces);
      const updatedPieces = { ...pieces };
      for (const color in updatedPieces) {
        for (let i = 0; i < updatedPieces[color].length; i++) {
          if (updatedPieces[color][i] !== gameState?.pieces?.[color]?.[i]) {
            const newPosition = ludoCoordinates[updatedPieces[color][i]];
            const oldPosition =
              ludoCoordinates[gameState?.pieces?.[color]?.[i]];
            // Trigger animation for the moved token
            // Pass the new position as the animation target
            // You might need to adjust this based on your animation logic
            // For now, we're just setting the position directly
          }
        }
      }
    });

    socket.on("piece_killed", ({ color, pieceIndex }) => {
      // Animation or message for killed pieces
      console.log(`${color} piece ${pieceIndex} was killed!`);
    });

    socket.on("piece_finished", ({ color, pieceIndex }) => {
      // Show animation or message for finished pieces
      console.log(`${color} piece ${pieceIndex} has finished!`);
    });

    socket.on("game_over", ({ color }) => {
      setGameStatus("finished");
      // Show game over message
      console.log(`Game over! ${color} player has won!`);
    });

    return () => {
      socket.off("error_message");
      socket.off("piece_moved");
      socket.off("piece_killed");
      socket.off("piece_finished");
      socket.off("game_over");
    };
  }, [setGameStatus, gameState, handleError]);

  function movePieceByColor(color, index) {
    if (socket.id !== currentTurn) {
      console.log("Not your turn!");
      return;
    }

    if (color !== playerColor) {
      console.log("You can only move your own pieces!");
      return;
    }

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
              <span></span>
              <span></span>
              <span></span>
              <span></span>
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
              <span></span>
              <span></span>
              <span></span>
              <span></span>
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
              <span></span>
              <span></span>
              <span></span>
              <span></span>
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
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          {Object.entries(gameState.pieces).map(([color, tokens]) =>
            tokens.map((pos, index) => {
              return (
                <Token
                  key={`${color}-${index}`}
                  position={pos}
                  color={color}
                  onClick={() => movePieceByColor(color, index)}
                  animate={pos}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default LudoBoard;
