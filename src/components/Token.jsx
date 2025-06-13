import React, { useState, useEffect, useRef } from "react";
import "../../public/style.css";
import { ludoBoxCoordinates } from "../constants/constants";

function Token({ position, color, onClick, animate }) {
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

  const tokenStyle = {
    position: "absolute",
    left: `${left + 10}px`,
    top: `${top + 10}px`,
    // top: "40px",
    // left: "218px",
    transition: "left 0.3s ease, top 0.3s ease",
  };

  return (
    <div
      className={`fa-solid fa-location-pin piece ${color}-piece`}
      onClick={() => onClick(position)}
      style={tokenStyle}
    ></div>
  );
}

export default Token;
