import { CircleXIcon, LogoCircleIcon, SearchIcon } from "@shared/assets";
import { useData } from "@shared/lib/data";
import { twMerge } from "@shared/lib/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router";

interface TrendSearchProps {
    className?: string;
}

export const TrendSearch = ({ className }: TrendSearchProps) => {
    const navigate = useNavigate();
    const { search, setSearch, setSiteIds } = useData();

    const handleResetAll = useCallback(() => {
        setSearch("");
        setSiteIds([]);
        navigate("/");
    }, [navigate, setSearch, setSiteIds]);

    return (
        <div className={twMerge("relative text-black flex flex-1 flex-row gap-5 items-center max-w-250 rounded-full bg-gray-100 p-4 pr-12 dark:bg-[#222] dark:text-white", className)}>
            <button onClick={handleResetAll} className="cursor-pointer active:opacity-70 transition-opacity">
                <LogoCircleIcon />
            </button>
            <input
                type="text" 
                className="outline-none text-sm flex-1 w-full"
                onChange={(e) => setSearch(e.target.value)} 
                value={search} 
            />
            {
                search && (
                    <button onClick={() => setSearch("")} className="cursor-pointer">
                        <CircleXIcon />
                    </button>
                )
            }
            <SearchIcon />
        </div>
    );
}