/* eslint-disable @typescript-eslint/no-explicit-any */
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
        googleTranslator?: any;
    }
}


export const GoogleTranslateProvider = ({ children }: PropsWithChildren) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleTranslate = useCallback(() => !loading && setIsEnabled(prev => !prev), [loading]);

    useEffect(() => {
        if (!isEnabled) return;
        setLoading(true);
        const langCode = i18next.language.split("-")[0];
        const googleTranslateScript = document.getElementById('google-translate-script');
        const googleTranslateElement = document.getElementById('google_translate_element');

        const handleChangeLanguage = () => {
            const select = document.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
            if (select) {
                select.value = langCode;
                select.dispatchEvent(new Event('change'));
            }
            setLoading(false);
        }

        if (!window.googleTranslateElementInit) {
            window.googleTranslateElementInit = () => {
                window.googleTranslator = new window.google!.translate.TranslateElement(
                    {
                        autoDisplay: true 
                    },
                    'google_translate_element'
                );
            };
        }
        if (!googleTranslateElement) {
            const translateElement = document.createElement('div');
            translateElement.id = 'google_translate_element';
            document.body.appendChild(translateElement);
        }

        if (!googleTranslateScript) {
            const script = document.createElement('script');
            script.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
            script.id = 'google-translate-script';
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                setTimeout(() => {
                    handleChangeLanguage()
                }, 1000);
            };
        } else {
            handleChangeLanguage();
        }

        return () => {         
            try {                
                if (window.googleTranslator) {
                    Object.keys(window.googleTranslator).forEach((k) => {
                        if (typeof window.googleTranslator[k]?.restore === 'function') {
                            window.googleTranslator[k].restore();
                        }
                    });
                }
            } catch (error) {
                console.error("Error restoring Google Translate:", error);
                googleTranslateScript?.remove();
                googleTranslateElement?.remove();
                window.googleTranslateElementInit = undefined;
                window.googleTranslator = undefined;
            }  finally {
                document.cookie = "googtrans=";
            }
        }
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