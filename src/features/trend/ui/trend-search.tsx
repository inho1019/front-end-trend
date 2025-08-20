import { CircleXIcon, LogoCircleIcon, SearchIcon } from "@shared/assets";
import { useData } from "@shared/lib/data";
import { useScreen } from "@shared/lib/screen";
import { twMerge, useDebounce } from "@shared/lib/utils";
import { Button } from "@shared/ui/common";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const TrendSearch = () => {
    const navigate = useNavigate();
    const { search, setSearch, setSiteIds, setIsFavorite } = useData();
    const [searchValue, setSearchValue] = useState(search);
    const searchDebounce = useDebounce(searchValue, 300);

    const { scrollTop } = useScreen()

    const handleResetAll = useCallback(() => {
        setSearch("");
        setSiteIds([]);
        setIsFavorite(false);
        navigate("/");
    }, [navigate, setIsFavorite, setSearch, setSiteIds]);

    useEffect(() => {
        if (searchDebounce !== search) {
            setSearch(searchDebounce);
        }
    }, [search, searchDebounce, setSearch]);

    return (
        <div 
            aria-expanded={scrollTop > 15}
            className={
                twMerge(
                    "relative transition-all duration-500 text-black flex flex-1 flex-row gap-5 items-center max-w-250 rounded-full bg-gray-100 py-4 pl-29 pr-12 dark:bg-[#222] dark:text-white min-2xl:max-w-480 min-2xl:duration-700",
                    "aria-expanded:max-w-full aria-expanded:min-2xl:max-w-full aria-expanded:bg-white dark:aria-expanded:bg-dark aria-expanded:gap-10 aria-expanded:pl-20 max-sm:aria-expanded:pl-10 aria-expanded:pr-0 min-sm:aria-expanded:ml-10",
            )}>
            <div aria-hidden={scrollTop < 16} className="absolute left-0 h-20 w-1 bg-current aria-hidden:opacity-0"/>
            <Button disabled={scrollTop > 15} onClick={handleResetAll} className="left-4 top-4 absolute disabled:opacity-0 disabled:w-5 disabled:pointer-events-none transition-opacity duration-300">
                <LogoCircleIcon />
            </Button>
            <input
                type="text" 
                className="outline-none text-sm flex-1 w-full"
                onChange={(e) => setSearchValue(e.target.value)} 
                value={searchValue} 
            />
            {
                searchValue && (
                    <Button onClick={() => setSearchValue("")}>
                        <CircleXIcon />
                    </Button>
                )
            }
            <SearchIcon />
        </div>
    );
}