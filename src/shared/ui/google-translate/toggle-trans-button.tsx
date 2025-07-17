import { TranslateIcon } from "@shared/assets";
import { useGoogleTranslate } from "@shared/lib/google-translate";
import { twMerge } from "@shared/lib/utils/tw-merge";

interface ToggleTransButtonProps {
    className?: string;
}

export const ToggleTransButton = ({ className }: ToggleTransButtonProps) => {
    const { isEnabled, toggleTranslate } = useGoogleTranslate();

    return (
        <button
            aria-checked={isEnabled}
            className={twMerge("p-5 bg-white shadow-xl cursor-pointer rounded-full aria-checked:animate-pulse", className)}
            onClick={toggleTranslate}
        >
            <TranslateIcon />
        </button>
    );
}