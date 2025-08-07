import { createContext, useContext } from "react";

type ScreenContextType = {
  activating: boolean;
  setActivating: (value: boolean) => void;
} | null;

export const ScreenContext = createContext<ScreenContextType | null>(null);

export const useScreenContext = () => {
  return useContext(ScreenContext);
};