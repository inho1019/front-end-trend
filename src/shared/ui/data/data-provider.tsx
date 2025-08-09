import { DataContext } from "@shared/lib/data";
import type { ParserData } from "@shared/model/parser";
import { useCallback, useEffect, useMemo, useState, useTransition, type PropsWithChildren } from "react"
import { decompressSync, strFromU8 } from 'fflate';
import { useSite } from "@shared/lib/site";

export const DataProvider = ({ children }: PropsWithChildren) => {
    const { favoriteSiteIds } = useSite();

    const [originalData, setOriginalData] = useState<ParserData[] | null>(null);
    const [data, setData] = useState<ParserData[] | null>(null);
    const [search, setSearch] = useState<string>("");
    const [siteIds, setSiteIds] = useState<string[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const [loading, startTransition] = useTransition();

    const handleToggleFavorite= useCallback(() => {
        setIsFavorite(prev => !prev);
    } ,[]);
    
    useEffect(() => {
        const fetchData = async () => {
            startTransition(async () => {
                const params = new URLSearchParams(window.location.search);
                const cache = params.get("cache");

                try {
                    const response = await fetch(import.meta.env.PROD ? './data.json.gz' : './data.json',{
                        cache: cache === "no" ? "no-store" : "default",
                        headers: {
                            "Cache-Control": "public, max-age=10800",
                        },
                    });

                    let jsonData: ParserData[] = []

                    if (import.meta.env.PROD) {
                        const compressed = await response.arrayBuffer();
                        const decompressed = decompressSync(new Uint8Array(compressed));
                        const jsonText = strFromU8(decompressed);
                        jsonData = JSON.parse(jsonText);
                    } else {
                        jsonData = await response.json()
                    }
                    setData(jsonData);
                    setOriginalData(jsonData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setData(null);
                    setOriginalData(null);
                }
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        startTransition(() => {
            if (originalData) {
                const filteredData = originalData?.
                    filter(item =>
                        (isFavorite ? favoriteSiteIds.includes(item.site.id) : true) && (
                            item.title.toLowerCase().includes(search.toLowerCase()) ||
                            item.content.toLowerCase().includes(search.toLowerCase()) ||
                            item.site.name.toLowerCase().includes(search.toLowerCase())
                        ) && (
                            siteIds.length === 0 || siteIds.includes(item.site.id)
                        )
                    );
                setData(filteredData ?? []);
            }
        });
    }, [originalData, search, siteIds, isFavorite, favoriteSiteIds])

    useEffect(() => {
        setSearch("");
    }, [siteIds])

    return (
        <DataContext.Provider value={useMemo(() => ({
            data,
            originalData,
            search,
            setSearch,
            siteIds,
            setSiteIds,
            isFavorite,
            toggleFavorite: handleToggleFavorite,
            loading   
        }), [data, originalData, search, siteIds, isFavorite, handleToggleFavorite, loading])}>
            {children}    
        </DataContext.Provider>
    )
}