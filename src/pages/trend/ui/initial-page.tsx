import { Header, MainContainer } from "@shared/ui/layout";
import { TrendList } from "./initial/trend-list";
import { TrendSearch } from "@features/trend";


const TrendPage = () => {
    return (
        <>
            <Header center={<TrendSearch className="min-2xl:max-w-480" />} right={<div className="w-107 max-2xl:hidden"/>}  className="gap-10"/>
            <MainContainer className="pt-50 max-sm:pt-50">
                <TrendList />
            </MainContainer>
        </>
    );
}

export default TrendPage;