import { TranslateIcon } from "@shared/assets";
import { useGoogleTranslate } from "@shared/lib/google-translate";
import { twMerge } from "@shared/lib/utils";

interface ToggleTransButtonProps {
    className?: string;
}

export const ToggleTransButton = ({ className }: ToggleTransButtonProps) => {
    const { isEnabled, toggleTranslate } = useGoogleTranslate();

    return (
        <button
            className={twMerge("p-5 bg-white shadow-xl cursor-pointer rounded-full", className)}
            onClick={toggleTranslate}
        >
            <div aria-checked={isEnabled} className="aria-checked:animate-spin duration-500">
                <TranslateIcon />
            </div>
        </button>
    );
}