import type { PropsWithChildren } from "react";
import { DataProvider } from "../shared/ui/data";

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <DataProvider>
            {children}
        </DataProvider>
    );
}

export default Providers;