import React from "react";
import useWalletSocket from "../hooks/useWalletSocket.js";

const WalletProvider = ({ children }) => {
  // Initialize wallet socket connections
  useWalletSocket();

  return <>{children}</>;
};

export default WalletProvider;
