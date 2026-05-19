import type { Theme } from "@shared/model/theme";
import { createContext, useContext } from "react";

type ThemeContextType = {
  theme: Theme;
  currentTheme: Exclude<Theme, "system">;
  setTheme: (theme: Theme) => void;
} | null;

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};