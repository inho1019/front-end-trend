import type { ParserData } from "@shared/model/parser";
import { twMerge, useTrans } from "@shared/lib/utils";
import { DateTime } from "luxon";

interface TrendItemProps extends React.HTMLAttributes<HTMLDivElement> {
    data: ParserData;
}

export const TrendItem = ({ data, ...props }: TrendItemProps) => {
    const trans = useTrans();

    return (
        <div {...props} draggable={false} className={twMerge("space-y-5", props.className)}>
            <p className="text-xs text-gray-500 font-medium">{data.site.name}</p> 
            <h2 className="text-xl font-semibold line-clamp-2 leading-24">{data.title}</h2>
            <p className="text-sm text-gray-700 font-light dark:text-gray-300">{trans("trend.createdAt", "작성일")} {DateTime.fromISO(data.createdAt).toFormat("yyyy.MM.dd HH:mm")}</p> 
        </div>
    );
}