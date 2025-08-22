import { Header, Footer, MainContainer } from "@shared/ui/layout";
import { ArrowIcon } from "@shared/assets";
import { useNavigate } from "react-router";
import { Button } from "@shared/ui/common";
import { GoogleTranslateButton } from "@features/google-translate";
import { useScreen } from "@shared/lib/screen";
import { ScrollToTopButton } from "@features/common";
import { twMerge } from "tailwind-merge";
import { ArchiveList } from "@widgets/archive";
import { useTrans } from "@shared/lib/utils";

const ArchivePage = () => {
    const { scrolling, scrollRef, scrollTop } = useScreen();
    const trans = useTrans();
    const navigate = useNavigate();

    // const { isOpen, openPanel, closePanel } = usePanelController("archive-panel");

    return (
        <>
            <Header
                left={
                    <div className="flex items-center gap-5">
                        <Button onClick={() => navigate("/")}>
                            <ArrowIcon />
                        </Button>
                        <h1 className="text-lg font-semibold">{trans("archive.title", "아카이브")}</h1>
                    </div>
                }
            />
            <MainContainer className="pt-5 max-sm:pt-5">
                <ArchiveList />
            </MainContainer>
            <div className="group" aria-hidden={scrolling}>
                <ScrollToTopButton
                    scrollRef={scrollRef}
                    aria-disabled={scrollTop < 15 || scrolling}
                    className={twMerge("transition-opacity duration-300 ease-out fixed bottom-68 left-20 z-50 active:opacity-70 aria-disabled:opacity-0 aria-disabled:pointer-events-none max-sm:left-auto max-sm:right-15")}
                />
                <GoogleTranslateButton className="transition duration-300 ease-out fixed bottom-20 left-20 z-50 active:opacity-70 group-aria-hidden:opacity-0 max-sm:left-auto max-sm:right-15" />
            </div>
            <Footer />
            {/* <ArchivePagePanel isOpen={isOpen} onClose={closePanel} /> */}
        </>
    );
}

export default ArchivePage;