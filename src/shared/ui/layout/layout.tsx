import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import { useScrollingObserver } from "@shared/lib/screen/use-activating-observer";
import { useScreen } from "@shared/lib/screen";
import { NativeApp } from "@shared/lib/utils";
import { useFavoriteStore } from "@/store";

export const Layout = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const { scrollRef } = useScreen();
    const setFavoriteSiteIds = useFavoriteStore(state => state.setFavoriteSiteIds);

    useScrollingObserver(scrollRef);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, 0);
        }
    }, [pathname, scrollRef])


    useEffect(() => {
        return NativeApp.ready(navigate);
    }, [navigate]);

    useEffect(() => {
        const fetchTheme = async () => {
            if (NativeApp.isNative) {
                setFavoriteSiteIds(await NativeApp.invoke<string[]>("getFavoriteSiteIds") ?? []);
            }
        }
        fetchTheme();
    }, [setFavoriteSiteIds])

    useEffect(() => {
        const canGoBack = window.history.length > 1;
        NativeApp.invoke<boolean>("setCanGoBack", { canGoBack: canGoBack });
    }, [searchParams])

    return (
        <div ref={scrollRef} className="overflow-y-auto flex flex-col h-dvh">
            <Outlet />
        </div>
    );
}
