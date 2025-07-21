import { MenuIcon } from "@shared/assets";
import { twMerge } from "@shared/lib/utils";
import { useState } from "react";
import { SettingsPanel } from "../common";

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
    const [isOpenSettings, setIsOpenSettings] = useState(false);

    return (
        <>
            <header className={twMerge("z-5 w-full fixed flex top-0 items-center justify-between p-10 bg-white shadow-md", className)}>
                {left ?? (
                    <div className="flex flex-row items-center gap-5">
                        <button onClick={() => setIsOpenSettings(true)} className="cursor-pointer">
                            <MenuIcon />
                        </button>
                        <div className="text-lg font-bold">FE Magazine</div>
                    </div>
                )}
                {center}
                {right}
            </header>
            <SettingsPanel isOpen={isOpenSettings} onClose={() => setIsOpenSettings(false)} />
        </>
    )
}