import { SANDBOX_TEMPLATES, SandpackCodeEditor, SandpackFileExplorer, SandpackLayout, SandpackPreview, SandpackProvider, type SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";
import { FileIcon } from "@shared/assets";
import { useTheme } from "@shared/lib/theme";
import { useClickAway, useTrans } from "@shared/lib/utils";
import { useRef, useState } from "react";



const TEMPLATE_OPTIONS = Object.keys(SANDBOX_TEMPLATES).map((key) => {
    const keys = key.split('-');
    const label = key.length > 0 ? keys.map(k => k === "ts" ? "TypeScript" : k.charAt(0).toUpperCase() + k.slice(1)).join(' + ') : keys[0].charAt(0).toUpperCase() + keys[0].slice(1);
    return {
        value: key as SandpackPredefinedTemplate,
        label: label,
    };
});

export const CodeEditor = () => {
    const trans = useTrans();
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const clickAwayRef = useClickAway<HTMLDivElement>(() => {
        if (detailsRef.current) {
            detailsRef.current.open = false;
        }
    });
    const [template, setTemplate] = useState<SandpackPredefinedTemplate>("react-ts");
    const { currentTheme } = useTheme();

    return (
        <SandpackProvider
            template={template}
            theme={currentTheme}
        >
            <div className="space-y-10">
                <div className="flex flex-row gap-10 max-sm:flex-col-reverse">
                    <div ref={clickAwayRef} className="relative flex-1 border border-[#EFEFEF] rounded dark:text-[#EFEFEF] dark:border-[#252525] dark:bg-[#151515]">
                        <details ref={detailsRef} open={false} className="peer">
                            <summary className="cursor-pointer py-8 px-16 text-xs flex flex-row gap-5 items-center justify-center">
                                <FileIcon />
                                {trans("common.codeEditor.fileExplorer", "파일 탐색기")}
                            </summary>
                        </details>
                        <div className="absolute top-36 left-0 hidden peer-open:block z-1 w-full border border-[#EFEFEF] rounded dark:text-[#EFEFEF] dark:border-[#252525] dark:bg-[#151515]">
                            <SandpackFileExplorer />
                        </div>
                    </div>
                    <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value as SandpackPredefinedTemplate)}
                        className="mb-auto cursor-pointer py-8 px-16 text-xs border border-[#EFEFEF] rounded outline-none dark:text-[#EFEFEF] dark:border-[#252525] dark:bg-[#151515]"
                    >
                        {TEMPLATE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                <SandpackLayout>
                    <SandpackCodeEditor showLineNumbers wrapContent showTabs={false} />
                    <SandpackPreview showOpenInCodeSandbox={false} />
                </SandpackLayout>
                </div>
            </div>
        </SandpackProvider>
    );
}