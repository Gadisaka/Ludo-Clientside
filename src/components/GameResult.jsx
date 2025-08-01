import React, { useEffect, useState } from "react";

// Confetti component
const Confetti = () => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Create confetti pieces
    const pieces = [];
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
      "#ff8800",
      "#8800ff",
    ];

    for (let i = 0; i < 150; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // Random horizontal position (0-100%)
        y: -10, // Start above the screen
        color: colors[Math.floor(Math.random() * colors.length)],
        width: Math.random() * 6 + 3, // Random width between 3-9px
        height: Math.random() * 4 + 2, // Random height between 2-6px
        speed: Math.random() * 1.5 + 1, // Moderate fall speed (1-2.5)
        rotation: Math.random() * 360, // Random rotation
        rotationSpeed: (Math.random() - 0.5) * 5, // Slower rotation speed
        sway: Math.random() * 2 - 1, // Random sway factor
      });
    }

    setConfetti(pieces);

    // Animation loop
    const animate = () => {
      setConfetti((prev) =>
        prev.map((piece) => ({
          ...piece,
          y: piece.y + piece.speed,
          x: piece.x + piece.sway * 0.1,
          rotation: piece.rotation + piece.rotationSpeed,
        }))
      );
    };

    const interval = setInterval(animate, 80); // Moderate animation interval (80ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2001]">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: piece.y > 100 ? 0 : 1, // Fade out when below screen
          }}
        />
      ))}
    </div>
  );
};

const GameResult = ({ result, onTryAgain }) => {
  const isWinner = result.isWinner;
  const playerData = isWinner ? result.winner : result.loser;
  const gameDuration = Math.floor(result.gameDuration / 1000);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[2000]">
      {/* Confetti for winners */}
      {isWinner && <Confetti />}

      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-700">
        <div className="text-center space-y-4">
          <div
            className={`text-4xl mb-4 ${
              isWinner ? "text-yellow-400" : "text-red-400"
            }`}
          >
            <h1 className="font-bold">
              {isWinner ? "🏆 አሸናፊ!" : "Game Over!"}
            </h1>
          </div>

          <div className="space-y-2">
            <p className="text-xl font-semibold text-white">
              @{playerData.name}
            </p>
            <p className="text-gray-300">
              {isWinner ? "እንኳን ደስ አሎት!" : "እንደገና ይሞክሩ"}
            </p>
            <div className="bg-gray-700/50 p-4 rounded-lg space-y-2">
              <p className="text-gray-300">
                Prize:{" "}
                <span className="text-white font-semibold">{result.stake}</span>
              </p>
              <p className="text-gray-300">
                Game duration:{" "}
                <span className="text-white font-semibold">
                  {gameDuration} seconds
                </span>
              </p>
              <p className="text-gray-300">
                Required pieces:{" "}
                <span className="text-white font-semibold">
                  {result.requiredPieces}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onTryAgain}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
