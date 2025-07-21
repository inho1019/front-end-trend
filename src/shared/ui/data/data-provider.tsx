import { DataContext } from "@shared/lib/data";
import type { ParserData } from "@shared/model/parser";
import { useCallback, useEffect, useMemo, useState, useTransition, type PropsWithChildren } from "react"

export const DataProvider = ({ children }: PropsWithChildren) => {
    const [originalData, setOriginalData] = useState<ParserData[] | null>(null);
    const [data, setData] = useState<ParserData[] | null>(null);
    const [loading, startTransition] = useTransition();

    useEffect(() => {
        const fetchData = async () => {
            startTransition(async () => {
                try {
                    const response = await fetch('./data.json');
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

    const handleSearch = useCallback((searchValue: string) => {
        startTransition(() => {
            if (data) {
                const filteredData = originalData?.filter(item =>
                    item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.content.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.site.name.toLowerCase().includes(searchValue.toLowerCase())
                );
                setData(filteredData ?? []);
            }
        });
    }, [data, originalData]);

    return (
        <DataContext.Provider value={useMemo(() => ({
            data,
            handleSearch,
            loading   
        }), [data, handleSearch, loading])}>
            {children}    
        </DataContext.Provider>
    )
}