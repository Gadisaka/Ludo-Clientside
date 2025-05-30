import React from "react";
import Ludoboard from "../components/Ludoboard";
import DieRollButton from "../components/Dierollingbutton";

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 relative">
      <div className="moving-background">
        <div className="light-orb"></div>
        <div className="light-orb"></div>
        <div className="light-orb"></div>
      </div>
      <div className="bg-gray-300/30  w-[300px] h-[300px] backdrop-blur-md border border-white/20 shadow-lg rounded-lg z-10">
        <Ludoboard />
      </div>
      <div className="z-10 m-2">
        <DieRollButton />
      </div>
    </div>
  );
}

export default Home;
