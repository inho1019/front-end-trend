import { Header, Footer, MainContainer } from "@shared/ui/layout";
import { TrendList } from "./initial/trend-list";
import { TrendSearch } from "@features/trend";
import { MenuIcon } from "@shared/assets";
import { SettingsPanel } from "@features/setting";
import { Button } from "@shared/ui/common";
import { usePanelController } from "@shared/lib/panel";


const TrendPage = () => {
    const { isOpen, openPanel, closePanel } = usePanelController("setting-panel");

    return (
        <>
            <Header
                left={
                    <Button onClick={openPanel} className="flex flex-row items-center gap-5">
                        <MenuIcon />
                        <div className="text-md font-['yg-jalnan'] pt-4">FE Trend</div>
                    </Button>
                }
                center={<TrendSearch className="min-2xl:max-w-480" />} 
                right={<div className="w-107 max-2xl:hidden"/>}  
                className="gap-10"
            />
            <SettingsPanel isOpen={isOpen} onClose={closePanel} />
            <MainContainer className="pt-5 max-sm:pt-5">
                <TrendList />
            </MainContainer>
            <Footer />
        </>
    );
}

export default TrendPage;