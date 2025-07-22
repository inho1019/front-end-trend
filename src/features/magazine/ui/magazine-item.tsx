import type { ParserData } from "@shared/model/parser";
import { twMerge, useTrans } from "@shared/lib/utils";
import { DateTime } from "luxon";

interface MagazineItemProps extends React.HTMLAttributes<HTMLDivElement> {
    data: ParserData;
}

export const MagazineItem = ({ data, ...props }: MagazineItemProps) => {
    const { trans } = useTrans();

    return (
        <div {...props} className={twMerge("space-y-5", props.className)}>
            <p className="text-xs text-gray-500 font-medium">{data.site.name}</p> 
            <h2 className="text-xl font-bold line-clamp-2 leading-24">{data.title}</h2>
            <p className="text-sm text-gray-700 font-light">{trans("magazine.createdAt", "작성일")} {DateTime.fromISO(data.createdAt).toFormat("yyyy-MM-dd HH:mm")}</p> 
            {data.thumbnail && <img src={data.thumbnail} alt={data.title} className="mt-2 w-32 h-32 object-cover" />}
        </div>
    );
}