import { useContext } from "react";
import { SiteContext } from "./use-site-context";

export const useSite = () => {
    const data = useContext(SiteContext);
    if (!data) {
        throw new Error("useSite must be used within a SiteProvider");
    }

    return data;
}