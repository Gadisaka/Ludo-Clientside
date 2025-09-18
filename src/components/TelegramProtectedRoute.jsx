import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useTelegramAuthStore from "../store/telegramAuthStore";

const TelegramProtectedRoute = () => {
  const { user, isTelegramWebApp, autoAuthenticate } = useTelegramAuthStore();

  useEffect(() => {
    // Attempt auto-authentication if not already authenticated
    if (!user && isTelegramWebApp) {
      autoAuthenticate();
    }
  }, [user, isTelegramWebApp, autoAuthenticate]);

  // If not in Telegram Web App, redirect to auth page
  if (!isTelegramWebApp) {
    return <Navigate to="/auth" replace />;
  }

  // If no user, stay on auth page (auto-authentication will handle it)
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default TelegramProtectedRoute;
