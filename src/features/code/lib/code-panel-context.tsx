import { createContext, useContext } from "react";
import type { NavigateOptions } from "react-router";

type CodePanelContextType = {
  isOpen: boolean;
  isHidden: boolean;
  setIsOpen: (isOpen: boolean) => void;
  showPanel: (options?: NavigateOptions) => void
  hidePanel: (options?: NavigateOptions) => void
} | null;

export const CodePanelContext = createContext<CodePanelContextType | null>(null);

export const useCodePanelContext = () => {
  return useContext(CodePanelContext);
};