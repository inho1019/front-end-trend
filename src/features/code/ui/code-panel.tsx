import { Panel } from "@shared/ui/panel"
import { useEffect, useRef, useState } from "react";
import { CodeEditor } from "./code-editor";
import { Button } from "@shared/ui/common";
import { LineIcon, ResetIcon, XIcon } from "@shared/assets";
import { twMerge } from "@shared/lib/utils";

export interface CodePanelProps {
    isOpen: boolean;
    isHidden?: boolean;
    onClose: () => void;
    onHidden?: () => void;
}

export const  CodePanel = ({ isOpen, isHidden, onClose, onHidden }: CodePanelProps) => { 
    const [isFirst, setIsFirst] = useState(true);
    const [hidden, setHidden] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(false);
    const [opacity, setOpacity] = useState(100);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isHidden !== undefined) {
            if (isHidden) {
                if (isFirst) {
                    setIsFirst(false);
                }
                setTimeout(() => {
                    setHidden(true);
                }, 290);
            } else {
                setHidden(false);
            }
        }
    }, [isFirst, isHidden]);

    useEffect(() => {
        if (!isOpen) {
           setIsFirst(true);
           setHidden(false);
        }
    }, [isOpen])

    return (
        <Panel
            ref={panelRef}
            isOpen={isOpen}
            position="bottom"
            className={
                twMerge(
                    "w-720 z-20 bottom-0 px-10 max-md:px-5 max-md:w-full max-sm:h-[calc(100%-65px)]",
                    hidden && "hidden"
                )
            }
        >
            <div style={{ opacity: `${opacity}%` }} className="size-full">
                <div
                    className={twMerge(
                        "origin-bottom-left rounded-t-xl panel-shadow flex flex-col gap-15 bg-white p-15 h-fit dark:bg-dark max-sm:h-full",
                        isHidden !== undefined  && 
                            (isHidden ?
                                "animate-scale-out fill-mode-forwards" : 
                                !isFirst && "animate-scale-in"
                            )
                    )}>
                    <div className="flex flex-row justify-between gap-15">
                        <h2 className="shrink-0 text-lg font-jamsil max-sm:text-base">Code Editor</h2>
                        <div className="flex flex-row items-center gap-10">
                            <input
                                type="range"
                                step={5}
                                min={50}
                                max={100}
                                value={opacity}
                                onChange={(e) => setOpacity(parseInt(e.target.value))}
                                className="w-full cursor-grab accent-black dark:accent-white h-4 max-w-100 active:cursor-grabbing"
                            />
                            <Button className="-mx-1" onClick={() => setResetTrigger(prev => !prev)}>
                                <ResetIcon />
                            </Button>
                            {onHidden &&
                                <Button onClick={onHidden}>
                                    <LineIcon />
                                </Button>
                            }
                            <Button onClick={onClose}>
                                <XIcon />
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-y-auto pb-30 max-sm:pb-50" >
                        <CodeEditor key={resetTrigger.toString()} />
                    </div>
                </div>
            </div>
        </Panel>
    )
}