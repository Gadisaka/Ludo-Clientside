// store/telegramAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../constants.js";

const checkTokenExpiry = () => {
  const token = localStorage.getItem("telegram-auth-storage");
  if (token) {
    try {
      const parsed = JSON.parse(token);
      const jwt = parsed?.state?.token;
      if (jwt) {
        const decoded = jwtDecode(jwt);
        if (decoded.exp && Date.now() / 1000 > decoded.exp) {
          localStorage.removeItem("telegram-auth-storage");
          // Don't redirect to login for Telegram users, they'll be auto-authenticated
        }
      }
    } catch {
      localStorage.removeItem("telegram-auth-storage");
    }
  }
};

// Run on app load
checkTokenExpiry();

const useTelegramAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      isTelegramWebApp: false,
      needsPhoneNumber: false,

      // Initialize Telegram Web App
      initTelegramWebApp: () => {
        if (window.Telegram && window.Telegram.WebApp) {
          const webApp = window.Telegram.WebApp;
          webApp.expand();
          webApp.ready();

          set({ isTelegramWebApp: true });
          return true;
        }
        return false;
      },

      // Authenticate with Telegram
      authenticateWithTelegram: async (phoneNumber = null) => {
        try {
          set({ loading: true, error: null });

          if (!window.Telegram || !window.Telegram.WebApp) {
            throw new Error("Not running in Telegram Web App");
          }

          const webApp = window.Telegram.WebApp;
          const initData = webApp.initData;

          if (!initData) {
            throw new Error("No initData available from Telegram Web App");
          }

          const response = await axios.post(
            `${API_URL}/auth/telegram/telegram-auth`,
            {
              initData,
              phoneNumber,
            }
          );

          const { user, token, isNewUser } = response.data;

          set({
            user,
            token,
            loading: false,
            needsPhoneNumber: isNewUser && !phoneNumber,
          });

          return { user, token, needsPhoneNumber: isNewUser && !phoneNumber };
        } catch (err) {
          let errorMsg = "Telegram authentication failed";
          if (err.response && err.response.data && err.response.data.message) {
            errorMsg = err.response.data.message;
          }
          set({ error: errorMsg, loading: false });
          console.error("Telegram auth error:", err);
          throw err;
        }
      },

      // Update phone number for existing user
      updatePhoneNumber: async (phoneNumber) => {
        try {
          set({ loading: true, error: null });

          const { user } = get();
          if (!user || !user.telegram_id) {
            throw new Error("No authenticated user found");
          }

          const response = await axios.post(
            `${API_URL}/auth/telegram/update-phone`,
            {
              telegram_id: user.telegram_id,
              phoneNumber,
            }
          );

          const updatedUser = response.data.user;
          set({
            user: updatedUser,
            loading: false,
            needsPhoneNumber: false,
          });

          return updatedUser;
        } catch (err) {
          let errorMsg = "Failed to update phone number";
          if (err.response && err.response.data && err.response.data.message) {
            errorMsg = err.response.data.message;
          }
          set({ error: errorMsg, loading: false });
          console.error("Phone update error:", err);
          throw err;
        }
      },

      // Auto-authenticate on app load
      autoAuthenticate: async () => {
        try {
          // Check if we're in Telegram Web App
          if (!get().initTelegramWebApp()) {
            console.log("Not running in Telegram Web App");
            return false;
          }

          // Check if user is already authenticated
          const { user, token } = get();
          if (user && token) {
            // Verify token is still valid
            try {
              const decoded = jwtDecode(token);
              if (decoded.exp && Date.now() / 1000 < decoded.exp) {
                return true; // Already authenticated and token is valid
              }
            } catch {
              // Token is invalid, continue with re-authentication
            }
          }

          // Attempt auto-authentication
          await get().authenticateWithTelegram();
          return true;
        } catch (err) {
          console.error("Auto-authentication failed:", err);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("telegram-auth-storage");
        set({ user: null, token: null, needsPhoneNumber: false });
      },

      clearError: () => set({ error: null }),
    }),
    { name: "telegram-auth-storage" }
  )
);

export default useTelegramAuthStore;
