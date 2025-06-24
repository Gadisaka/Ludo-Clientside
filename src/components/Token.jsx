import React, { useState, useEffect, useRef } from "react";
import "../../public/style.css";
import { ludoBoxCoordinates } from "../constants/constants";
import { paths } from "../logic/ludoPaths";
import Slider from "@mui/material/Slider";

function Token({ position, color, onClick, animate, samePosition, isMovable }) {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [lightPosition, setLightPosition] = useState(null); // Position key for the light
  const lightTimeoutRef = useRef(null);

  // Helper: get the path array for this token's color
  const getPathArray = () => paths[color] || [];

  // When the token moves, animate the light along the path with a delay
  useEffect(() => {
    if (!position) return;
    const pathArr = getPathArray();
    const tokenIdx = pathArr.indexOf(position);
    if (tokenIdx === -1) {
      setLightPosition(null);
      return;
    }

    // If the light is already at the token, don't animate
    if (lightPosition === position) return;

    // Start the light at the previous position (if any)
    let startIdx = tokenIdx - 1;
    if (startIdx < 0) {
      setLightPosition(null);
      return;
    }
    setLightPosition(pathArr[startIdx]);

    // Animate the light to follow the token with a delay
    function animateLight(idx) {
      if (idx > tokenIdx) return;
      setLightPosition(pathArr[idx]);
      if (idx < tokenIdx) {
        lightTimeoutRef.current = setTimeout(() => animateLight(idx + 1), 300);
      } else {
        // Remove the light after a short time at the final position
        lightTimeoutRef.current = setTimeout(() => setLightPosition(null), 200);
      }
    }
    lightTimeoutRef.current = setTimeout(() => animateLight(startIdx + 1), 300);

    return () => {
      if (lightTimeoutRef.current) clearTimeout(lightTimeoutRef.current);
    };
    // eslint-disable-next-line
  }, [position, color]);

  // Animate the token itself (existing logic)
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
          setCurrentPosition(path);
        }
      };
      animationFrameRef.current = requestAnimationFrame(animateStep);
    };
    if (animate) {
      startAnimation(animate);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, currentPosition]);

  // Get coordinates for the token's current position
  const top = ludoBoxCoordinates[position]?.y || 0;
  const left = ludoBoxCoordinates[position]?.x || 0;
  const addedPosition = samePosition ? 8 : 0;

  // Light style
  const lightStyle = () => {
    if (!lightPosition) return { display: "none" };
    const coord = ludoBoxCoordinates[lightPosition] || { x: 0, y: 0 };
    return {
      position: "absolute",
      left: `${coord.x + 5}px`,
      top: `${coord.y + 5}px`,
      width: 10,
      height: 10,
      borderRadius: "50%",
      background:
        color === "red"
          ? "rgba(250,0,0)"
          : color === "green"
          ? "rgba(0,154,42)"
          : color === "blue"
          ? "rgba(0,172,255)"
          : "rgba(254,232,0)",
      filter: "blur(4px)",
      pointerEvents: "none",
      zIndex: 1,
      transition: "left 0.2s linear, top 0.2s linear, opacity 0.2s linear",
    };
  };

  // Blinking background for movable tokens
  const tokenStyle = {
    position: "absolute",
    left: `${left + 10 + addedPosition}px`,
    top: `${top + 10}px`,
    transition: "left 0.3s ease, top 0.3s ease",
    zIndex: 2,
  };

  return (
    <>
      {/* Trailing light */}
      <div style={lightStyle()} />
      <div style={tokenStyle}>
        <div
          className={` fa-solid text-[25px]
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
    </>
  );
}

export default Token;
