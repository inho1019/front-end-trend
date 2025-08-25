import { ArchiveItem, ArchivePanel } from "@features/archive";
import { EmptyContainer, LoadingContainer } from "@features/common";
import { getContent } from "@shared/api";
import { usePanelController } from "@shared/lib/panel";
import type { ArchiveResponse } from "@shared/model/archive";
import { useCallback, useEffect, useState } from "react";

export const ArchiveList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ArchiveResponse[] | null>(null);

    const [selectedData, setSelectedData] = useState<string | null>(null);

    const { isOpen, openPanel, closePanel } = usePanelController("archive-panel");


    const handleClickItem = useCallback((path: string) => {
        setSelectedData(path);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getContent("public/archive", { ref: import.meta.env.VITE_ARCHIVE_REPO });
                setData(response.originalResponse as ArchiveResponse[]);
            } catch (error) {
                console.error("Failed to fetch archive data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

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
                                data?.map(item => (
                                    <ArchiveItem 
                                        key={item.path} 
                                        data={item} 
                                        onClick={() => handleClickItem(item.path)}
                                        className="transition active:bg-gray-50 active:dark:bg-[#222] cursor-pointer p-15 max-sm:px-5 min-sm:hover:not-active:opacity-75 max-sm:py-10" 
                                    />
                                ))
                            }
                        </section>
                    )
                )
            }
            <ArchivePanel isOpen={isOpen} path={selectedData} onClose={handleClosePanel} />
        </>
    );
}