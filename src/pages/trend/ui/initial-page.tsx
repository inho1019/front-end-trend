import { Header, Footer, MainContainer } from "@shared/ui/layout";
import { TrendList } from "./initial/trend-list";
import { TrendSearch } from "@features/trend";
import { MenuIcon } from "@shared/assets";
import { SettingsPanel } from "@features/setting";
import { Button } from "@shared/ui/common";
import { usePanelController } from "@shared/lib/panel";
import { CodePanel } from "@features/code";
import { useCallback, useState } from "react";
import { twMerge } from "@shared/lib/utils";


const TrendPage = () => {
    const { isOpen: isSettingOpen, openPanel: openSettingPanel, closePanel: closeSettingPanel } = usePanelController("setting-panel");
    const { isOpen: isCodeOpen, openPanel: openCodePanel, closePanel: closeCodePanel } = usePanelController("code-panel");
    const [panelHidden, setPanelHidden] = useState(false);

    const handleClickCodeButton = useCallback(() => {
        if (isCodeOpen) {
            if (panelHidden) {
                setPanelHidden(false);
            }
        } else {
            openCodePanel();
        }
    }, [isCodeOpen, panelHidden, openCodePanel]);

    const handleCloseCodePanel = useCallback(() => {
        setPanelHidden(false);
        closeCodePanel();
    }, [closeCodePanel]);

    return (
        <>
            <Header
                left={
                    <Button onClick={openSettingPanel} className="flex flex-row items-center gap-5">
                        <MenuIcon />
                        <div className="font-jamsil">FE Trend</div>
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
            <CodePanel isOpen={isCodeOpen} isHidden={panelHidden} onClose={handleCloseCodePanel} onHidden={() => setPanelHidden(true)} />
            <Button 
                aria-expanded={isCodeOpen && !panelHidden}
                onClick={handleClickCodeButton} 
                className="fixed size-38 bottom-70 left-20 z-15 rounded-full bg-white border border-black aria-expanded:hidden">
                <div className={twMerge(
                    "size-full text-black text-[15px] font-suit flex items-center justify-center",
                    isCodeOpen && panelHidden && "dot"
                )}>
                    {"< >"}
                </div>
            </Button>
        </>
    );
}

export default TrendPage;