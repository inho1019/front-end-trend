import { GoogleTranslateProvider } from "@features/google-translate";
import { DataProvider } from "@shared/ui/data";
import { MessageProvider } from "@shared/ui/message";
import { ScrollingProvider } from "@shared/ui/scrolling";
import { SiteProvider } from "@shared/ui/site";
import { ThemeProvider } from "@shared/ui/theme";
import type { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <GoogleTranslateProvider>
            <DataProvider>
                <SiteProvider>
                    <ThemeProvider>
                        <MessageProvider>
                            <ScrollingProvider>
                                {children}
                            </ScrollingProvider>
                        </MessageProvider>
                    </ThemeProvider>
                </SiteProvider>
            </DataProvider>
        </GoogleTranslateProvider>
    );
}

export default Providers;