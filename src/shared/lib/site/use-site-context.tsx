import type { Site } from "@shared/model/site";
import { createContext, useContext } from "react";

type SiteContextType = {
  data: Site[] | null;
  loading: boolean;
} | null;

export const SiteContext = createContext<SiteContextType | null>(null);

export const useSiteContext = () => {
  return useContext(SiteContext);
};