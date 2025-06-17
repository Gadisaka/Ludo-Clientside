import React, { useState, useEffect, useCallback } from "react";
import "../../public/style.css";
import socket from "../socket";
import { useGame } from "../context/GameContext";
import useUserStore from "../store/zutstand";
import Token from "./Token";
import { safeZoneStar } from "./Dies";
import GameResult from "./GameResult";
import { useNavigate } from "react-router-dom";

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
  const [newPath, setNewPath] = useState(null);
  const [step, setStep] = useState(null);
  const [lastValidPosition, setLastValidPosition] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [matchResults, setMatchResults] = useState(null);

  // Get current player's color
  const playerColor = players.find((p) => p.id === socket.id)?.color;
  setCurrentPlayerColor(playerColor);

  const navigate = useNavigate();

  // Handle socket errors
  const handleError = useCallback((message) => {
    setError(message);
    console.log(error);

    setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
  }, []);

  // Check if position is in win zone
  const isWinZone = (position, color) => {
    // Check if position starts with 'w' (win zone positions)
    return position && position.startsWith(`${color}WinZone`);
  };

  // Listen for initial game state
  useEffect(() => {
    socket.on("piece_move_step", ({ color, index, position }) => {
      setStep({ color, index, position });
      if (position) {
        setLastValidPosition(position);
      }
    });

    return () => {
      socket.off("piece_move_step");
    };
  }, [step]);

  // Effect to handle game result when piece reaches win zone
  useEffect(() => {
    if (step && isWinZone(step.position, step.color) && matchResults) {
      const isWinner = matchResults.winner.id === socket.id;
      setGameResult({
        isWinner,
        winner: matchResults.winner,
        loser: matchResults.loser,
        gameDuration: matchResults.gameDuration,
        requiredPieces: matchResults.requiredPieces,
      });
    }
  }, [step, matchResults]);

  // Listen for game events
  useEffect(() => {
    socket.on("error_message", handleError);

    socket.on("piece_moved", (pieces) => {
      setGameState(pieces);
      setNewPath(pieces.path);
    });

    socket.on("piece_killed", ({ color, pieceIndex }) => {
      console.log(`${color} piece ${pieceIndex} was killed!`);
    });

    socket.on("game_over", (results) => {
      setMatchResults(results);
    });

    return () => {
      socket.off("error_message");
      socket.off("piece_moved");
      socket.off("piece_killed");
      socket.off("game_over");
    };
  }, [setGameStatus, gameState, handleError, newPath]);

  const handleTryAgain = () => {
    setGameResult(null);
    setMatchResults(null);
    socket.emit("leave_room", { roomId });
    navigate("/");
  };

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

  let positions = [];
  function isInSamePosition(pos) {
    if (pos === null) return false;
    if (positions.some((p) => p === pos)) {
      positions.push(pos);
      return true;
    } else {
      positions.push(pos);
      return false;
    }
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
          <div className="ludoBox verticalPath" id="p2">
            <svg
              width="14px"
              height="14px"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180 mt-1"
            >
              <path
                d="M6 8L2 8L2 6L8 5.24536e-07L14 6L14 8L10 8L10 16L6 16L6 8Z"
                fill="#009A2A"
              />
            </svg>
          </div>
          <div className="ludoBox verticalPath" id="p3"></div>
          <div className="ludoBox verticalPath" id="p4"></div>
          <div className="ludoBox verticalPath greenLudoBox" id="p5"></div>
          <div className="ludoBox verticalPath greenLudoBox" id="p6"></div>
          <div className="ludoBox verticalPath" id="p7">
            <span className="ml-0.5 mt-1 ">{safeZoneStar}</span>
          </div>
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
          <div className="ludoBox horizontalPath " id="p20">
            <svg
              width="14px"
              height="14px"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-270 ml-1"
            >
              <path
                d="M6 8L2 8L2 6L8 5.24536e-07L14 6L14 8L10 8L10 16L6 16L6 8Z"
                fill="#FEE800"
              />
            </svg>
          </div>
          <div className="ludoBox horizontalPath" id="p21"></div>
          <div className="ludoBox horizontalPath" id="p22"></div>
          <div className="ludoBox horizontalPath yellowLudoBox" id="p23"></div>
          <div className="ludoBox horizontalPath yellowLudoBox" id="p24"></div>
          <div className="ludoBox horizontalPath" id="p25">
            <span className="ml-1">{safeZoneStar}</span>
          </div>
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
          <div id="win-Zone" className="relative">
            <div
              className="absolute w-full h-full"
              style={{
                clipPath: "polygon(0% 0%, 50% 50%, 0% 100%)",
                backgroundColor: "#FA0000",
              }}
            ></div>

            {/* Top-Right: Green Triangle */}
            <div
              className="absolute w-full h-full"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 50% 50%)",
                backgroundColor: "#009A2A",
              }}
            ></div>

            {/* Bottom-Right: Yellow Triangle */}
            <div
              className="absolute w-full h-full"
              style={{
                clipPath: "polygon(50% 50%, 100% 0%, 100% 100%)",
                backgroundColor: "#FEE800",
              }}
            ></div>

            {/* Bottom-Left: Blue Triangle */}
            <div
              className="absolute w-full h-full"
              style={{
                clipPath: "polygon(0% 100%, 50% 50%, 100% 100%)",
                backgroundColor: "#00ACFF",
              }}
            ></div>
          </div>
          <div className="ludoBox horizontalPath" id="p37"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p38"></div>
          <div className="ludoBox horizontalPath" id="p39"></div>
          <div className="ludoBox horizontalPath" id="p40"></div>
          <div className="ludoBox horizontalPath" id="p41"></div>
          <div className="ludoBox horizontalPath" id="p42"></div>
          <div className="ludoBox horizontalPath " id="p43">
            <svg
              width="14px"
              height="14px"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-90 ml-1"
            >
              <path
                d="M6 8L2 8L2 6L8 5.24536e-07L14 6L14 8L10 8L10 16L6 16L6 8Z"
                fill="#FA0000"
              />
            </svg>
          </div>
          <div className="ludoBox horizontalPath redLudoBox" id="p44"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p45"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p46"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p47"></div>
          <div className="ludoBox horizontalPath redLudoBox" id="p48"></div>
          <div className="ludoBox horizontalPath" id="p49"></div>
          <div className="ludoBox horizontalPath" id="p50"></div>
          <div className="ludoBox horizontalPath" id="p51">
            <span className="ml-1">{safeZoneStar}</span>
          </div>
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
          <div className="ludoBox verticalPath" id="p66">
            <span className="ml-0.5 mt-1 ">{safeZoneStar}</span>
          </div>
          <div className="ludoBox verticalPath blueLudoBox" id="p67"></div>
          <div className="ludoBox verticalPath blueLudoBox" id="p68"></div>
          <div className="ludoBox verticalPath" id="p69"></div>
          <div className="ludoBox verticalPath" id="p70"></div>
          <div className="ludoBox verticalPath" id="p71">
            <svg
              width="14px"
              height="14px"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1"
            >
              <path
                d="M6 8L2 8L2 6L8 5.24536e-07L14 6L14 8L10 8L10 16L6 16L6 8Z"
                fill="#00ACFF"
              />
            </svg>
          </div>
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
              const isStepMatch =
                step && step.color === color && step.index === index;
              const shouldResetToPos = isStepMatch && step?.position === pos;

              return (
                <Token
                  key={`${color}-${index}`}
                  position={
                    shouldResetToPos
                      ? pos
                      : isStepMatch
                      ? step?.position || lastValidPosition
                      : pos
                  }
                  color={color}
                  onClick={() => movePieceByColor(color, index)}
                  path={newPath}
                  samePosition={isInSamePosition(pos)}
                />
              );
            })
          )}
        </div>
      </div>
      {gameResult && (
        <GameResult result={gameResult} onTryAgain={handleTryAgain} />
      )}
    </>
  );
};

export default LudoBoard;
