import { Header, Footer, MainContainer } from "@shared/ui/layout";
import { TrendList } from "./initial/trend-list";
import { TrendSearch } from "@features/trend";
import { MenuIcon } from "@shared/assets";
import { SettingsPanel } from "@features/setting";
import { Button } from "@shared/ui/common";
import { usePanelController } from "@shared/lib/panel";
import { useCallback } from "react";
import { twMerge } from "@shared/lib/utils";
import { GoogleTranslateButton } from "@features/google-translate";
import { useCodePanel } from "@features/code";
import { useScrolling } from "@shared/lib/scrolling";


const TrendPage = () => {
    const { isOpen: isSettingOpen, openPanel: openSettingPanel, closePanel: closeSettingPanel } = usePanelController("setting-panel");
    const { isOpen: isCodeOpen, isHidden, setIsOpen: setIsCodeOpen, showPanel: showCode } = useCodePanel();
    const { scrolling } = useScrolling();

    const handleClickCodeButton = useCallback(() => {
        if (isCodeOpen) {
            if (isHidden) {
                showCode();
            }
        } else {
            showCode();
            setIsCodeOpen(true);
        }
    }, [isCodeOpen, isHidden, setIsCodeOpen, showCode]);

    return (
        <>
            <Header
                left={
                    <Button onClick={() => openSettingPanel()} className="flex flex-row items-center gap-5">
                        <MenuIcon />
                        <code className="font-jamsil">FE Trend</code>
                    </Button>
                }
                center={<TrendSearch className="min-2xl:max-w-480" />} 
                right={<div className="w-93 max-2xl:hidden"/>}  
                className="gap-10"
            />
            <SettingsPanel isOpen={isSettingOpen} onClose={closeSettingPanel} />
            <MainContainer className="pt-5 max-sm:pt-5">
                <TrendList />
            </MainContainer>
            <Footer />
            <GoogleTranslateButton
                aria-hidden={scrolling}
                className={twMerge("transition duration-300 ease-out fixed bottom-68 left-20 z-50 active:opacity-70 aria-hidden:opacity-0", isCodeOpen && !isHidden && "translate-y-48")} 
            />
            <Button
                aria-hidden={scrolling}
                aria-expanded={isCodeOpen && !isHidden}
                onClick={handleClickCodeButton} 
                className="transition duration-300 ease-out fixed size-38 bottom-20 left-20 z-15 rounded-full bg-white border border-black aria-expanded:hidden aria-hidden:opacity-0">
                <div className={twMerge(
                    "size-full text-black text-[15px] font-suit flex items-center justify-center",
                    isCodeOpen && isHidden && "dot"
                )}>
                    {"< >"}
                </div>
            </Button>
        </>
    );
}

export default TrendPage;