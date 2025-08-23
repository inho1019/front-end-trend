import { EmptyContainer, LoadingContainer } from "@features/common";
import { TrendItem, TrendPanel } from "@features/trend";
import { useData } from "@shared/lib/data";
import { usePanelController } from "@shared/lib/panel";
import type { ParserData } from "@shared/model/parser";
import { AdSense } from "@shared/ui/common";
import { Fragment, useCallback, useEffect, useState } from "react";


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
    
    useEffect(() => {
        if (!selectedData) {
            closePanel();
        }
    }, [closePanel, selectedData])

    return (
        <>
            {
                loading ? (
                    <LoadingContainer className="pt-70 max-sm:pt-30" /> 
                ) : (
                    !data || data.length <= 0 ? (
                        <EmptyContainer />
                    ) : (
                        <section className="flex flex-col">
                            {
                                data?.map((item, index) => {
const adIndex = index - 4;
return (
                                    <Fragment key={index}>
                                        <TrendItem 
                                            data={item}
                                            onClick={() => handleClickItem(item)}
                                            className="transition active:bg-gray-50 active:dark:bg-[#222] cursor-pointer py-15 px-10 max-sm:px-5 min-sm:hover:not-active:opacity-75" 
                                        />
                                        {
                                            adIndex % 20 === 0 && (
                                                <AdSense />
                                            )
                                        }
                                    </Fragment>
                                )})
                            }
                        </section>
                    )
                )
            }
            <TrendPanel isOpen={isOpen} data={selectedData} onClose={handleClosePanel} />
        </>
    );
}