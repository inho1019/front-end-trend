import { LoadingContainer } from "@features/common";
import { EmptyContainer } from "@features/common/ui/empty-container";
import { SiteItem } from "@features/site";
import { useSite } from "@shared/lib/site";

export const SiteList = () => {
    const { data, loading } = useSite();

    return (
        <>
            {
                loading ? (
                    <LoadingContainer /> 
                ) : (
                    !data || data.length <= 0 ? (
                        <EmptyContainer />
                    ) : (
                        <section className="flex flex-col">
                            {
                                data?.map(item => (
                                    <SiteItem
                                        key={item.id}
                                        data={item}
                                        to={item.link ?? item.url}
                                        target="_blank"
                                        className="transition active:bg-gray-50 active:dark:bg-[#222] px-5 py-15 min-sm:hover:not-active:opacity-80"
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