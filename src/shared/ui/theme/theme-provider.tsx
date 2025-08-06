import { ThemeContext } from "@shared/lib/theme";
import type { Theme } from "@shared/model/theme";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react"

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const getInitialTheme = () => {
        const localTheme = window.localStorage.getItem("theme");
        return (localTheme ?? "system") as Theme;
    }

    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    const [currentTheme, setCurrentTheme] = useState<Exclude<Theme, "system">>("light");

    useEffect(() => {
        if (theme === "system") {
            window.localStorage.removeItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
            setCurrentTheme(prefersDark ? "dark" : "light");
        } else {
            window.localStorage.setItem("theme", theme);
            document.documentElement.setAttribute("data-theme", theme);
            setCurrentTheme(theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={useMemo(() => ({
            theme,
            currentTheme,
            setTheme,
        }), [theme, currentTheme])}>
            {children}
        </ThemeContext.Provider>
    )
}