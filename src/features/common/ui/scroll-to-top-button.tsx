import { ArrowIconThin } from "@shared/assets";
import { twMerge } from "@shared/lib/utils";
import { Button } from "@shared/ui/common";
import type { HTMLAttributes, RefObject } from "react";
import { createPortal } from "react-dom";

interface ScrollToTopButtonProps extends HTMLAttributes<HTMLButtonElement> {
    scrollRef: RefObject<HTMLElement | null>;
    className?: string;
}

export const ScrollToTopButton = ({ scrollRef, className, ...props }: ScrollToTopButtonProps) => {
    return (
        createPortal(
            <Button
                className={twMerge("flex items-center justify-center size-38 bg-white border dark:bg-dark cursor-pointer rounded-full", className)}
                onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                {...props}
            >
                <div className="rotate-90">
                    <ArrowIconThin />
                </div>
            </Button>
        , document.body)
            
    );
}
