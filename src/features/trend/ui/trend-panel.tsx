import { DragIcon, XIcon } from "@shared/assets";
import { useMessage } from "@shared/lib/message";
import { useActivatingObserver } from "@shared/lib/screen/use-activating-observer";
import { sanitizeHtml, twMerge, useTrans } from "@shared/lib/utils";
import type { ParserData } from "@shared/model/parser";
import { Button } from "@shared/ui/common";
import { Panel } from "@shared/ui/panel"
import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router";
export interface TrendPanelProps {
    data: ParserData | null;
    isOpen: boolean;
    onClose: () => void;
}

export const TrendPanel = ({ data, isOpen, onClose }: TrendPanelProps) => { 
    const viewerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useActivatingObserver(viewerRef, [data]);

    const trans = useTrans();

    const { addMessage } = useMessage();

    const htmlContent = useMemo(() => ({ __html: data ? sanitizeHtml(data.content) : ""}), [data]);

    // const plainTextContent = useMemo(async () => {
    //     if (!data?.content) return "";

    //     const tempDiv = document.createElement("div");
    //     tempDiv.innerHTML = data.content;
    //     const contents = `${tempDiv.textContent || tempDiv.innerText} 요약해줘`;

    //     const res = await fetch("/.netlify/functions/summary", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: contents,
    //     });

    //     const { summary } = await res.json();
    //     console.log("요약 결과:", summary);

    //     return summary;
    // }, [data]);

    useEffect(() => {
        if (viewerRef.current && data) {
            viewerRef.current.scrollTop = 0;
        }
    }, [data]);

    const handleResize = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const panel = panelRef.current;
        if (!panel) return;
        const startX = e.clientX;
        const startWidth = panel.offsetWidth;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const delta = moveEvent.clientX - startX;
            let newWidth = startWidth - delta;
            newWidth = Math.max(640, Math.min(newWidth, window.innerWidth));
            panel.style.width = `${newWidth}px`;
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, []);

    useEffect(() => {
        const copyMessage = () => addMessage(trans("trend.copyCode", "코드 복사 완료"));
        window.addEventListener("copy-message", copyMessage);
        return () => window.removeEventListener("copy-message", copyMessage);
    }, [addMessage, trans]);

    if (!data) return null;

    return (
        <Panel
            ref={panelRef}
            isOpen={isOpen}
            position="right"
            className="h-[calc(100%-50px)] w-640 top-50 py-5 px-10 max-sm:px-5 max-sm:w-full max-sm:max-w-640 min-sm:min-w-640 min-sm:max-w-full"
        >
            <div className="relative rounded-xl flex flex-col bg-white p-15 pb-30 h-full dark:bg-dark panel-shadow">
                <div className="space-y-10 pb-15 border-b border-b-gray-200">
                    <div className="flex flex-row justify-between gap-5">
                        <details open className="group">
                           <summary className="text-xl font-semibold group-open:line-clamp-2 group-open:max-sm:line-clamp-1 break-all">{data?.title}</summary>
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
                    dangerouslySetInnerHTML={htmlContent}
                >
                    {/* {plainTextContent} */}
                </div>
                <Button
                    className={twMerge(
                        "flex items-center text-gray-400 cursor-ew-resize transition-colors duration-300 absolute w-15 h-full top-0 -left-0 rounded-l-xl max-sm:hidden",
                        "bg-linear-to-r from-white to-white dark:from-dark dark:to-dark active:from-gray-100/100 active:to-gray-100/0 dark:active:from-gray-800/100 dark:active:to-gray-800/0" 
                    )}
                    onMouseDown={handleResize}
                >
                    <DragIcon />    
                </Button>
                <div className="absolute w-[calc(100%-30px)] flex flex-row bottom-6 text-xs text-gray-400 max-sm:justify-end">
                    <div className="truncate">
                        {data?.author ? data.author : "Unknown"}
                    </div>
                    <div className="shrink-0">
                        &nbsp;|&nbsp;{DateTime.fromISO(data.createdAt).toFormat("yyyy.MM.dd HH:mm")}
                    </div>
                </div>
            </div>
        </Panel>
    )
}