import { twMerge } from "@shared/lib/utils";
interface HeaderProps {
    className?: string;
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

export const Header = ({ 
    className, 
    left = <div className="text-lg font-bold">FE Trend</div>,
    center,
    right, 
}: HeaderProps) => {
    return (
        <header className={twMerge("z-5 w-full fixed flex top-0 items-center justify-between p-10 bg-white shadow-md dark:bg-dark dark:border-b dark:border-gray-200", className)}>
            {left}
            {center}
            {right}
        </header>
    )
}