import { Outlet } from "react-router";
import { ToggleTransButton } from "../google-translate";

export const Layout = () => {
    return (
        <div className="overflow-y-auto flex flex-col h-screen">
            <Outlet />
            <ToggleTransButton className="fixed bottom-20 left-20 z-50 opacity-80 active:opacity-60 transition-opacity" />
        </div>
    );
}
