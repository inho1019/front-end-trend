import { useFavoriteStore } from "@/store";
import { ResetIconSmall } from "@shared/assets";
import { useData } from "@shared/lib/data";
import { useSite } from "@shared/lib/site";
import { useTrans } from "@shared/lib/utils";
import { Button, Spinner } from "@shared/ui/common";
import { useCallback, useMemo } from "react";

export const Filter = () => {
    const trans = useTrans();
    const { siteIds, setSiteIds, isFavorite } = useData();
    const { data, loading } = useSite();
    const { favoriteSiteIds } = useFavoriteStore();

    const filteredData = useMemo(() => data?.filter(site => isFavorite ? favoriteSiteIds.includes(site.id) : true) || [], [data, isFavorite, favoriteSiteIds]);

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
                <Button onClick={handleReset} className="flex flex-row gap-2 items-center text-sm text-gray-800 dark:text-gray-200">
                    <ResetIconSmall />
                    {trans("settings.reset", "초기화")}
                </Button>
            </div>
            <div className="space-y-2 pb-5">
                {
                    loading ? (
                        <div className="flex items-center justify-center h-100">
                            <Spinner className="size-32 border-4" />
                        </div>
                    ) : (
                        data && (
                            filteredData.length > 0 ? (
                                filteredData
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map(site => (
                                        <label key={site.id} className="flex text-sm text-gray-700 font-medium gap-5 items-center break-all line-clamp-1 dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                value={site.id}
                                                checked={siteIds.includes(site.id)}
                                                onChange={() => handleCheckboxChange(site.id)}
                                            />
                                            {site.name}
                                        </label>
                                    ))
                            ) : (
                                <div className="px-5 text-sm text-gray-400 font-medium">
                                    {trans("common.noData", "데이터를 찾을 수 없습니다")}
                                </div>
                            )
                        )
                    )
                }
            </div>
        </div>
    )
}