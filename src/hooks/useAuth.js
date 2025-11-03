import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  register: (userData) => set({ user: userData, isAuthenticated: true }),
}));

export default useAuth;
