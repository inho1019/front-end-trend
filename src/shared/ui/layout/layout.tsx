import { Outlet } from "react-router";
import { ToggleTransButton } from "../google-translate";

export const Layout = () => {
    return (
        <div className="overflow-y-auto">
            <Outlet />
            <ToggleTransButton className="fixed bottom-20 left-20 z-50 opacity-80 dark:opacity-100" />
        </div>
    );
}
