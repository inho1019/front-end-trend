import { TranslateIcon } from "@shared/assets";
import { twMerge } from "@shared/lib/utils";
import { Button } from "@shared/ui/common";
import { useGoogleTranslate } from "../lib/use-google-translate";
import type { HTMLAttributes } from "react";

interface GoogleTranslateButtonProps extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export const GoogleTranslateButton = ({ className, ...props }: GoogleTranslateButtonProps) => {
    const { isEnabled, toggleTranslate } = useGoogleTranslate();

    return (
        <Button
            className={twMerge("flex items-center justify-center size-38 bg-white border dark:bg-dark cursor-pointer rounded-full", className)}
            onClick={toggleTranslate}
            {...props}
        >
            <div aria-checked={isEnabled} className="aria-checked:animate-spin duration-500">
                <TranslateIcon />
            </div>
        </Button>
    );
}