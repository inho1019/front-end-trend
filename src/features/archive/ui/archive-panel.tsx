import { DragIcon, XIcon } from "@shared/assets";
import { useMessage } from "@shared/lib/message";
import { useScrollingObserver } from "@shared/lib/screen/use-activating-observer";
import { twMerge, useTrans } from "@shared/lib/utils";
import { AdSense, Button, Spinner } from "@shared/ui/common";
import { Panel } from "@shared/ui/panel"
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Link } from "react-router";
import { EmptyContainer, ScrollToTopButton } from "@features/common";
import { useScreen } from "@shared/lib/screen";
import { getContent } from "@shared/api";
import type { Archive } from "@shared/model/archive";

export interface ArchivePanelProps {
    path: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ArchivePanel = ({ path, isOpen, onClose }: ArchivePanelProps) => { 
    const viewerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useScrollingObserver(viewerRef, [path]);

    const [archiveData, setArchiveData] = useState<Archive>()

    const [isLoading, startTransition] = useTransition();

    const trans = useTrans();

    const { addMessage } = useMessage();
    const { scrolling } = useScreen();

    const archiveHtml = useMemo(() => ({ __html: archiveData?.content ?? "" }), [archiveData]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (path) {
            if (viewerRef.current) {
                if (viewerRef.current) {
                    viewerRef.current.scrollTop = 0;
                }
            }
        }
    }, [path]);


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

    useEffect(() => {
        if (!path) {
            setArchiveData(undefined);
            return;
        }
        const fetchData = async () => {
            startTransition(async () => {
                const { data } = await getContent<Archive>(path, { ref: import.meta.env.VITE_ARCHIVE_REPO });
                setArchiveData(data);
            })
        };
        fetchData();
    }, [path])

    if (!path) return null;

    return (
        <Panel
            ref={panelRef}
            isOpen={isOpen}
            position="right"
            className="h-[calc(100%-50px)] w-640 top-50 py-5 px-10 max-sm:px-5 max-sm:w-full max-sm:max-w-640 min-sm:min-w-640 min-sm:max-w-full"
        >
            <div className="relative rounded-xl flex flex-col bg-white p-15 h-full dark:bg-dark panel-shadow">
                <div className="space-y-5 pb-10 border-b border-b-gray-200 dark:border-b-[#666]">
                    <div className="flex flex-row justify-between gap-5">
                        {isLoading ? (
                            <div className="flex-1 bg-gray-100 dark:bg-[#222] h-28 rounded-md animate-pulse" />
                        ) : (
                            <details open className="group">
                                <summary className="text-xl font-semibold group-open:line-clamp-2 group-open:max-sm:line-clamp-1 break-all">{archiveData?.title}</summary>
                            </details>
                         )}
                        <Button className="self-start" onClick={handleClose}>
                            <XIcon />
                        </Button>
                    </div>
                    {isLoading || !archiveData ? (
                        <div className="h-16" />
                    ) : (
                        <div className="flex flex-row items-center">
                            <p className="text-xs">
                                {trans("archive.source", "출처")}&nbsp;•&nbsp;
                            </p>
                            <Link
                                to={archiveData.link ?? "#"}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex-1 cursor-pointer text-xs text-blue-500 underline hover:text-blue-700 transition-colors line-clamp-1 break-all"
                                >
                                {archiveData.link}
                            </Link>
                        </div>
                    )}
                </div>
                {
                    isLoading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <Spinner className="size-48 border-5" />
                        </div>
                    ) : (
                        archiveData ? (
                            <div className="flex-1 overflow-y-auto pt-15 space-y-20 max-sm:pb-40 ">
                                <div
                                    ref={viewerRef} 
                                    className="viewer whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={archiveHtml}
                                />
                                <AdSense />
                            </div>
                        ) : (
                            <EmptyContainer/>
                        )
                    )
                }
                <ScrollToTopButton 
                    scrollRef={viewerRef} 
                    aria-disabled={!isOpen || scrolling}
                    className={twMerge("transition-opacity duration-300 ease-out fixed bottom-116 right-15 z-50 active:opacity-70 group-aria-hidden:opacity-0 aria-disabled:opacity-0 aria-disabled:pointer-events-none min-sm:hidden")}
                />
                <Button
                    className={twMerge(
                        "flex items-center text-gray-400 cursor-col-resize transition-colors duration-300 absolute w-15 h-full top-0 -left-0 rounded-l-xl max-sm:hidden",
                        "bg-linear-to-r from-white to-white dark:from-dark dark:to-dark active:from-gray-100/100 active:to-gray-100/0 dark:active:from-gray-800/100 dark:active:to-gray-800/0" 
                    )}
                    onMouseDown={handleResize}
                >
                    <DragIcon />    
                </Button>
            </div>
        </Panel>
    )
}
