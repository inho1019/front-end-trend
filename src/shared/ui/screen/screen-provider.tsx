import { ScreenContext } from "@shared/lib/screen";
import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react"

export const ScreenProvider = ({ children }: PropsWithChildren) => {
    const activatingRef = useRef<HTMLDivElement>(null!);
      
    const [isMobile, setIsMobile] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);

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

    return (
        <ScreenContext.Provider value={useMemo(() => ({
            activatingRef,
            isMobile,
            screenWidth
        }), [isMobile, screenWidth])}>
            {children}
        </ScreenContext.Provider>
    )
}