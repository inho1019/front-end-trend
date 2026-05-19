import { useTheme } from "@shared/lib/theme";
import type { Theme } from "@shared/model/theme";
import { ToggleLayout } from "./toggle-layout";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <ToggleLayout as="select" value={theme} onChange={(e) => setTheme(e.target.value as Theme)} className="outline-none text-black">
            <option value="dark">🌙</option>
            <option value="light">☀️</option>
            <option value="system">🖥️</option>
        </ToggleLayout>
    )
}