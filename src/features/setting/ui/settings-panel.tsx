import { LogoIcon, XIcon } from "@shared/assets";
import { Panel } from "@shared/ui/panel"
import { Filter } from "./panel/filter";
import { LocaleToggle } from "./panel/locale-toggle";
import { ThemeToggle } from "./panel/theme-toggle";
import { TransToggle } from "./panel/trans-toggle";
import { Comment } from "./panel/comment";
import { draggableScroll, useTrans } from "@shared/lib/utils";
import { useNavigate } from "react-router";
import { Button, ToggleSwitch } from "@shared/ui/common";
import { useCallback, useRef } from "react";
import { useData } from "@shared/lib/data";

export interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
    const navigate = useNavigate();
    const trans = useTrans();

    const divRef = useRef<HTMLDivElement>(null);

    const { isFavorite, toggleFavorite } = useData();

    const { onMouseDown } = draggableScroll(divRef, { direction: "vertical" });

    const noCacheReload = useCallback(() => {
        window.location.href = window.location.pathname + "?cache=no";
    }, []);

    return (
        <>
            { isOpen && <div role="button" className="fixed bg-black opacity-10 size-full z-100 dark:opacity-30" onClick={onClose} />}
            <Panel
                isOpen={isOpen}
                position="left"
                className="flex flex-col gap-20 rounded-md z-100 h-full w-full max-w-320 bg-white rounded-tr-2xl rounded-br-2xl p-15 dark:bg-dark"
            >
                <div className="flex flex-row justify-between items-center">
                    <Button
                        onClick={() => navigate("/")}
                        className="items-center flex flex-row gap-7">
                        <LogoIcon />
                        <code className="text-xl font-jamsil">
                            FE Trend
                        </code>
                    </Button>
                    <Button className="self-start" onClick={onClose}>
                        <XIcon />
                    </Button>
                </div>
                <div className="flex flex-row gap-15 h-40">
                    <LocaleToggle />
                    <ThemeToggle />
                    <TransToggle />
                </div>
                <div ref={divRef} onMouseDown={onMouseDown} className="flex-1 flex flex-col gap-20 overflow-y-auto scrollbar-hide pb-50 pt-10">
                    <ToggleSwitch
                        checked={isFavorite}
                        onChange={toggleFavorite}
                        className="text-lg font-bold gap-10"
                        label={trans("settings.favorite", "즐겨찾기")}
                    />
                    <Filter />
                    <Button className="text-lg font-bold flex flex-row items-center" onClick={() => navigate("/site")}>
                        {trans("settings.site", "사이트")}
                    </Button>
                    <Button className="text-lg font-bold flex flex-row items-center" onClick={noCacheReload}>
                        {trans("settings.reload", "캐시 초기화 및 새로고침")}
                    </Button>
                    <Comment />
                </div>
            </Panel>
        </>
    )
}