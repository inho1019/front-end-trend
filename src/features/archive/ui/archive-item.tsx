import { twMerge } from "@shared/lib/utils";
import type { ArchiveResponse } from "@shared/model/archive";
import { useMemo } from "react";
import { Base64 } from "js-base64";

interface ArchiveItemProps extends React.HTMLAttributes<HTMLDivElement> {
    data: ArchiveResponse;
}

export const ArchiveItem = ({ data, ...props }: ArchiveItemProps) => {
    const title = useMemo(() => Base64.decode(data.name.split("-")[0]), [data.name]);

    return (
        <div {...props} draggable={false} className={twMerge("flex flex-row items-center gap-5", props.className)}>
            <h2 className="font-medium underline line-clamp-2">{title}</h2>
        </div>
    );
}