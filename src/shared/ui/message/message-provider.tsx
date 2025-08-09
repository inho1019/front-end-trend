import { MessageContext } from "@shared/lib/message";
import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";


export const MessageProvider = ({ children }: PropsWithChildren) => {
    const [message, setMessage] = useState<string>("");
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (!message) return;
        const timeout = setTimeout(() => {
            setMessage("");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [message, trigger]);

    const addMessage = useCallback((msg: string) => {
        setTrigger(prev => !prev);
        setMessage(msg);
    }, []);

    return (
        <MessageContext.Provider value={useMemo(() => ({
            addMessage,
        }), [addMessage])}>
            {children}
            {
                createPortal(
                    <div className="fixed w-full flex justify-center bottom-60 z-9999 pointer-events-none">
                        {message && (
                            <div key={trigger.toString()} className="bg-gray-100 text-sm font-medium px-16 py-12 rounded-md animate-message dark:bg-[#222]">
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