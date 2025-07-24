import { useData } from "@shared/lib/data";
import { twMerge, useTrans } from "@shared/lib/utils";
import type { Site } from "@shared/model/site";
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
        <Link {...props} className={twMerge("hover:bg-gray-100 hover:dark:bg-[#222] transition-colors active:bg-gray-50 hover:active:dark:bg-[#212121]", props.className)}>
            <h3 className="text-xl font-bold">{data.name}</h3>
            <button
                onClick={handleClickFeedCount}
                className="text-sm/tight cursor-pointer font-medium underline active:opacity-70 transition-opacity"
            >
                {trans("console.feedCount",`피드 ${feedCount}개`, feedCount)}
            </button>
            <p className="text-md text-gray-700 p-5 pb-0 dark:text-gray-300">{data.description}</p>
        </Link>
    );
}