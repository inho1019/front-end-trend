import type { ParserData } from "@shared/model/parser";
import { twMerge } from "@shared/lib/utils";
import { DateTime } from "luxon";
import { useSite } from "@shared/lib/site";
import { useMemo } from "react";
import { Logo } from "@shared/assets";

interface TrendItemProps extends React.HTMLAttributes<HTMLDivElement> {
    data: ParserData;
}

export const TrendItem = ({ data, ...props }: TrendItemProps) => {
    const { data: siteData } = useSite()

    const image = useMemo(() => {
        const site = siteData?.find(site => site.id === data.site.id)
        return site?.image ?? `${site?.link}/favicon.ico`
    }, [data.site.id, siteData])

    return (
        <div {...props} draggable={false} className={twMerge("space-y-4", props.className)}>
            <div className="flex flex-row gap-5">
                <div className="flex justify-center items-center text-xs size-16 rounded-xs overflow-hidden bg-gray-100 dark:bg-[#222]">
                    <img src={image ?? Logo} className="size-full object-cover" onError={e => e.currentTarget.src = Logo} />
                </div>
                <p className="text-xs text-gray-500 font-medium">{data.site.name}</p> 
            </div>
            <h2 className="text-xl font-semibold line-clamp-2 leading-24 max-sm:text-lg max-sm:leading-22">{data.title}</h2>
            <div className="mt-16 flex text-[10px] text-gray-400">
          <p className="max-w-1/2 truncate">{data?.author || "Unknown"}</p><p>&nbsp;|&nbsp;{DateTime.fromISO(data.createdAt).toFormat("yyyy. MM. dd")}</p>

</div> 
        </div>
    );
}