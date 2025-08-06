import { Header, Footer, MainContainer } from "@shared/ui/layout";
import { TrendList } from "./initial/trend-list";
import { TrendSearch } from "@features/trend";
import { MenuIcon } from "@shared/assets";
import { SettingsPanel } from "@features/setting";
import { Button } from "@shared/ui/common";
import { usePanelController } from "@shared/lib/panel";
import { CodePanel } from "@features/code";


const TrendPage = () => {
    const { isOpen: isSettingOpen, openPanel: openSettingPanel, closePanel: closeSettingPanel } = usePanelController("setting-panel");
    const { isOpen: isCodeOpen, openPanel: openCodePanel, closePanel: closeCodePanel } = usePanelController("code-panel");

    return (
        <>
            <Header
                left={
                    <Button onClick={openSettingPanel} className="flex flex-row items-center gap-5">
                        <MenuIcon />
                        <div className="font-['TheJamsil5Bold']">FE Trend</div>
                    </Button>
                }
                center={<TrendSearch className="min-2xl:max-w-480" />} 
                right={<div className="w-107 max-2xl:hidden"/>}  
                className="gap-10"
            />
            <SettingsPanel isOpen={isSettingOpen} onClose={closeSettingPanel} />
            <MainContainer className="pt-5 max-sm:pt-5">
                <TrendList />
            </MainContainer>
            <Footer />
            <CodePanel isOpen={isCodeOpen} onClose={closeCodePanel} />
            <Button onClick={openCodePanel} className="text-black fixed size-38 bottom-70 left-20 z-15 rounded-full bg-white border text-[15px] font-suit">
                {"< >"}
            </Button>
        </>
    );
}

export default TrendPage;