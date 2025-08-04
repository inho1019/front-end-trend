import { DataProvider } from "@shared/ui/data";
import { GoogleTranslateProvider } from "@shared/ui/google-translate";
import { SiteProvider } from "@shared/ui/site";
import { ThemeProvider } from "@shared/ui/theme";
import type { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <GoogleTranslateProvider>
            <DataProvider>
                <SiteProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </SiteProvider>
            </DataProvider>
        </GoogleTranslateProvider>
    );
}

export default Providers;