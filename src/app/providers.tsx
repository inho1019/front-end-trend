import type { PropsWithChildren } from "react";
import { ParserProvider } from "../shared/ui/parser";

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <ParserProvider>
            {children}
        </ParserProvider>
    );
}

export default Providers;