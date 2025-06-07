import React, { useState } from "react";
import "../../public/style.css";

const redPath = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10"];
const greenPath = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g10"];
const yellowPath = [
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
];
const bluePath = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"];

const LudoBoard = () => {
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
  const rolledNumber = 1; // Replace with actual dice roll later

  function movePieceByColor(color, index) {
    let path, setPositions;
    switch (color) {
      case "red":
        path = redPath;
        setPositions = setRedPositions;
        break;
      case "green":
        path = greenPath;
        setPositions = setGreenPositions;
        break;
      case "yellow":
        path = yellowPath;
        setPositions = setYellowPositions;
        break;
      case "blue":
        path = bluePath;
        setPositions = setBluePositions;
        break;
      default:
        console.error("Invalid color");
        return;
    }

    setPositions((prev) => {
      const currentPos = prev[index];
      const currentIndex = currentPos ? path.indexOf(currentPos) : -1;
      const newIndex = currentIndex + rolledNumber;
      if (newIndex >= path.length) return prev;

      const updated = [...prev];
      updated[index] = path[newIndex];
      return updated;
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
            {[
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
            ].map((id) => (
              <div
                className={`ludoBox ${
                  id.startsWith("gh") || id === "g1" ? "greenLudoBox" : ""
                }`}
                id={id}
                key={id}
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
            {[
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
            ].map((id) => (
              <div
                className={`ludoBox ${
                  id.startsWith("rh") || id === "r1" ? "redLudoBox" : ""
                }`}
                id={id}
                key={id}
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
            {[
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
            ].map((id) => (
              <div
                className={`ludoBox ${
                  id.startsWith("yh") || id === "y1" ? "yellowLudoBox" : ""
                }`}
                id={id}
                key={id}
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
            {[
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
            ].map((id) => (
              <div
                className={`ludoBox ${
                  id.startsWith("bh") || id === "b1" ? "blueLudoBox" : ""
                }`}
                id={id}
                key={id}
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
