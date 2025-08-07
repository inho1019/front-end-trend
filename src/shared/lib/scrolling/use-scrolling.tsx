import { useContext } from "react";
import { ScrollingContext } from "./use-scrolling-context";

export const useScrolling = () => {
    const theme = useContext(ScrollingContext);
    if (!theme) {
        throw new Error("useScrolling must be used within a ScrollingProvider");
    }

    return theme;
}