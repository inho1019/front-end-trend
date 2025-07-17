import { DataProvider } from "@shared/ui/data";
import { GoogleTranslateProvider } from "@shared/ui/google-translate";
import type { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <GoogleTranslateProvider>
            <DataProvider>
                {children}
            </DataProvider>
        </GoogleTranslateProvider>
    );
}

export default Providers;