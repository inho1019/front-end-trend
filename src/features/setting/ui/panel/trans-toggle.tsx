import { TranslateSmallIcon } from "@shared/assets";
import { useGoogleTranslate } from "@shared/lib/google-translate";
import { ToggleLayout } from "./toggle-layout";

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