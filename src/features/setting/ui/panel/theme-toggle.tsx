import { useTheme } from "@shared/lib/theme";
import type { Theme } from "@shared/model/theme";
import { ToggleLayout } from "./toggle-layout";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <ToggleLayout as="select" value={theme} onChange={(e) => setTheme(e.target.value as Theme)} className="outline-none text-center text-black">
            <option value="dark">&nbsp;&nbsp;🌙&nbsp;&nbsp;</option>
            <option value="light">&nbsp;&nbsp;☀️&nbsp;&nbsp;</option>
            <option value="system">&nbsp;&nbsp;🖥️&nbsp;&nbsp;</option>
        </ToggleLayout>
    )
}