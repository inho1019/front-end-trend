import { LoadingContainer } from "@features/common";
import { EmptyContainer } from "@features/common/ui/empty-container";
import { TrendItem, TrendPanel } from "@features/trend";
import { useData } from "@shared/lib/data";
import type { ParserData } from "@shared/model/parser";
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router";


export const TrendList = () => {
    const { data, loading } = useData();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedData, setSelectedData] = useState<ParserData | null>(null);

    const isPanelOpen = useMemo(() => searchParams.get("trend-panel") === "true", [searchParams]);

    const handleClickItem = useCallback((data: ParserData) => {
        setSelectedData(data);
        if (!isPanelOpen) {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("trend-panel", "true");
                return params;
            });
        }
    }, [isPanelOpen, setSearchParams]);

    const handleClosePanel = useCallback(() => {
        setSelectedData(null);
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.delete("trend-panel");
            return params;
        });
    }, [setSearchParams]);
    
    return (
        <>
            {
                loading ? (
                    <LoadingContainer className="pb-40" /> 
                ) : (
                    !data || data.length <= 0 ? (
                        <EmptyContainer className="pb-40" />
                    ) : (
                        <section className="flex flex-col divide-y-1 divide-gray-200">
                            {
                                data?.map((item, index) => (
                                    <TrendItem 
                                        key={index} 
                                        data={item}
                                        onClick={() => handleClickItem(item)}
                                        className="cursor-pointer py-15 px-10" 
                                    />
                                ))
                            }
                        </section>
                    )
                )
            }
            <TrendPanel isOpen={isPanelOpen} data={selectedData} onClose={handleClosePanel} />
        </>
    );
}