import { XIcon } from "@shared/assets";
import { sanitizeHtml } from "@shared/lib/utils";
import type { ParserData } from "@shared/model/parser";
import { Button } from "@shared/ui/common";
import { Panel } from "@shared/ui/panel"
import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
import { Link } from "react-router";

export interface TrendPanelProps {
    data: ParserData | null;
    isOpen: boolean;
    onClose: () => void;
}

export const TrendPanel = ({ data, isOpen, onClose }: TrendPanelProps) => { 
    const viewerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (viewerRef.current && data) {
            viewerRef.current.scrollTop = 0;
            const links = viewerRef.current.querySelectorAll('a');
            links.forEach(link => {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });
}
    }, [data]);

    if (!data) return null;

    return (
        <Panel
            isOpen={isOpen}
            position="right"
            className="w-full h-[calc(100%-50px)] max-w-640 top-50 p-10 max-sm:p-5"
        >
            <div className="relative rounded-xl shadow-xl flex flex-col bg-white p-15 pb-30 h-full dark:bg-dark dark:border dark:border-gray-200">
                <div className="space-y-10 pb-15 border-b border-b-gray-200">
                    <div className="flex flex-row justify-between gap-5">
                        <details open className="group">
                           <summary className="text-xl font-semibold group-open:line-clamp-2 group-open:max-sm:line-clamp-1">{data?.title}</summary>
                        </details>
                        <Button className="self-start" onClick={onClose}>
                            <XIcon />
                        </Button>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <p className="text-xs text-gray-700 font-medium dark:text-gray-300">{data.site.name}</p>
                        <div className="w-1 bg-gray-200 h-12" />
                        <Link
                            to={data?.link ?? "#"}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 cursor-pointer text-sm text-blue-500 underline hover:text-blue-700 transition-colors line-clamp-1 break-all"
                        >
                            {data?.link}
                        </Link>
                    </div>
                </div>
                <div
                    ref={viewerRef}
                    className="flex-1 overflow-y-auto whitespace-pre-wrap viewer py-15 max-sm:pb-40"
                    dangerouslySetInnerHTML={ { __html: `<div>${sanitizeHtml(data?.content) ?? ""}</div>` } }
                />
                <p className="absolute bottom-6 left-15 text-sm text-gray-400 max-sm:left-auto max-sm:right-15 dark:text-gray-500">
                    {data?.author ? data.author : "Unknown"}&nbsp;|&nbsp;
                    {DateTime.fromISO(data.createdAt).toFormat("yyyy.MM.dd HH:mm")}
                </p>
            </div>
        </Panel>
    )
}