import { Outlet } from "react-router";
import { ToggleTransButton } from "../google-translate";

const Layout = () => {
    return (
        <>
            <Outlet />
            <ToggleTransButton className="fixed bottom-20 left-20 z-50 opacity-80" />
        </>
    );
}

export default Layout;