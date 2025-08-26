import { useThemeStore } from "@/store";
import { ThemeContext } from "@shared/lib/theme";
import { NativeApp } from "@shared/lib/utils";
import type { Theme } from "@shared/model/theme";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react"

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [currentTheme, setCurrentTheme] = useState<Exclude<Theme, "system">>("light");
    const theme = useThemeStore(state => state.theme);
    const setTheme = useThemeStore(state => state.setTheme);

    useEffect(() => {
        if (theme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
            setCurrentTheme(prefersDark ? "dark" : "light");
            NativeApp.invoke("setTheme", { theme: prefersDark ? "dark" : "light" });
        } else {
            document.documentElement.setAttribute("data-theme", theme);
            setCurrentTheme(theme);
            NativeApp.invoke("setTheme", { theme: theme });
        }
    }, [theme]);

    useEffect(() => {
        const fetchTheme = async () => {
            if (NativeApp.isNative) {
                setTheme(await NativeApp.invoke<Theme>("getTheme") ?? "system");
            }
        }
        fetchTheme();
    }, [setTheme])

    return (
        <ThemeContext.Provider value={useMemo(() => ({
            theme,
            currentTheme,
            setTheme,
        }), [theme, currentTheme, setTheme])}>
            {children}
        </ThemeContext.Provider>
    )
}