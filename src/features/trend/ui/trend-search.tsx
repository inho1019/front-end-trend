import { CircleXIcon, SearchIcon } from "@shared/assets";
import { useData } from "@shared/lib/data";
import { twMerge } from "@shared/lib/utils";

interface TrendSearchProps {
    className?: string;
}

export const TrendSearch = ({ className }: TrendSearchProps) => {
    const { search, setSearch } = useData();

    return (
        <div className={twMerge("relative text-black flex flex-1 flex-row gap-5 items-center max-w-250 rounded-full bg-white border-1 border-black py-2 px-10", className)}>
            <input type="text" className="outline-none text-sm flex-1 w-full" onChange={(e) => setSearch(e.target.value)} value={search} />
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