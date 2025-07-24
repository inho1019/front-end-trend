import { Header, MainContainer } from "@shared/ui/layout";
import { ArrowIcon } from "@shared/assets";
import { useNavigate } from "react-router";


const ConsolePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header
                left={
                    <button onClick={() => navigate(-1)} className="cursor-pointer active:opacity-70 transition-opacity">
                        <ArrowIcon />
                    </button>
                } 
            />
            <MainContainer className="pt-50 max-sm:pt-50">
            </MainContainer>
        </>
    );
}

export default ConsolePage;