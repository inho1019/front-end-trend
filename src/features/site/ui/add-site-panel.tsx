
import { XIcon } from "@shared/assets";
import { useTrans } from "@shared/lib/utils";
import { Button, Input } from "@shared/ui/common";
import { Panel } from "@shared/ui/panel"

export interface AddSitePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddSitePanel = ({ isOpen, onClose }: AddSitePanelProps) => { 
    const trans = useTrans();
    
    return (
        <Panel
            isOpen={isOpen}
            position="right"
            className="w-full h-[calc(100%-50px)] max-w-640 top-50 p-10 max-sm:p-5"
        >
            <div className="relative rounded-xl shadow-xl flex flex-col bg-white p-15 pb-30 h-full dark:bg-dark dark:border dark:border-gray-200">
                <div className="space-y-20">
                    <div className="flex flex-row justify-between gap-5 pb-10 border-b border-b-gray-200">
                        <h1 className="text-xl font-semibold group-open:line-clamp-2 group-open:max-sm:line-clamp-1">
                            {trans("site.add", "사이트 등록")}
                        </h1>
                        <Button className="self-start" onClick={onClose}>
                            <XIcon />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-10 px-10">
                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                                {trans("site.name", "이름")}
                            </label>
                            <Input />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                                {trans("site.url", "RSS 주소")}
                            </label>
                            <Input />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                                {trans("site.description", "설명")}
                            </label>
                            <Input />
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    )
}