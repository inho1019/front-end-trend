import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useTrans = () => {
    const { t } = useTranslation();
    const trans = useCallback(
        (key: string, defaultValue: string, count?: number) => {
            return t(key, { defaultValue, count });
        },
        [t]
    );
    return trans;
};
