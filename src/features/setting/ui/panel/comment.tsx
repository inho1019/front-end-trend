import { useTheme } from "@shared/lib/theme";
import Giscus from '@giscus/react';
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTrans } from "@shared/lib/utils";

export  const Comment = () => {
    const trans = useTrans();
    const { theme } = useTheme();
    const { i18n } = useTranslation();

    const giscusLanguage = useMemo(() => i18n.language.slice(0, 2), [i18n.language]);
    const giscusTheme = useMemo(() => {
        switch (theme) {
            case "dark":
                return "dark";
            case "light":
                return "light";
            default: 
                return "preferred_color_scheme";
        }
    }, [theme]);

    return (
        <div className="space-y-10">
            <h2 className="text-lg font-bold">
                {trans("settings.comment", "의견 및 건의사항")}
            </h2>
            <Giscus
                id="comments"
                repo="inho1019/front-end-trend"
                repoId=""
                mapping="number"
                term="19"
                emitMetadata="0"
                reactionsEnabled="0"
                inputPosition="top"
                theme={giscusTheme}
                lang={giscusLanguage}
            />
        </div>
    )
};
