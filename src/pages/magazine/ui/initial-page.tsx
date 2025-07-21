import { Header, MainContainer } from "@shared/ui/layout";
import { MagazineList } from "./initial/magazine-list";
import { MagazineSearch } from "@features/magazine";


const MagazinePage = () => {
    return (
        <>
            <Header center={<MagazineSearch className="min-2xl:max-w-480" />} right={<div className="w-107 max-2xl:hidden"/>}  className="gap-10"/>
            <MainContainer className="pt-50 max-sm:pt-50">
                <MagazineList />
            </MainContainer>
        </>
    );
}

export default MagazinePage;