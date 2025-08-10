import { createContext, useContext, type RefObject } from "react";

type ScreenContextType = {
  activatingRef: RefObject<HTMLDivElement> | null;
};

export const ScreenContext = createContext<ScreenContextType | null>(null);

export const useScreenContext = () => {
  return useContext(ScreenContext);
};