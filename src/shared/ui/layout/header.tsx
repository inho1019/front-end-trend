import { twMerge } from "@shared/lib/utils";
interface HeaderProps {
    className?: string;
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

export const Header = ({ 
    className, 
    left = <div className="text-lg font-['TheJamsil5Bold']">FE Trend</div>,
    center,
    right, 
}: HeaderProps) => {
    return (
        <header className={twMerge("min-h-50 z-5 w-full sticky flex top-0 items-center justify-between p-10 bg-white shadow-sm dark:bg-dark dark:shadow-[0_1px_8px_0_rgba(0,0,0,0.95)]", className)}>
            {left}
            {center}
            {right}
        </header>
    )
}