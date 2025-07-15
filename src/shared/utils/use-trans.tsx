import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const useTrans = () => {
    const { t } = useTranslation();
    const trans = useCallback(
        (key: string, defaultValue: string) => {
            return t(key, { defaultValue });
        },
        [t]
    );
    return { trans }
};

export default useTrans;