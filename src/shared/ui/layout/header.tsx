import { MenuIcon } from "@shared/assets";
import { twMerge } from "@shared/lib/utils";
import { useCallback, useMemo } from "react";
import { SettingsPanel } from "../common";
import { useSearchParams } from "react-router";

interface HeaderProps {
    className?: string;
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

export const Header = ({ 
    className, 
    left,
    center,
    right, 
}: HeaderProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const isPanelOpen = useMemo(() => searchParams.get("setting-panel") === "true", [searchParams]);

    const handleOpenPanel = useCallback(() => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("setting-panel", "true");
            return params;
        });
    }, [setSearchParams]);

    const handleClosePanel = useCallback(() => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.delete("setting-panel");
            return params;
        });
    }, [setSearchParams]);

    return (
        <>
            <header className={twMerge("z-5 w-full fixed flex top-0 items-center justify-between p-10 bg-white shadow-md", className)}>
                {left ?? (
                    <div className="flex flex-row items-center gap-5">
                        <button onClick={handleOpenPanel} className="cursor-pointer">
                            <MenuIcon />
                        </button>
                        <div className="text-lg font-bold">FE Trend</div>
                    </div>
                )}
                {center}
                {right}
            </header>
            <SettingsPanel isOpen={isPanelOpen} onClose={handleClosePanel} />
        </>
    )
}