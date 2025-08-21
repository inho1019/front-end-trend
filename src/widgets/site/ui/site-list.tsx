import { EmptyContainer, LoadingContainer } from "@features/common";
import { SiteItem } from "@features/site";
import { useSite } from "@shared/lib/site";

export const SiteList = () => {
    const { data, loading } = useSite();

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
                                    <SiteItem
                                        key={item.id}
                                        data={item}
                                        to={item.link ?? item.url}
                                        target="_blank"
                                        className="transition active:not-[&:has(button:hover)]:bg-gray-50 active:not-[&:has(button:hover)]:dark:bg-[#222] px-5 py-15 min-sm:hover:not-active:not-[&:has(button:hover)]:opacity-80"
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