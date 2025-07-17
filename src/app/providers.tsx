import { DataProvider } from "@shared/ui/data";
import type { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <DataProvider>
            {children}
        </DataProvider>
    );
}

export default Providers;