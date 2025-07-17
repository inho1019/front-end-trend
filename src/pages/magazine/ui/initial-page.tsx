import { MainContainer } from "@shared/ui/layout";
import { MagazineList } from "./initial/magazine-list";


const MagazinePage = () => {
    return (
        <MainContainer>
            <section>
                <MagazineList />
            </section>
        </MainContainer>
    );
}

export default MagazinePage;