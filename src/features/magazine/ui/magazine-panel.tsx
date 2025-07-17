import { XIcon } from "@shared/assets";
import type { ParserData } from "@shared/model/parser";
import { Panel } from "@shared/ui/panel"
import { useEffect, useRef } from "react";

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
        }
    }, [data]);

    if (!data) return null;

    return (
        <Panel
            isOpen={isOpen}
            position="right"
            className="w-full h-full max-w-640 p-10"
        >
            <div className="rounded-xl shadow-xl flex flex-col gap-20 bg-white p-15 h-full">
                <div className="flex flex-row justify-between">
                    <div className="text-xl">{data?.title}</div>
                    <button className="cursor-pointer" onClick={onClose}>
                        <XIcon />
                    </button>
                </div>
                <div
                    ref={viewerRef}
                    className="overflow-y-auto whitespace-pre-wrap viewer"
                    dangerouslySetInnerHTML={ { __html: data?.content ?? "" } }
                />
            </div>
        </Panel>
    )
}