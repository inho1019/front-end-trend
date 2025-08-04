import { getData } from "@shared/api";
import { SiteContext } from "@shared/lib/site";
import type { Site } from "@shared/model/site";
import { useEffect, useMemo, useState, useTransition, type PropsWithChildren } from "react"

export const SiteProvider = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState<Site[] | null>(null);

    const [loading, startTransition] = useTransition();
    
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
            loading,
        }), [data, loading])}>
            {children}    
        </SiteContext.Provider>
    )
}