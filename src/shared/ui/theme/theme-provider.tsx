import { useThemeStore } from "@/store";
import { ThemeContext } from "@shared/lib/theme";
import type { Theme } from "@shared/model/theme";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react"

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const { theme, setTheme } = useThemeStore();
    const [currentTheme, setCurrentTheme] = useState<Exclude<Theme, "system">>("light");

    useEffect(() => {
        if (theme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
            setCurrentTheme(prefersDark ? "dark" : "light");
        } else {
            document.documentElement.setAttribute("data-theme", theme);
            setCurrentTheme(theme);
        }
    }, [theme]);

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