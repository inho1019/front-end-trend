import { DataProvider } from "@shared/ui/data";
import { GoogleTranslateProvider } from "@shared/ui/google-translate";
import { ThemeProvider } from "@shared/ui/theme";
import type { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <GoogleTranslateProvider>
            <DataProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </DataProvider>
        </GoogleTranslateProvider>
    );
}

export default Providers;