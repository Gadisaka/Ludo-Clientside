import React from "react";
import "../../public/style.css";
import { ludoBoxCoordinates } from "../constants/constants";

function Token({ position, color, onClick }) {
  console.log(`Token rendered at position: ${position}, color: ${color}`);
  const top = ludoBoxCoordinates[position]?.y || 0;
  const left = ludoBoxCoordinates[position]?.x || 0;
  console.log(top, left, ludoBoxCoordinates[position]);

  const tokenStyle = {
    // backgroundColor: color,
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
