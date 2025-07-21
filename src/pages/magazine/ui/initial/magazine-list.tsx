import { LoadingComponent } from "@features/common";
import { MagazineItem, MagazinePanel } from "@features/magazine";
import { useData } from "@shared/lib/data";
import type { ParserData } from "@shared/model/parser";
import { useCallback, useState } from "react";


export const MagazineList = () => {
    const { data, loading } = useData();

    const [selectedData, setSelectedData] = useState<ParserData | null>(null);

    const handleClickItem = useCallback((data: ParserData) => {
        setSelectedData(data);
    }, []);

    const handleClosePanel = useCallback(() => {
        setSelectedData(null);
    }, []);
    
    return (
        <>
            {
                loading ? (
                    <LoadingComponent className="pb-40" /> 
                ) : (
                    <section className="flex flex-col divide-y-1 divide-gray-200">
                        {
                            data?.map((item, index) => (
                                <MagazineItem 
                                    key={index} 
                                    data={item}
                                    onClick={() => handleClickItem(item)}
                                    className="cursor-pointer py-15 px-10" 
                                />
                            ))
                        }
                    </section>
                )
            }
            <MagazinePanel isOpen={!!selectedData} data={selectedData} onClose={handleClosePanel} />
        </>
    );
}