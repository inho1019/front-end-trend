import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { useScrollingObserver } from "@shared/lib/screen/use-activating-observer";
import { useScreen } from "@shared/lib/screen";

export const Layout = () => {
    const { pathname } = useLocation();
    const { scrollRef } = useScreen();
    useScrollingObserver(scrollRef);

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
