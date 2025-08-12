import { useTheme } from "@shared/lib/theme";
import Giscus from '@giscus/react';
import { useMemo } from "react";
import { useTrans } from "@shared/lib/utils";
import i18next from "i18next";

export  const Comment = () => {
    const trans = useTrans();
    const { theme } = useTheme();

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
                repo={`${import.meta.env.VITE_GITHUB_OWNER}/${import.meta.env.VITE_TARGET_REPO}`}
                repoId=""
                mapping="number"
                term={import.meta.env.VITE_COMMENT_MAPPING}
                emitMetadata="0"
                reactionsEnabled="0"
                inputPosition="top"
                theme={giscusTheme}
                lang={i18next.language.substring(0, 2)}
            />
        </div>
    )
};
