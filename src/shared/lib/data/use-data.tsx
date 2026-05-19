import { useContext } from "react";
import { DataContext } from "./use-data-context";

export const useData = () => {
    const data = useContext(DataContext);
    if (!data) {
        throw new Error("useData must be used within a DataProvider");
    }

    return data;
}