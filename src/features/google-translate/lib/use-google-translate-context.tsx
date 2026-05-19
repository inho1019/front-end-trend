import { createContext, useContext } from "react";

type GoogleTranslateContextType = {
  toggleTranslate: () => void;
  setIsEnabled: (value: boolean) => void;
  isEnabled: boolean;
};

export const GoogleTranslateContext = createContext<GoogleTranslateContextType | null>(null);

export const useGoogleTranslateContext = () => {
  return useContext(GoogleTranslateContext);
};