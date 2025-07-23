import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { ToggleLayout } from "./toggle-layout";
import { useGoogleTranslate } from "@shared/lib/google-translate";

export const LocaleToggle = () => {
    const { i18n } = useTranslation();
    const { setIsEnabled } = useGoogleTranslate();


    const handleChangeLocale = useCallback(
        (localeCode: string) => {
            i18n.changeLanguage(localeCode);
            setIsEnabled(false);
        },
        [i18n],
    );

    return (
        <ToggleLayout as="select" value={i18n.language.substring(0, 2)} onChange={(e) => handleChangeLocale(e.target.value)} className="outline-none text-center">
            <option value="ko">&nbsp;&nbsp;🇰🇷&nbsp;&nbsp;</option>
            <option value="en">&nbsp;&nbsp;🇺🇸&nbsp;&nbsp;</option>
        </ToggleLayout>
    )
}