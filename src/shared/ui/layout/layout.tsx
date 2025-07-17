import { Outlet } from "react-router";
import { ToggleTransButton } from "../google-translate";

const Layout = () => {
    return (
        <>
            <Outlet />
            <ToggleTransButton className="fixed top-10 left-10 z-50" />
        </>
    );
}

export default Layout;