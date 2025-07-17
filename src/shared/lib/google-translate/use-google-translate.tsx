import { useContext } from "react";
import { GoogleTranslateContext } from "./use-google-translate-context";

export const useGoogleTranslate = () => {
    const googleTranslate = useContext(GoogleTranslateContext);
    if (!googleTranslate) {
        throw new Error("useGoogleTranslate must be used within a GoogleTranslateProvider");
    }

    return googleTranslate;
}