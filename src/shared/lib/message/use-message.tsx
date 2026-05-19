import { useContext } from "react";
import { MessageContext } from "./use-message-context";

export const useMessage = () => {
    const data = useContext(MessageContext);
    if (!data) {
        throw new Error("useMessage must be used within a MessageProvider");
    }

    return data;
}