import { twMerge } from "@shared/lib/utils";
import type { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

type ToggleLayoutProps<T extends ElementType> = {
    as?: T;
    children?: ReactNode;
    className?: string;
} & ComponentPropsWithoutRef<T>;

export const ToggleLayout = <T extends ElementType = "div">({
    as,
    children,
    className,
    ...props
}: ToggleLayoutProps<T>) => {
    const Component = as || "div";
    return (
        <Component
            {...props}
            className={twMerge(
                "flex-1 rounded-md border-1 border-gray-700 flex items-center justify-center cursor-pointer min-sm:hover:border-gray-400 transition-colors active:opacity-70 dark:border-gray-200",
                className
            )}
        >
            {children}
        </Component>
    );
};