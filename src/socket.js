import { io } from "socket.io-client";

const socket = io("http://localhost:4002", {
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
