import { type PropsWithChildren, type RefObject } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

interface PanelProps extends PropsWithChildren{
    isOpen: boolean;
    position: "left" | "right" | "top" | "bottom";
    ref?: RefObject<HTMLDivElement | null>;
    className?: string;
}

export const Panel = ({ isOpen, position, children, ref, className }: PanelProps) => {
    if (!isOpen) return null;

    return (
        createPortal(
            <div ref={ref} className={
                twMerge(
                    "fixed z-10 animate-duration-400",
                    position === "left" && "left-0 top-0 animate-fade-right",
                    position === "right" && "right-0 top-0 animate-fade-left",
                    position === "top" && "top-0 left-0 animate-fade-down",
                    position === "bottom" && "bottom-0 left-0 animate-fade-up",
                    className
                )
            }>
                {children}
            </div>,
            document.body
        )
    );
}