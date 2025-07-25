import { LoadingContainer } from "@features/common";
import { EmptyContainer } from "@features/common/ui/empty-container";
import { SiteItem } from "@features/site";
import { getData } from "@shared/api";
import type { Site } from "@shared/model/site";
import { useEffect, useState, useTransition } from "react";

export const SiteList = () => {
    const [loading, startTransition] = useTransition();
    const [sites, setSites] = useState<Site[] | null>(null);

    useEffect(() => {
        startTransition(async() => {
            try {
                const { data } = await getData<Site>(import.meta.env.VITE_TARGET_PATH_SITE);
                if (data) {
                    setSites(data);
                }
            } catch (error) {
                console.error("Error fetching sites:", error);
                setSites(null);
            }
        });
    }, []);

    return (
        <>
            {
                loading ? (
                    <LoadingContainer /> 
                ) : (
                    !sites || sites.length <= 0 ? (
                        <EmptyContainer />
                    ) : (
                        <section className="flex flex-col divide-y-1 divide-gray-200 max-xl:pb-50">
                            {
                                sites?.map(item => (
                                    <SiteItem
                                        key={item.id}
                                        data={item}
                                        to={item.link ?? item.url}
                                        target="_blank"
                                        className="px-5 py-15"
                                    />
                                ))
                            }
                        </section>
                    )
                )
            }
        </>
    );
}