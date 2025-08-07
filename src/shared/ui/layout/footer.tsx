import { GithubIcon, MailIcon, TistoryIcon } from "@shared/assets";
import { Link } from "react-router";
import { Button } from "../common";

export const Footer = () => {
    return (
        <footer className="shrink-0 h-100 border-t border-t-gray-200 mx-10 flex flex-col gap-5 items-center justify-center max-sm:h-80">
            <div className="flex flex-row gap-10">
                <Link to="https://github.com/inho1019/front-end-trend" className="size-24 bg-white rounded-sm flex items-center justify-center active:opacity-70 transition-opacity max-sm:size-22" draggable="false" target="_blank" rel="noopener noreferrer">
                    <GithubIcon />
                </Link>
                <Link to="https://inho-m.tistory.com/" className="size-24 bg-white rounded-sm flex items-center justify-center active:opacity-70 transition-opacity max-sm:size-22" draggable="false" target="_blank" rel="noopener noreferrer">
                    <TistoryIcon />
                </Link>
                <Button
                    className="size-24 bg-white rounded-sm flex items-center justify-center max-sm:size-22"
                    draggable="false"
                    onClick={() => window.open("mailto:inho1019@gmail.com")}
                >
                    <MailIcon />
                </Button>
            </div>
            <code className="text-xs max-sm:text-[0.625rem] font-sans">© 2025 inho_m | inho1019@gmail.com</code>
        </footer>
    )
};