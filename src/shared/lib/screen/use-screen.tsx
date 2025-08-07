import { useContext } from "react";
import { ScreenContext } from "./use-screen-context";

export const useScreen = () => {
    const theme = useContext(ScreenContext);
    if (!theme) {
        throw new Error("useScreen must be used within a ScreenProvider");
    }

    return theme;
}