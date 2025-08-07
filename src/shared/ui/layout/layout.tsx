import { Outlet, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { useActivatingObserver } from "@shared/lib/screen/use-activating-observer";

export const Layout = () => {
    const { pathname } = useLocation();
    const layoutRef = useRef<HTMLDivElement>(null);
    useActivatingObserver(layoutRef);

    useEffect(() => {
        if (layoutRef.current) {
            layoutRef.current.scrollTo(0, 0);
        }
    }, [pathname])

    return (
        <div ref={layoutRef} className="overflow-y-auto flex flex-col h-dvh">
            <Outlet />
        </div>
    );
}
