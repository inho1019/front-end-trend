import { createContext, useContext, type RefObject } from "react";

type ScreenContextType = {
  scrolling: boolean;
  setScrolling: (value: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
  scrollTop: number;
  isMobile: boolean;
  screenWidth: number;
};

export const ScreenContext = createContext<ScreenContextType | null>(null);

export const useScreenContext = () => {
  return useContext(ScreenContext);
};