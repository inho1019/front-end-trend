import { Panel } from "@shared/ui/panel"
import { useRef } from "react";
import { CodeEditor } from "./code-editor";
import { Button } from "@shared/ui/common";
import { XIcon } from "@shared/assets";

export interface CodePanelProps {
    isOpen: boolean;
    // isHidden: boolean;
    onClose: () => void;
    // onHidden: () => void;
}

export const  CodePanel = ({ isOpen, onClose }: CodePanelProps) => { 
    const panelRef = useRef<HTMLDivElement>(null);

    return (
        <Panel
            ref={panelRef}
            isOpen={isOpen}
            position="bottom"
            className="w-720 z-20 bottom-0 px-10 max-sm:px-5 max-sm:w-full max-sm:max-w-720 min-sm:min-w-720 min-sm:max-w-full max-sm:h-[calc(100%-65px)]"
        >
            <div className="rounded-t-xl panel-shadow flex flex-col gap-15 bg-white p-15 pb-30 h-full dark:bg-dark">
                <div className="flex flex-row justify-between gap-5">
                    <h2 className="text-lg font-['TheJamsil5Bold']">Code Editor</h2>
                    <Button onClick={onClose}>
                        <XIcon />
                    </Button>
                </div>
                <CodeEditor />
            </div>
        </Panel>
    )
}