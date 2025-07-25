import { twMerge } from "@shared/lib/utils";
import type { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input 
            type="text" 
            {...props} 
            className={twMerge(
                "border text-sm border-gray-300 rounded-md p-8 focus:outline-none focus:border-gray-600 dark:focus:border-white transition-colors disabled:bg-gray-50 dark:disabled:bg-[#222] placeholder:text-gray-400 dark:placeholder:text-gray-600", 
                props.className
            )} />
    );
}
