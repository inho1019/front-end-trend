import { useCallback, useMemo } from "react";
import { useSearchParams, type NavigateOptions } from "react-router";

export const usePanelController = (name: string) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const isOpen = useMemo(() => searchParams.get(name) === "true", [name, searchParams]);

    const openPanel = useCallback((options?: NavigateOptions) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set(name, "true");
            return params;
        }, options);
    }, [name, setSearchParams]);

    const closePanel = useCallback((options?: NavigateOptions) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.delete(name);
            return params;
        }, { replace: true, ...options });
    }, [name, setSearchParams]);

    return {
        isOpen,
        openPanel,
        closePanel
    }
}