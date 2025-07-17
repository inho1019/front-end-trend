import { useEffect, useState, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

interface PanelProps extends PropsWithChildren{
    isOpen: boolean;
    position: "left" | "right" | "top" | "bottom";
    className?: string;
}

export const Panel = ({ isOpen, position, children, className }: PanelProps) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setOpen(true);
        } else {
            setTimeout(() => setOpen(false), 1000); 
        }
    }, [isOpen]);

    if (!open) {
        return null;
    }

    return (
        createPortal(
            <div className={
                twMerge(
                    "fixed z-10",
                    position === "left" && ("left-0 top-0" + (isOpen && " animate-fade-left") + (!isOpen && " animate-fade-right")),
                    position === "right" && ("right-0 top-0" + (isOpen && " animate-fade-right") + (!isOpen && " animate-fade-left")),
                    position === "top" && ("top-0 left-0" + (isOpen && " animate-fade-down") + (!isOpen && " animate-fade-up")),
                    position === "bottom" && ("bottom-0 left-0" + (isOpen && " animate-fade-up") + (!isOpen && " animate-fade-down")),
                    className
                )
            }>
                {children}
            </div>,
            document.body
        )
    );
}