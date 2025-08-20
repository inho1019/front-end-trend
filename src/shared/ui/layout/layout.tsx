import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { useActivatingObserver } from "@shared/lib/screen/use-activating-observer";
import { useScreen } from "@shared/lib/screen";

export const Layout = () => {
    const { pathname } = useLocation();
    const { scrollRef } = useScreen();
    useActivatingObserver(scrollRef, [pathname]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, 0);
        }
    }, [pathname, scrollRef])

    return (
        <div ref={scrollRef} className="overflow-y-auto flex flex-col h-dvh">
            <Outlet />
        </div>
    );
}
