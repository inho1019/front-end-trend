import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { usePanelController } from "@shared/lib/panel";
import { CodePanel } from "./code-panel";
import { CodePanelContext } from "../lib/code-panel-context";


export const CodePanelProvider = ({ children }: PropsWithChildren) => {
    const { isOpen: isShow, openPanel: showPanel, closePanel: hidePanel } = usePanelController("code-panel");

    const isHidden = useMemo(() => !isShow, [isShow]);
    const [isOpen, setIsOpen] = useState(false);

    const handleClosePanel = useCallback(() => {
        hidePanel();
        setIsOpen(false);
    }, [hidePanel]);

    return (
        <CodePanelContext.Provider value={
            useMemo(() =>
                ({
                    isOpen,
                    isHidden,
                    setIsOpen,
                    showPanel,
                    hidePanel,
                })
                , [hidePanel, isHidden, isOpen, showPanel]
            )}>
            {children}
            <CodePanel isOpen={isOpen} isHidden={isOpen && isHidden} onClose={handleClosePanel} onHidden={hidePanel} />
        </CodePanelContext.Provider>
    )
}