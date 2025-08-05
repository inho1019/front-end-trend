import { Outlet, useLocation } from "react-router";
import { ToggleTransButton } from "../google-translate";
import { useEffect, useRef } from "react";

export const Layout = () => {
    const { pathname } = useLocation();
    const layoutRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (layoutRef.current) {
            layoutRef.current.scrollTo(0, 0);
        }
    }, [pathname])

    return (
        <div ref={layoutRef} className="overflow-y-auto flex flex-col h-screen">
            <Outlet />
            <ToggleTransButton className="fixed bottom-20 left-20 z-50 opacity-80 active:opacity-60 transition-opacity" />
        </div>
    );
}
