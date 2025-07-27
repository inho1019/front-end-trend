import { twMerge } from "@shared/lib/utils";

export const Button = ({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className={twMerge("cursor-pointer active:opacity-70 transition-opacity disabled:cursor-not-allowed disabled:active:opacity-100", props.className)}>
            {props.children}
        </button>
    );
};
