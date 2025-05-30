import React from "react";
import Ludoboard from "../components/Ludoboard";
import DieRollButton from "../components/Dierollingbutton";
import io from "socket.io-client";
import { useEffect } from "react";

function Home() {
  const socket = io.connect("http://localhost:4000");
  const sendmessage = () => {
    socket.emit("send_message", { message: "suppppppppppp" });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert("Message received from server:", data);
    });
  }, [socket]);

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
      <div className="text-white z-50 text-center mt-4">
        <input placeholder="type here..." className="border-2" />
        <button
          onClick={sendmessage}
          className="bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          send message
        </button>
      </div>
    </div>
  );
}

export default Home;
