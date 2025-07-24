import { ConsoleIcon, LogoIcon, XIcon } from "@shared/assets";
import { Panel } from "@shared/ui/panel"
import { Filter } from "./panel/filter";
import { LocaleToggle } from "./panel/locale-toggle";
import { ThemeToggle } from "./panel/theme-toggle";
import { TransToggle } from "./panel/trans-toggle";
import { Comment } from "./panel/comment";
import { useTrans } from "@shared/lib/utils";

export interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
    const trans = useTrans();

    return (
        <>
            { isOpen && <div role="button" className="fixed bg-black opacity-10 size-full z-100 dark:opacity-30" onClick={onClose} />}
            <Panel
                isOpen={isOpen}
                position="left"
                className="flex flex-col gap-20 rounded-md z-100 h-full w-full max-w-320 bg-white rounded-tr-2xl rounded-br-2xl p-15 dark:bg-dark"
            >
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-10 text-2xl font-semibold tracking-tight">
                        <LogoIcon />
                        FE Trend
                    </div>
                    <button className="cursor-pointer self-start" onClick={onClose}>
                        <XIcon />
                    </button>
                </div>
                <div className="flex flex-row gap-15 h-40">
                    <LocaleToggle />
                    <ThemeToggle />
                    <TransToggle />
                </div>
                <div className="flex-1 flex flex-col gap-20 overflow-y-auto scrollbar-hide">
                    <Filter />
                    <button className="text-lg font-bold flex flex-row items-center">
                        {trans("settings.console", "콘솔")}
                        <ConsoleIcon/>
                    </button>
                    <Comment />
                </div>
            </Panel>
        </>
    )
}