import { createContext, useContext } from "react";

type MessageContextType = {
  addMessage: (message: string) => void;
} | null;

export const MessageContext = createContext<MessageContextType | null>(null);

export const useMessageContext = () => {
  return useContext(MessageContext);
};