import { ThemeContext } from "@shared/lib/theme";
import type { Theme } from "@shared/model/theme";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react"

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const getInitialTheme = () => {
        const localTheme = window.localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return (localTheme ?? (prefersDark ? "dark" : "light")) as Theme;
    }

    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        if (theme === "system") {
            window.localStorage.removeItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
        } else {
            window.localStorage.setItem("theme", theme);
            document.documentElement.setAttribute("data-theme", theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={useMemo(() => ({
            theme,
            setTheme,
        }), [theme])}>
            {children}    
        </ThemeContext.Provider>
    )
}