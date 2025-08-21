import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameProvider } from "./context/GameContext.jsx";
import WalletProvider from "./components/WalletProvider.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameProvider>
      <BrowserRouter>
        <WalletProvider>
          <App />
        </WalletProvider>
      </BrowserRouter>
    </GameProvider>
  </StrictMode>
);
