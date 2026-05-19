import { useContext } from "react";
import { CodePanelContext } from "./code-panel-context";

export const useCodePanel = () => {
    const codePanel = useContext(CodePanelContext);
    if (!codePanel) {
        throw new Error("useCodePanel must be used within a CodePanelProvider");
    }

    return codePanel;
}