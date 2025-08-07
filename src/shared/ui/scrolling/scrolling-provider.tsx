import { ScrollingContext } from "@shared/lib/scrolling";
import { useMemo, useState, type PropsWithChildren } from "react"

export const ScrollingProvider = ({ children }: PropsWithChildren) => {
    const [scrolling, setScrolling] = useState<boolean>(false);

    return (
        <ScrollingContext.Provider value={useMemo(() => ({
            scrolling,
            setScrolling,
        }), [scrolling])}>
            {children}
        </ScrollingContext.Provider>
    )
}