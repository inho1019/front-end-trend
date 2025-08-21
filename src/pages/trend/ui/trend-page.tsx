import { Header, Footer, MainContainer } from "@shared/ui/layout";
import { TrendSearch } from "@features/trend";
import { MenuIcon } from "@shared/assets";
import { SettingsPanel } from "@features/setting";
import { Button } from "@shared/ui/common";
import { usePanelController } from "@shared/lib/panel";
import { useCallback } from "react";
import { twMerge } from "@shared/lib/utils";
import { GoogleTranslateButton } from "@features/google-translate";
import { useCodePanel } from "@features/code";
import { useScreen } from "@shared/lib/screen";
import { TrendList } from "@widgets/trend";
import { ScrollToTopButton } from "@features/common";


const TrendPage = () => {
    const { isOpen: isTrendOpen } = usePanelController("trend-panel");
    const { isOpen: isSettingOpen, openPanel: openSettingPanel, closePanel: closeSettingPanel } = usePanelController("setting-panel");
    const { isOpen: isCodeOpen, isHidden, setIsOpen: setIsCodeOpen, showPanel: showCode } = useCodePanel();
    const { scrolling, scrollTop, scrollRef, isMobile } = useScreen();

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
                center={<TrendSearch />} 
                right={<div aria-hidden={scrollTop > 15} className="transition-all duration-500 w-93 max-2xl:hidden aria-hidden:w-0"/>}  
                className="gap-10"
            />
            <SettingsPanel isOpen={isSettingOpen} onClose={closeSettingPanel} />
            <MainContainer className="pt-5 max-sm:pt-5">
                <TrendList />
            </MainContainer>
            <Footer />
            <div className="group" aria-hidden={scrolling}>
                <ScrollToTopButton 
                    scrollRef={scrollRef} 
                    aria-disabled={scrollTop < 15 || (isMobile && isTrendOpen )|| (isCodeOpen && !isHidden) || scrolling}
                    className={twMerge("transition-opacity duration-300 ease-out fixed bottom-116 left-20 z-50 active:opacity-70 aria-disabled:opacity-0 aria-disabled:pointer-events-none")}
                />
                <GoogleTranslateButton
                    className={twMerge("transition duration-300 ease-out fixed bottom-68 left-20 z-50 active:opacity-70 group-aria-hidden:opacity-0", isCodeOpen && !isHidden && "translate-y-48")} 
                />
                <Button
                    aria-expanded={isCodeOpen && !isHidden}
                    onClick={handleClickCodeButton} 
                    className="transition duration-300 ease-out fixed size-38 bottom-20 left-20 z-15 rounded-full  bg-white border dark:bg-dark aria-expanded:hidden group-aria-hidden:opacity-0">
                    <div className={twMerge(
                        "size-full text-sm font-suit flex items-center justify-center",
                        isCodeOpen && isHidden && "dot"
                    )}>
                        {"< >"}
                    </div>
                </Button>
            </div>
        </>
    );
}

export default TrendPage;