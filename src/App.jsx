import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from "./page/Game";
import Home from "./page/Home";
import Login from "./page/auth/Login";
import { useEffect, useState } from "react";
import PlayingPage from "./components/PlayingPage";
import {jwt_decode} from 'jwt-decode';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // return <Navigate to="/login" replace />;
      try {
        const { exp } = jwt_decode(token);
        if (exp < Date.now() / 1000) {
          localStorage.removeItem("token");
          return <Navigate to="/login" />;
        }
        return children;
      } catch {
        return <Navigate to="/login" />;
      }
    }

    return children;
  };

  return (
    <div>
      {isAuthenticated &&
      (location.pathname !== "/login" ||
        location.pathname !== "/register" ||
        location.pathname !== "/game/:gameID") ? (
        <Navbar />
      ) : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game/:gameID"
          element={
            <ProtectedRoute>
              <PlayingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
