import { io } from "socket.io-client";

const socket = io("https://ludo-serverside.onrender.com", {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: true,
  transports: ["websocket", "polling"],
  forceNew: true,
});

export default socket;
