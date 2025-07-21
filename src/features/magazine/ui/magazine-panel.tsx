import { LinkIcon, XIcon } from "@shared/assets";
import type { ParserData } from "@shared/model/parser";
import { Panel } from "@shared/ui/panel"
import { useEffect, useRef } from "react";
import { Link } from "react-router";

export interface MagazinePanelProps {
    data: ParserData | null;
    isOpen: boolean;
    onClose: () => void;
}

export const MagazinePanel = ({ data, isOpen, onClose }: MagazinePanelProps) => { 
    const viewerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (viewerRef.current) {
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
            className="w-full h-[calc(100%-45px)] max-w-640 p-10 top-45"
        >
            <div className="rounded-xl shadow-xl flex flex-col bg-white p-15 h-full">
                <div className="space-y-10 pb-15 border-b border-b-gray-200">
                    <div className="flex flex-row justify-between gap-5">
                        <div className="text-xl font-semibold">{data?.title}</div>
                        <button className="cursor-pointer self-start" onClick={onClose}>
                            <XIcon />
                        </button>
                    </div>
                    <Link
                        to={data?.link ?? "#"}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex flex-row items-center gap-2 cursor-pointer text-sm text-blue-500 underline hover:text-blue-700 transition-colors"
                    >
                        <LinkIcon />
                        {data?.link}
                    </Link>
                </div>
                <div
                    ref={viewerRef}
                    className="overflow-y-auto whitespace-pre-wrap viewer pt-15"
                    dangerouslySetInnerHTML={ { __html: data?.content ?? "" } }
                />
            </div>
        </Panel>
    )
}