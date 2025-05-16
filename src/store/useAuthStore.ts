import { create } from "zustand";

interface DecodedToken {
  id: number;
  role: "PARENT" | "CHILD";
}

interface AuthState {
  role: DecodedToken["role"] | null;
  setRole: (role: DecodedToken["role"]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
