import { TranslateSmallIcon } from "@shared/assets";
import { ToggleLayout } from "./toggle-layout";
import { useGoogleTranslate } from "@features/google-translate";

export const TransToggle = () => {
    const { isEnabled, toggleTranslate } = useGoogleTranslate();

    return (
        <ToggleLayout 
            role="button"
            onClick={toggleTranslate}
        >
            <div aria-checked={isEnabled} className="aria-checked:animate-spin">
                <TranslateSmallIcon />
            </div>
        </ToggleLayout>
    );
}