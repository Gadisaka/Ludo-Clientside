import { create } from "zustand";

const useUserStore = create((set) => ({
  avatar: null, // URL or base64 string for the avatar image
  username: "",
  age: null,
  currentPlayerColor: "",
  gameSetting: { stake: 0, requiredPieces: 4 }, // Default game setting
  balance: 230.0,
  setGameSetting: (gameSetting) => set({ gameSetting }),
  setAvatar: (avatar) => set({ avatar }),
  setUsername: (username) => set({ username }),
  setAge: (age) => set({ age }),
  setCurrentPlayerColor: (currentPlayerColor) => set({ currentPlayerColor }),
  setBalance: (balance) => set({ balance }),
}));

export default useUserStore;
