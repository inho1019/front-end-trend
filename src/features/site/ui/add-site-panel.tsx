
import { addData } from "@shared/api";
import { CheckIcon, XIcon } from "@shared/assets";
import { useSite } from "@shared/lib/site";
import { twMerge, useTrans } from "@shared/lib/utils";
import type { Site } from "@shared/model/site";
import { Button, Input, Spinner } from "@shared/ui/common";
import { Panel } from "@shared/ui/panel"
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface AddSitePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddSitePanel = ({ isOpen, onClose }: AddSitePanelProps) => { 
    const trans = useTrans();
    const { data: siteData } = useSite();
    const [formState, setFormState] = useState<"idle" | "loading" | "error" | "duplication" | "copy" | "submit">("idle");

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (siteData?.find(site => site.url === formData.get("siteUrl"))) {
            setFormState("duplication")
            return;
        }
        const data: Site = {
            id: uuidv4(),
            name: formData.get("siteName") as string,
            url: formData.get("siteUrl") as string,
            link: formData.get("siteLink") as string,
            description: formData.get("siteDescription") as string,
            image: formData.get("siteImage") as string,
            type: {
                title: formData.get("typeTitle") as string,
                content: formData.get("typeContent") as string,
                link: formData.get("typeLink") as string,
                createdAt: formData.get("typeCreatedAt") as string,
                author: formData.get("typeAuthor") as string,
            }
        }
        const token = formData.get("token") as string;
        if (token) {
            setFormState("loading");
            try {
                await addData<Site>(import.meta.env.VITE_TARGET_PATH_SITE, token, data);
                setFormState("submit");
            } catch (error) {
                console.error("Error adding site:", error);
                setFormState("error");
            }
        } else {
            navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            setFormState("copy");
        }
    }, [siteData]);

    return (
        <Panel
            isOpen={isOpen}
            position="right"
            className="w-full h-[calc(100%-50px)] max-w-640 top-50 py-5 px-10 max-sm:px-5"
        >
            <div className="relative rounded-xl shadow-xl flex flex-col bg-white p-15 pb-30 h-full dark:bg-dark dark:shadow-[0_4px_8px_0_rgba(0,0,0,0.95)]">
                <div className="flex flex-col gap-20 h-full">
                    <div className="flex flex-row justify-between gap-5 pb-10 border-b border-b-gray-200">
                        <h1 className="text-xl font-semibold group-open:line-clamp-2 group-open:max-sm:line-clamp-1">
                            {trans("site.add", "사이트 등록")}
                        </h1>
                        <Button className="self-start" onClick={onClose}>
                            <XIcon />
                        </Button>
                    </div>
                    <form onChange={() => setFormState("idle")} onSubmit={handleSubmit} className="flex-1 flex flex-col gap-10 px-10 overflow-y-auto max-sm:px-0 pb-30">
                        <div className="flex flex-col gap-4">
                            <label className="w-fit pl-4 text-xs font-medium text-gray-700 dark:text-gray-300 required-label">
                                {trans("site.name", "사이트명")}
                            </label>
                            <Input 
                                disabled={formState === "loading"} 
                                required 
                                name="siteName" 
                                placeholder={trans("site.namePlaceholder", "사이트명을 입력하세요")}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="w-fit pl-4 text-xs font-medium text-gray-700 dark:text-gray-300 required-label">
                                {trans("site.url", "RSS 주소")}
                            </label>
                            <Input 
                                disabled={formState === "loading"} 
                                required 
                                name="siteUrl" 
                                placeholder={trans("site.urlPlaceholder", "사이트의 RSS 주소를 입력하세요")}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                                {trans("site.link", "사이트 주소")}
                            </label>
                            <Input 
                                disabled={formState === "loading"} 
                                name="siteLink" 
                                placeholder={trans("site.linkPlaceholder", "사이트의 주소를 입력하세요")}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                                {trans("site.description", "설명")}
                            </label>
                            <Input 
                                disabled={formState === "loading"} 
                                name="siteDescription"
                                placeholder={trans("site.descriptionPlaceholder", "사이트에 대한 설명을 입력하세요")}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                                {trans("site.image", "이미지")}
                            </label>
                            <Input 
                                disabled={formState === "loading"} 
                                name="siteImage"
                                placeholder={trans("site.imagePlaceholder", "사이트의 썸네일 주소를 입력하세요")}
                            />
                        </div>
                        <fieldset className="border border-gray-300 rounded-md p-15 flex flex-col gap-10">
                            <legend className="text-sm text-gray-700 dark:text-gray-300">{trans("site.type", "타입")}</legend>
                            <div className="flex flex-col gap-4">
                                <label className="w-fit pl-4 text-xs font-medium text-gray-700 dark:text-gray-300 required-label">
                                    {trans("site.typeTitle", "제목")}
                                </label>
                                <Input 
                                    disabled={formState === "loading"} 
                                    required 
                                    name="typeTitle"
                                    placeholder={trans("site.typeTitlePlaceholder", "일반적으로 title이 사용됩니다")}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="w-fit pl-4 text-xs font-medium text-gray-700 dark:text-gray-300 required-label">
                                    {trans("site.typeContent", "내용")}
                                </label>
                                <Input 
                                    disabled={formState === "loading"} 
                                    required 
                                    name="typeContent"
                                    placeholder={trans("site.typeContentPlaceholder", "일반적으로 content, content:encoded가 사용됩니다")}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="w-fit pl-4 text-xs font-medium text-gray-700 dark:text-gray-300 required-label">
                                    {trans("site.typeCreatedAt", "작성일")}
                                </label>
                                <Input 
                                    disabled={formState === "loading"} 
                                    required 
                                    name="typeCreatedAt" 
                                    placeholder={trans("site.typeCreatedAtPlaceholder", "일반적으로 isoDate, pubDate가 사용됩니다")}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="pl-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                                    {trans("site.typeAuthor", "작성자")}
                                </label>
                                <Input 
                                    disabled={formState === "loading"} 
                                    name="typeAuthor"
                                    placeholder={trans("site.typeAuthorPlaceholder", "일반적으로 author, creator가 사용됩니다")}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="pl-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                                    {trans("site.typeLink", "글 주소")}
                                </label>
                                <Input 
                                    disabled={formState === "loading"} 
                                    name="typeLink"
                                    placeholder={trans("site.typeLinkPlaceholder", "일반적으로 link가 사용됩니다")}
                                />
                            </div>
                        </fieldset>
                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                                {trans("site.token", "토큰")}
                            </label>
                            <Input 
                                disabled={formState === "loading"} 
                                name="token" 
                                placeholder={trans("site.tokenPlaceholder", "깃허브 토큰을 입력해주세요")}
                            />
                        </div>
                        <p className="text-xs font-light">
                            {trans("site.helper", "*토큰 유뮤에 대한 설명")}
                        </p>
                        <Button 
                            disabled={formState !== "idle"} 
                            className={twMerge(
                                "text-white text-sm font-medium bg-gray-900 dark:text-black dark:bg-gray-100 rounded-sm px-16 py-8 flex flex-row gap-2 items-center justify-center self-end disabled:bg-gray-500",
                                (formState === "error" || formState === "duplication") && "disabled:bg-red-500 dark:disabled:text-white",
                            )} 
                            type="submit">
                            {(() => {
                                switch (formState) {
                                    case "loading":
                                        return <Spinner className="size-20 border-3" />;
                                    case "error":
                                        return trans("common.error", "오류");
                                    case "duplication":
                                        return trans("site.duplication", "중복");
                                    case "copy":
                                        return (
                                            <>
                                                {trans("site.copy", "복사")}
                                                <CheckIcon/>
                                            </>
                                        )
                                    case "submit":
                                        return (
                                            <>
                                                {trans("common.complete", "완료")}
                                                <CheckIcon/>
                                            </>
                                        )
                                    default:
                                        return trans("common.submit", "등록");
                                }
                            })()}
                        </Button>
                    </form>
                </div>
            </div>
        </Panel>
    )
}