import { Panel } from "@shared/ui/panel"
import { useCallback, useEffect, useRef, useState } from "react";
import { CodeEditor } from "./code-editor";
import { Button } from "@shared/ui/common";
import { DragCornerIcon, LineIcon, ResetIcon, XIcon } from "@shared/assets";
import { twMerge } from "@shared/lib/utils";
import { useLocation } from "react-router";

export interface CodePanelProps {
    isOpen: boolean;
    isHidden?: boolean;
    onClose: () => void;
    onHidden?: () => void;
}

export const CodePanel = ({ isOpen, isHidden, onClose, onHidden }: CodePanelProps) => {
    const { pathname } = useLocation();

    const [isFirst, setIsFirst] = useState(true);
    const [hidden, setHidden] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(false);
    const [opacity, setOpacity] = useState(100);
    const panelRef = useRef<HTMLDivElement>(null);

    const handleResize = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const panel = panelRef.current;
        if (!panel) return;
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = panel.offsetWidth;
        const startHeight = panel.offsetHeight;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            let newWidth = startWidth + deltaX;
            let newHeight = startHeight - deltaY;
            newWidth = Math.max(720, Math.min(newWidth, window.innerWidth));
            newHeight = Math.max(449, Math.min(newHeight, window.innerHeight - 65));
            panel.style.width = `${newWidth}px`;
            panel.style.height = `${newHeight}px`;
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, []);
    
    useEffect(() => {
        if (!isOpen) {
           setIsFirst(true);
           setHidden(false);
           setOpacity(100);
           return;
        }
        if (isHidden && !isFirst) {
            setTimeout(() => {
                setHidden(true);
            }, 290);
        } else {
            setHidden(false);
        }
    }, [hidden, isFirst, isHidden, isOpen]);

    useEffect(() => {
        if (pathname !== "/") {
            onHidden?.();
        }
    }, [onHidden, pathname])

    useEffect(() => {
        let firstTimeout: NodeJS.Timeout;
        if (isFirst && isOpen) {
            firstTimeout = setTimeout(() => {
                setIsFirst(false);
            }, 1000);
        } else {
            return;
        }
        return () => {
            clearTimeout(firstTimeout);
        }
    }, [isFirst, isOpen])

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
            <div style={{ opacity: `${opacity}%` }} className="relative size-full">
                <div
                    className={twMerge(
                        "origin-bottom-left rounded-t-xl panel-shadow flex flex-col gap-15 bg-white p-15 h-fit size-full dark:bg-dark max-sm:h-full",
                        isHidden ? "animate-scale-out fill-mode-forwards" : "animate-scale-in",
                        isFirst  &&  "animate-duration-none"
                    )}>
                    <Button 
                        onMouseDown={handleResize} 
                        className="cursor-nesw-resize rounded-tr-xl absolute text-gray-400 top-0 right-0 z-10 size-16 overflow-hidden max-md:hidden">
                        <DragCornerIcon />
                    </Button>
                    <div className="flex flex-row justify-between gap-15">
                        <code className="shrink-0 text-lg font-jamsil max-sm:text-base">Code Editor</code>
                        <div className="flex flex-row items-center gap-10">
                            <input
                                type="range"
                                step={5}
                                min={30}
                                max={100}
                                value={opacity}
                                onChange={(e) => setOpacity(parseInt(e.target.value))}
                                className="w-full cursor-grab accent-black dark:accent-white h-4 max-w-100 active:cursor-grabbing"
                            />|
                            <Button disabled={isFirst} className="-mx-1" onClick={() => setResetTrigger(prev => !prev)}>
                                <ResetIcon />
                            </Button>
                            {onHidden &&
                                <Button disabled={isFirst} onClick={onHidden}>
                                    <LineIcon />
                                </Button>
                            }
                            <Button disabled={isFirst} onClick={onClose}>
                                <XIcon />
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-y-auto pb-30 max-sm:pb-50 h-full" >
                        <CodeEditor key={resetTrigger.toString()} />
                    </div>
                </div>
            </div>
        </Panel>
    )
}