import { MessageContext } from "@shared/lib/message";
import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";


export const MessageProvider = ({ children }: PropsWithChildren) => {
    const [message, setMessage] = useState<string>("");
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (!message) return;
        const timeout = setTimeout(() => {
            setMessage("");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [message, id]);

    const addMessage = useCallback((msg: string) => {
        setId(prevId => prevId + 1);
        setMessage(msg);
    }, []);

    return (
        <MessageContext.Provider value={useMemo(() => ({
            addMessage,
        }), [addMessage])}>
            {children}
            {
                createPortal(
                    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-9999">
                        {message && (
                            <div key={id} className="bg-gray-100 text-sm font-medium px-16 py-12 rounded-md animate-message dark:bg-[#222]">
                                {message}
                            </div>
                        )}
                    </div>,
                    document.body
                )
            }
        </MessageContext.Provider>
    )
}