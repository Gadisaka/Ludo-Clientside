import React, { useState, useEffect, useRef } from "react";
import "../../public/style.css";
import { ludoBoxCoordinates } from "../constants/constants";
import Slider from "@mui/material/Slider";

function Token({ position, color, onClick, animate, samePosition, isMovable }) {
  const [currentPosition, setCurrentPosition] = useState(position);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const startAnimation = (path) => {
      const duration = 500; // Animation duration in milliseconds
      let startTime = null;

      const animateStep = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
          const x = currentPosition.x + (path.x - currentPosition.x) * progress;
          const y = currentPosition.y + (path.y - currentPosition.y) * progress;
          setCurrentPosition({ x, y });
          animationFrameRef.current = requestAnimationFrame(animateStep);
        } else {
          // Animation complete
          setCurrentPosition(path);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animateStep);
    };

    if (animate) {
      startAnimation(animate);
    }
  }, [animate, currentPosition]);

  const top = ludoBoxCoordinates[position]?.y || 0;
  const left = ludoBoxCoordinates[position]?.x || 0;

  const addedPosition = samePosition ? 8 : 0;
  // console.log(samePosition, "yerereerere");

  // Blinking background for movable tokens

  const tokenStyle = {
    position: "absolute",
    left: `${left + 10 + addedPosition}px`,
    top: `${top + 10}px`,
    // top: "40px",
    // left: "218px",
    transition: "left 0.3s ease, top 0.3s ease",
  };

  return (
    <div style={tokenStyle}>
      <div
        className={` fa-solid text-[20px]
        } fa-location-pin piece ${color}-piece`}
        onClick={() => onClick(position)}
      ></div>
      <div className="w-5 h-5 rounded-full absolute left-1/2 top-[-7px] transform -translate-x-1/2">
        {/* Spinning Border Layer */}
        <div
          className={`w-full h-full rounded-full  border-dashed border-gray-800 ${
            isMovable ? "animate-spin border-2" : ""
          }`}
        ></div>

        {/* Static Inner Circle */}
        <div className="w-4 h-4 rounded-full border-3 border-red-900 absolute left-1/2 top-[2px] transform -translate-x-1/2"></div>
      </div>
    </div>
  );
}

export default Token;
