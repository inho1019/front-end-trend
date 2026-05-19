import { twMerge } from "@shared/lib/utils";
import type { ReactNode } from "react"

interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    label?: ReactNode;
    className?: string;
    switchClassName?: string;
}

export const ToggleSwitch = ({ checked, onChange, label, className, switchClassName }: ToggleSwitchProps) => {

    return (
        <label className={twMerge("flex items-center cursor-pointer", className)}>
            {label}
            <input
                checked={checked}
                onChange={() => onChange()}
                type="checkbox"
                className="sr-only peer"
            />
            <div className={twMerge(
                    "relative w-32 h-18 bg-gray-200 rounded-full dark:bg-[#333]",
                    "after:content-[''] after:absolute after:top-2 after:left-2 after:bg-white dark:after:bg-black after:rounded-full after:size-14 after:transition-transform",
                    "peer-checked:after:translate-x-full peer-checked:after:bg-current",
                    switchClassName,
                )}/>
        </label>
    )
}
