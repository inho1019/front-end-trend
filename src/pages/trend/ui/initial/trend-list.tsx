import { LoadingContainer } from "@features/common";
import { EmptyContainer } from "@features/common/ui/empty-container";
import { TrendItem, TrendPanel } from "@features/trend";
import { useData } from "@shared/lib/data";
import { usePanelController } from "@shared/lib/panel";
import type { ParserData } from "@shared/model/parser";
import { useCallback, useState } from "react";


export const TrendList = () => {
    const { data, loading } = useData();
    const [selectedData, setSelectedData] = useState<ParserData | null>(null);

    const { isOpen, openPanel, closePanel } = usePanelController("trend-panel");


    const handleClickItem = useCallback((data: ParserData) => {
        setSelectedData(data);
        if (!isOpen) {
            openPanel();
        }
    }, [isOpen, openPanel]);

    const handleClosePanel = useCallback(() => {
        setSelectedData(null);
        closePanel();
    }, [closePanel]);
    
    return (
        <>
            {
                loading ? (
                    <LoadingContainer /> 
                ) : (
                    !data || data.length <= 0 ? (
                        <EmptyContainer />
                    ) : (
                        <section className="flex flex-col divide-y-1 divide-gray-200 max-xl:pb-50">
                            {
                                data?.map((item, index) => (
                                    <TrendItem 
                                        key={index} 
                                        data={item}
                                        onClick={() => handleClickItem(item)}
                                        className="transition-colors active:bg-gray-50 active:dark:bg-[#222] cursor-pointer py-15 px-10" 
                                    />
                                ))
                            }
                        </section>
                    )
                )
            }
            <TrendPanel isOpen={isOpen} data={selectedData} onClose={handleClosePanel} />
        </>
    );
}