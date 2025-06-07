import { create } from "zustand";

const useUserStore = create((set) => ({
  avatar: null, // URL or base64 string for the avatar image
  username: "",
  age: null,
  setAvatar: (avatar) => set({ avatar }),
  setUsername: (username) => set({ username }),
  setAge: (age) => set({ age }),
}));

export default useUserStore;
