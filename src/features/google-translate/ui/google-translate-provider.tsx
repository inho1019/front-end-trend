/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from "react"
import i18next from "i18next";
import { GoogleTranslateContext } from "../lib/use-google-translate-context";

declare global {
    interface Window {
        googleTranslator?: any;
    }
}

export const GoogleTranslateProvider = ({ children }: PropsWithChildren) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleTranslate = useCallback(() => setIsEnabled(prev => !prev), []);

    useEffect(() => {
        if (isEnabled) {
            const langCode = i18next.language.split("-")[0];

            const select = document.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
            if (select) {
                select.value = langCode;
                select.dispatchEvent(new Event('change'));
            }
        } else {
            try {                
                if (window.googleTranslator) {
                    Object.keys(window.googleTranslator).forEach((k) => {
                        if (typeof window.googleTranslator[k]?.restore === 'function') {
                            window.googleTranslator[k].restore();
                        }
                    });
                }
                document.cookie = "googtrans=";
            } catch (error) {
                console.error("Error restoring Google Translate:", error);
                window.location.reload();
            }
        };
    }, [isEnabled]);

    return (
        <GoogleTranslateContext.Provider value={
            useMemo(() =>
                ({ toggleTranslate, setIsEnabled, isEnabled })
                , [toggleTranslate, setIsEnabled, isEnabled]
            )}>
            {children}    
        </GoogleTranslateContext.Provider>
    )
}