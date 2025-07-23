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
                "flex-1 rounded-md border border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors active:opacity-70",
                className
            )}
        >
            {children}
        </Component>
    );
};