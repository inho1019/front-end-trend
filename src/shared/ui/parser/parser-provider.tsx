import { useCallback, useEffect, useState, type PropsWithChildren } from "react"
import type { Site } from "../../model/site";
import { ParserContext } from "../../lib/parser";
import { getData } from "../../api";
import type { ParserData } from "../../model/parser";
import { parseSite } from "../../utils/parse-site";

export const ParserProvider = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState<ParserData[] | null>(null);
    const [step, setStep] = useState<"first" | "getting" | "parsing" | "sorting" | "complete">("first");

    const startProcess = useCallback(async () => {
        setStep("getting");
        try {
            const { data: siteData } = await getData();
            if (!siteData) {
                throw new Error("No data received from getData");
            }
            setStep("parsing");
            const parsing = await Promise.all(siteData.map(async (site: Site) => {
                const parsedSite = await parseSite(site);
                if (parsedSite) {
                    return parsedSite;
                }
                throw new Error("parsed site is undefined");
            }));
            setStep("sorting");
            const datas: ParserData[] = parsing.flat();
            datas.sort((a, b) => {
                return b.createdAt.toMillis() - a.createdAt.toMillis();
            });

            console.log(datas);

            setData(datas);
            setStep("complete");
        } catch (error) {
            console.error("process error:", error);
        }
    }, []);

    useEffect(() => {
        startProcess();
    }, []);

    return (
        <ParserContext.Provider value={data}>
            {children}    
        </ParserContext.Provider>
    )
}