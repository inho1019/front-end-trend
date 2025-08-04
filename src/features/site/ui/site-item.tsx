import { useData } from "@shared/lib/data";
import { twMerge, useTrans } from "@shared/lib/utils";
import type { Site } from "@shared/model/site";
import { Button } from "@shared/ui/common";
import { useCallback, useMemo } from "react";
import { Link, useNavigate, type LinkProps } from "react-router";

interface SiteItemProps extends LinkProps {
    data: Omit<Site, "type">;
}

export const SiteItem = ({ data, ...props }: SiteItemProps) => {
    const trans = useTrans();
    const navigate = useNavigate();
    const { originalData, setSiteIds } = useData();
    const feedCount = useMemo(() => originalData?.filter(item => item.site.id === data.id).length ?? 0, [originalData, data.id]);


    const handleClickFeedCount = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSiteIds([data.id]);
        navigate("/");
    }, [data.id, setSiteIds, navigate]);

    return (
        <Link {...props} draggable={false} className={twMerge("flex flex-row gap-10 transition-colors active:bg-gray-50 active:dark:bg-[#222]", props.className)}>
            <div className="flex items-center justify-center text-xs font-medium bg-gray-100 size-74 rounded-sm dark:bg-[#222] overflow-hidden empty:after:content-['NO-IMAGE']">
                {
                    data.image && (
                        <img src={data.image} className="size-full object-cover" />
                    )
                }
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold max-sm:text-lg">{data.name}</h3>
                <Button
                    onClick={handleClickFeedCount}
                    className="text-sm/tight font-medium underline active:opacity-50"
                >
                    {trans("site.feedCount",`피드 ${feedCount}개`, feedCount)}
                </Button>
                <p className="text-[0.9375rem] leading-19 text-gray-700 p-2 pb-0 dark:text-gray-300">{data.description}</p>
            </div>
        </Link>
    );
}