import { ScreenContext } from "@shared/lib/screen";
import { useMemo, useState, type PropsWithChildren } from "react"

export const ScreenProvider = ({ children }: PropsWithChildren) => {
    const [activating, setActivating] = useState<boolean>(false);

    return (
        <ScreenContext.Provider value={useMemo(() => ({
            activating,
            setActivating,
        }), [activating])}>
            {children}
        </ScreenContext.Provider>
    )
}