import { DataContext } from "@shared/lib/data";
import type { ParserData } from "@shared/model/parser";
import { useEffect, useState, useTransition, type PropsWithChildren } from "react"

export const DataProvider = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState<ParserData[] | null>(null);
    const [loading, startTransition] = useTransition();

    useEffect(() => {
        const fetchData = async () => {
            startTransition(async () => {
                try {
                    const response = await fetch('./data.json');
                    const jsonData: ParserData[] = await response.json();
                    setData(jsonData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setData(null);
                }
            });
        };
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={data}>
            {loading && <div>Loading...</div>}
            {children}    
        </DataContext.Provider>
    )
}