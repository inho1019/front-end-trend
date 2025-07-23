import { Header, MainContainer } from "@shared/ui/layout";
import { TrendList } from "./initial/trend-list";
import { TrendSearch } from "@features/trend";
import { MenuIcon } from "@shared/assets";
import { SettingsPanel } from "@features/setting";
import { useSearchParams } from "react-router";
import { useCallback, useMemo } from "react";


const TrendPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const isPanelOpen = useMemo(() => searchParams.get("setting-panel") === "true", [searchParams]);

    const handleOpenPanel = useCallback(() => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("setting-panel", "true");
            return params;
        });
    }, [setSearchParams]);

    const handleClosePanel = useCallback(() => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.delete("setting-panel");
            return params;
        }, { replace: true });
    }, [setSearchParams]);

    return (
        <>
            <Header
                left={
                    <div className="flex flex-row items-center gap-5">
                        <button onClick={handleOpenPanel} className="cursor-pointer">
                            <MenuIcon />
                        </button>
                        <div className="text-lg font-bold">FE Trend</div>
                    </div>
                } 
                center={<TrendSearch className="min-2xl:max-w-480" />} 
                right={<div className="w-107 max-2xl:hidden"/>}  
                className="gap-10"
            />
            <SettingsPanel isOpen={isPanelOpen} onClose={handleClosePanel} />
            <MainContainer className="pt-50 max-sm:pt-50">
                <TrendList />
            </MainContainer>
        </>
    );
}

export default TrendPage;