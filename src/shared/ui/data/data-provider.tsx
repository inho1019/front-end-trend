import { DataContext } from "@shared/lib/data";
import type { ParserData } from "@shared/model/parser";
import { useEffect, useMemo, useState, useTransition, type PropsWithChildren } from "react"

export const DataProvider = ({ children }: PropsWithChildren) => {
    const [originalData, setOriginalData] = useState<ParserData[] | null>(null);
    const [data, setData] = useState<ParserData[] | null>(null);
    const [search, setSearch] = useState<string>("");
    const [siteIds, setSiteIds] = useState<string[]>([]);

    const [loading, startTransition] = useTransition();
    
    useEffect(() => {
        const fetchData = async () => {
            startTransition(async () => {
                const params = new URLSearchParams(window.location.search);
                const cache = params.get("cache");

                try {
                    const response = await fetch('./data.json',{
                        cache: cache === "no" ? "no-store" : "default",
                        headers: {
                            'Content-Type': 'application/json',
                            "Cache-Control": "public, max-age=10800",
                        },
                    });
                    const jsonData: ParserData[] = await response.json();
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
                const filteredData = originalData?.filter(item =>
                    (                        
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
    }, [originalData, search, siteIds])


    return (
        <DataContext.Provider value={useMemo(() => ({
            data,
            originalData,
            search,
            setSearch,
            siteIds,
            setSiteIds,
            loading   
        }), [data, originalData, search, siteIds, loading])}>
            {children}    
        </DataContext.Provider>
    )
}