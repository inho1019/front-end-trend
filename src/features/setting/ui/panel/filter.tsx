import { getData } from "@shared/api";
import { ResetIcon } from "@shared/assets";
import { useData } from "@shared/lib/data";
import { useTrans } from "@shared/lib/utils";
import type { Site } from "@shared/model/site";
import { useCallback, useEffect, useState } from "react";

export const Filter = () => {
    const trans = useTrans();
    const { siteIds, setSiteIds } = useData();
    const [sites, setSites] = useState<Site[] | null>(null);

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const { data } = await getData<Site>(import.meta.env.VITE_TARGET_PATH_SITE);
                if (data) {
                    setSites(data);
                }
            } catch (error) {
                console.error("Error fetching sites:", error);
                setSites(null);
            }
        };
        fetchSites();
    }, []);

    const handleCheckboxChange = useCallback((siteId: string) => {
        if (siteIds.includes(siteId)) {
            setSiteIds(siteIds.filter(id => id !== siteId));
        } else {
            setSiteIds([...siteIds, siteId]);
        }
    }, [setSiteIds, siteIds]);

    const handleReset = useCallback(() => {
        setSiteIds([]);
    }, [setSiteIds]);

    return (
        <div className="space-y-10">
            <div className="flex flex-row items-end justify-between">                
                <h2 className="text-lg font-bold">
                    {trans("settings.filter", "필터")}
                </h2>
                <button onClick={handleReset} className="cursor-pointer flex flex-row gap-2 items-center text-sm text-gray-800 dark:text-gray-200 active:opacity-70 transition-opacity">
                    <ResetIcon />
                    {trans("settings.reset", "초기화")}
                </button>
            </div>
            <div className="space-y-2">
                {sites?.map(site => (
                    <label key={site.id} className="flex text-sm text-gray-700 font-medium gap-5 items-center break-all line-clamp-1 dark:text-gray-300">
                        <input
                            type="checkbox"
                            value={site.id}
                            checked={siteIds.includes(site.id)}
                            onChange={() => handleCheckboxChange(site.id)}
                        />
                        {site.name}
                    </label>
                ))}
            </div>
        </div>
    )
}