import { create } from "zustand";

interface AppState {
  selectedCoin: string;
  setSelectedCoin: (id: string) => void;
  walletAddress: string | null;
  setWalletAddress: (addr: string | null) => void;
  aiChatHistory: { role: "user" | "ai"; text: string }[];
  addChatMessage: (msg: { role: "user" | "ai"; text: string }) => void;
  clearChat: () => void;
  generatedImages: string[];
  addGeneratedImage: (url: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedCoin: "bitcoin",
  setSelectedCoin: (id) => set({ selectedCoin: id }),
  walletAddress: null,
  setWalletAddress: (addr) => set({ walletAddress: addr }),
  aiChatHistory: [],
  addChatMessage: (msg) =>
    set((s) => ({
      aiChatHistory: [...s.aiChatHistory, msg].slice(-50),
    })),
  clearChat: () => set({ aiChatHistory: [] }),
  generatedImages: [],
  addGeneratedImage: (url) =>
    set((s) => ({
      generatedImages: [url, ...s.generatedImages].slice(0, 6),
    })),
}));
