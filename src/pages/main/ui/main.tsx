import { useDataContext } from "../../../shared/lib/data";
import { MainContainer } from "../../../shared/ui/layout";

const MainPage = () => {
    const data = useDataContext();
    
    return (
        <MainContainer>
            <div className="flex flex-col gap-20">
                {
                    data?.map((item, index) => (
                        <div key={index} className="my-4">
                            <h2 className="text-xl font-bold">{item.title}</h2>
                            <div 
                                dangerouslySetInnerHTML={{ __html: item.content }}
                                className="text-gray-700" 
                            />
                            <p className="text-sm text-gray-500">Created at: {item.createdAt.toLocaleString()}</p> 
                            {item.link && <a href={item.link} className="text-blue-500 hover:underline">Read more</a>}
                            {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="mt-2 w-32 h-32 object-cover" />}
                        </div> 
                    ))
                }
            </div>
        </MainContainer>
    );
}

export default MainPage;