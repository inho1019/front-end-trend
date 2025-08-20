import { ScreenContext } from "@shared/lib/screen";
import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react"

export const ScreenProvider = ({ children }: PropsWithChildren) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const updateWindowDimensions = () => {
            const innerWidth = window.innerWidth;
            if (innerWidth < 640) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
            setScreenWidth(innerWidth);
        };
        updateWindowDimensions();
        window.addEventListener("load", updateWindowDimensions);
        window.addEventListener("resize", updateWindowDimensions);
        updateWindowDimensions();
        return () => {
        window.removeEventListener("load", updateWindowDimensions);
        window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []);

    useEffect(() => {
        const scrollNode = scrollRef.current;
        const handleScroll = () => {
            setScrollTop(scrollNode?.scrollTop || 0);
        };
        scrollNode?.addEventListener("scroll", handleScroll);
        return () => {
            scrollNode?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <ScreenContext.Provider value={useMemo(() => ({
            scrolling,
            setScrolling,
            scrollRef,
            scrollTop,
            isMobile,
            screenWidth
        }), [isMobile, screenWidth, scrollTop, scrolling])}>
            {children}
        </ScreenContext.Provider>
    )
}