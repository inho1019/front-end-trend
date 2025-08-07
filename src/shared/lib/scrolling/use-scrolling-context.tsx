import { createContext, useContext } from "react";

type ScrollingContextType = {
  scrolling: boolean;
  setScrolling: (value: boolean) => void;
} | null;

export const ScrollingContext = createContext<ScrollingContextType | null>(null);

export const useScrollingContext = () => {
  return useContext(ScrollingContext);
};