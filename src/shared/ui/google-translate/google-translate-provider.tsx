import { GoogleTranslateContext } from "@shared/lib/google-translate";
import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from "react"
import i18next from "i18next";

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: {
            translate: {
                TranslateElement: new (options: object, elementId: string) => any;
            };
        };
    }
}


export const GoogleTranslateProvider = ({ children }: PropsWithChildren) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleTranslate = useCallback(() => setIsEnabled(prev => !prev), []);

    useEffect(() => {
        if (!isEnabled) return;
        const langCode = i18next.language.split("-")[0];

        window.googleTranslateElementInit = () => {
            if (window.google?.translate) {
                new window.google.translate.TranslateElement(
                    {
                        autoDisplay: true 
                    },
                    "google_translate_element"
                );
            }
        };

        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        const handleChangeLanguage = (language = "") => {
            const select = document.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
            if (select) {
                select.value = language;
                select.dispatchEvent(new Event('change'));
            }
        }
        
        setTimeout(() => {
            handleChangeLanguage(langCode);
        }, 1000)
        return () => {
           window.location.reload();
        };
    }, [isEnabled]);

    return (
        <GoogleTranslateContext.Provider value={
            useMemo(() => 
                ({toggleTranslate, setIsEnabled, isEnabled})
                , [toggleTranslate, setIsEnabled, isEnabled]
            )}>
            {children}    
        </GoogleTranslateContext.Provider>
    )
}