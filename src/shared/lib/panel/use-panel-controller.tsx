import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

export const usePanelController = (name: string) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const isOpen = useMemo(() => searchParams.get(name) === "true", [name, searchParams]);

    const openPanel = useCallback(() => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set(name, "true");
            return params;
        });
    }, [name, setSearchParams]);

    const closePanel = useCallback(() => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.delete(name);
            return params;
        }, { replace: true });
    }, [name, setSearchParams]);

    return {
        isOpen,
        openPanel,
        closePanel
    }
}