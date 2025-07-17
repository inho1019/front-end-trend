import type { ParserData } from "@shared/model/parser";
import { createContext, useContext } from "react";

export const DataContext = createContext<ParserData[] | null>(null);

export const useDataContext = () => {
  return useContext(DataContext);
};