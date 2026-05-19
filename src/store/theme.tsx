import type { Theme } from "@shared/model/theme";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type ThemeState = {
  theme: Theme;
};

export type ThemeAction = {
  setTheme: (theme: Theme) => void;
};

export type ThemeStateAction = ThemeState & ThemeAction;

export const useThemeStore = create<ThemeStateAction>()(
  persist(
    immer(set => ({
      theme: "system",
      setTheme: (theme: Theme) =>
        set(state => {
          state.theme = theme;
        }), 
    })),
    {
      name: "theme",
      partialize: (state) => ({ theme: state.theme }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);