import { LogoIcon, XIcon } from "@shared/assets";
import { Panel } from "@shared/ui/panel"

export interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => { 
    return (
        <>
            { isOpen && <div role="button" className="fixed bg-black opacity-10 size-full z-100" onClick={onClose} />}
            <Panel
                isOpen={isOpen}
                position="left"
                className="flex flex-col gap-20 rounded-md z-100 h-full w-full max-w-320 bg-white rounded-tr-2xl rounded-br-2xl p-15"
            >
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-10 text-2xl font-semibold">
                        <LogoIcon />
                        FE Trend
                    </div>
                    <button className="cursor-pointer self-start" onClick={onClose}>
                        <XIcon />
                    </button>
                </div>
                example
            </Panel>
        </>
    )
}