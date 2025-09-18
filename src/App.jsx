import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelegramProtectedRoute from "./components/TelegramProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import Game from "./page/Game";
import Home from "./page/Home";
import TelegramAuth from "./components/TelegramAuth";
import PlayingPage from "./components/PlayingPage";
import Profile from "./page/Profile";
import History from "./page/History";
import Notification from "./page/Notification";
import Deposit from "./page/profile/Deposit";
import Withdraw from "./page/profile/Withdraw";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<TelegramAuth />} />
      <Route element={<TelegramProtectedRoute />}>
        {" "}
        {/* Telegram auth check */}
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route element={<ProtectedLayout />}>
          {" "}
          {/* Navbar layout */}
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/notification" element={<Notification />} />
        </Route>
      </Route>
      {/* If you want /game/:gameID protected, move it inside above */}
      <Route path="/game/:gameID" element={<PlayingPage />} />
    </Routes>
  );
};

export default App;
