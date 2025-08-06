import { TranslateIcon } from "@shared/assets";
import { useGoogleTranslate } from "@shared/lib/google-translate";
import { twMerge } from "@shared/lib/utils";
import { Button } from "../common";

interface ToggleTransButtonProps {
    className?: string;
}

export const ToggleTransButton = ({ className }: ToggleTransButtonProps) => {
    const { isEnabled, toggleTranslate } = useGoogleTranslate();

    return (
        <Button
            className={twMerge("flex items-center justify-center size-38 bg-white border cursor-pointer rounded-full", className)}
            onClick={toggleTranslate}
        >
            <div aria-checked={isEnabled} className="text-black aria-checked:animate-spin duration-500">
                <TranslateIcon />
            </div>
        </Button>
    );
}