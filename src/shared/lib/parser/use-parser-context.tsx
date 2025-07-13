import { createContext, useContext } from "react";
import type { ParserData } from "../../model/parser";

export const ParserContext = createContext<ParserData[] | null>(null);

export const useParserContext = () => {
  return useContext(ParserContext);
};