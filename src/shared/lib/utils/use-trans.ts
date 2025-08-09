import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useTrans = () => {
    const { t } = useTranslation();
    const trans = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key: string, defaultValue: string, count?: number, replace?: Record<string, any>) => {
            return t(key, { defaultValue, count, replace });
        },
        [t]
    );
    return trans;
};
