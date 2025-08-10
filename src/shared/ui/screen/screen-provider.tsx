import { ScreenContext } from "@shared/lib/screen";
import { useMemo, useRef, type PropsWithChildren } from "react"

export const ScreenProvider = ({ children }: PropsWithChildren) => {
    const activatingRef = useRef<HTMLDivElement>(null!);

    return (
        <ScreenContext.Provider value={useMemo(() => ({
            activatingRef
        }), [])}>
            {children}
        </ScreenContext.Provider>
    )
}