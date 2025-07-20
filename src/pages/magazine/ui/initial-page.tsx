import { Header, MainContainer } from "@shared/ui/layout";
import { MagazineList } from "./initial/magazine-list";


const MagazinePage = () => {
    return (
        <>
            <Header />
            <MainContainer className="pt-40 max-sm:pt-40">
                <MagazineList />
            </MainContainer>
        </>
    );
}

export default MagazinePage;