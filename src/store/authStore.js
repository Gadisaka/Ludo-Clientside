// store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../constants.js";

const checkTokenExpiry = () => {
  const token = localStorage.getItem("auth-storage");
  if (token) {
    try {
      // If using persist, token is in JSON: { state: { token, ... } }
      const parsed = JSON.parse(token);
      const jwt = parsed?.state?.token;
      if (jwt) {
        const decoded = jwtDecode(jwt);
        if (decoded.exp && Date.now() / 1000 > decoded.exp) {
          localStorage.removeItem("auth-storage");
          window.location.href = "/login";
        }
      }
    } catch {
      // If token is malformed, remove it
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
  }
};

// Run on app load
checkTokenExpiry();

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.post(`${API_URL}/auth/login`, credentials);
          const { user, token } = res.data;
          set({ user, token, loading: false });
        } catch (err) {
          let errorMsg = "Login failed";
          if (err.response && err.response.data && err.response.data.message) {
            errorMsg = err.response.data.message;
          } else if (
            err.response &&
            err.response.data &&
            err.response.data.errors &&
            Array.isArray(err.response.data.errors)
          ) {
            errorMsg = err.response.data.errors.map((e) => e.msg).join("; ");
          }
          set({ error: errorMsg, loading: false });
          console.log(err);
        }
      },

      signup: async (data) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.post(`${API_URL}/auth/register`, data);
          if (res.data.user) {
            // After successful signup, automatically log in the user to get a token
            const loginRes = await axios.post(`${API_URL}/auth/login`, {
              phone: data.phone,
              password: data.password,
              role: "PLAYER",
            });
            const { user, token } = loginRes.data;
            set({ user, token, loading: false });
          } else {
            set({ loading: false });
          }
        } catch (err) {
          let errorMsg = "Signup failed";
          if (err.response && err.response.data && err.response.data.message) {
            errorMsg = err.response.data.message;
          } else if (
            err.response &&
            err.response.data &&
            err.response.data.errors &&
            Array.isArray(err.response.data.errors)
          ) {
            errorMsg = err.response.data.errors.map((e) => e.msg).join("; ");
          }
          set({ error: errorMsg, loading: false });
          console.log(err);
        }
      },

      logout: () => {
        localStorage.removeItem("auth-storage");
        set({ user: null, token: null });
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
