import { SearchIcon } from "@shared/assets";
import { useData } from "@shared/lib/data";
import { twMerge } from "@shared/lib/utils/tw-merge";

interface MagazineSearchProps {
    className?: string;
}

export const MagazineSearch = ({ className }: MagazineSearchProps) => {
    const { handleSearch } = useData();

    return (
        <div className={twMerge("relative flex flex-1 flex-row gap-5 items-center max-w-250 rounded-full bg-white border-1 border-black py-2 px-10", className)}>
            <input type="text" className="outline-none text-sm flex-1 w-full" onChange={(e) => handleSearch(e.target.value)} />
            <SearchIcon />
        </div>
    );
}