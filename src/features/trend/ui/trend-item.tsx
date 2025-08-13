import type { ParserData } from "@shared/model/parser";
import { twMerge, useTrans } from "@shared/lib/utils";
import { DateTime } from "luxon";
import { useSite } from "@shared/lib/site";
import { useMemo } from "react";
import { Logo } from "@shared/assets";

interface TrendItemProps extends React.HTMLAttributes<HTMLDivElement> {
    data: ParserData;
}

export const TrendItem = ({ data, ...props }: TrendItemProps) => {
    const { data: siteData } = useSite()
    const trans = useTrans();

    const image = useMemo(() => {
        const site = siteData?.find(site => site.id === data.site.id)
        return site?.image ?? `${site?.link}/favicon.ico`
    }, [data.site.id, siteData])

    return (
        <div {...props} draggable={false} className={twMerge("space-y-5", props.className)}>
            <div className="flex flex-row gap-5">
                <div className="flex justify-center items-center text-xs size-16 rounded-xs overflow-hidden bg-gray-100 dark:bg-[#222]">
                    <img src={image ?? Logo} className="size-full object-cover" onError={e => e.currentTarget.src = Logo} />
                </div>
                <p className="text-xs text-gray-500 font-medium">{data.site.name}</p> 
            </div>
            <h2 className="text-xl font-semibold line-clamp-2 leading-24 max-sm:text-lg max-sm:leading-22">{data.title}</h2>
            <p className="text-sm text-gray-700 font-light dark:text-gray-300">{trans("trend.createdAt", "작성일")} {DateTime.fromISO(data.createdAt).toFormat("yyyy.MM.dd HH:mm")}</p> 
        </div>
    );
}