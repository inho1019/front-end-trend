import { createContext, useContext } from "react";
import type { ParserData } from "../../model/parser";

export const DataContext = createContext<ParserData[] | null>(null);

export const useDataContext = () => {
  return useContext(DataContext);
};