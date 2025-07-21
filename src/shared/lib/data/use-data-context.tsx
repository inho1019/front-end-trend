import type { ParserData } from "@shared/model/parser";
import { createContext, useContext } from "react";

type DataContextType = {
  data: ParserData[] | null;
  handleSearch: (search: string) => void;
  loading: boolean;
} | null;

export const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
  return useContext(DataContext);
};