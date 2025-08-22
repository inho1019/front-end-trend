import { ArchiveItem } from "@features/archive";
import { EmptyContainer, LoadingContainer } from "@features/common";
import { getContent } from "@shared/api";
import type { ArchiveResponse } from "@shared/model/archive";
import { useEffect, useState } from "react";

export const ArchiveList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ArchiveResponse[] | null>(null);

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
                                    <ArchiveItem key={item.path} data={item} className="transition active:bg-gray-50 active:dark:bg-[#222] cursor-pointer py-10 px-10 max-sm:px-5 min-sm:hover:not-active:opacity-75" />
                                ))
                            }
                        </section>
                    )
                )
            }
        </>
    );
}