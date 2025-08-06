import { DataProvider } from "@shared/ui/data";
import { GoogleTranslateProvider } from "@shared/ui/google-translate";
import { MessageProvider } from "@shared/ui/message";
import { SiteProvider } from "@shared/ui/site";
import { ThemeProvider } from "@shared/ui/theme";
import type { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <GoogleTranslateProvider>
            <MessageProvider>
                <DataProvider>
                    <SiteProvider>
                        <ThemeProvider>
                            {children}
                        </ThemeProvider>
                    </SiteProvider>
                </DataProvider>
            </MessageProvider>
        </GoogleTranslateProvider>
    );
}

export default Providers;