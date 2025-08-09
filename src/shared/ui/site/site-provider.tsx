import { getData } from "@shared/api";
import { SiteContext } from "@shared/lib/site";
import type { Site } from "@shared/model/site";
import { useCallback, useEffect, useMemo, useState, useTransition, type PropsWithChildren } from "react"

export const SiteProvider = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState<Site[] | null>(null);
    const [favoriteSiteIds, setFavoriteSiteIds] = useState<string[]>(() => {
        const stored = localStorage.getItem("favoriteSiteIds");
        return stored ? JSON.parse(stored) : [];
    });

    const [loading, startTransition] = useTransition();

    const handleToggleFavoriteSite = useCallback((siteId: string) => {
        setFavoriteSiteIds((prev) => {
            let updated;
            if (prev.includes(siteId)) {
                updated = prev.filter((id) => id !== siteId);
            } else {
                updated = [...prev, siteId];
            }
            localStorage.setItem("favoriteSiteIds", JSON.stringify(updated));
            return updated;
        });
    }, []);

    useEffect(() => {
        startTransition(async () => {
            try {
                const { data } = await getData<Site>(import.meta.env.VITE_TARGET_PATH_SITE);
                if (data) {
                    setData(data);
                }
            } catch (error) {
                console.error("Error fetching sites:", error);
                setData(null);
            }
        });
    }, []);

    return (
        <SiteContext.Provider value={useMemo(() => ({
            data,
            favoriteSiteIds,
            toggleFavoriteSite: handleToggleFavoriteSite,
            loading,
        }), [data, favoriteSiteIds, handleToggleFavoriteSite, loading])}>
            {children}    
        </SiteContext.Provider>
    )
}