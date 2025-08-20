import { useScreen } from "@shared/lib/screen";
import { twMerge } from "@shared/lib/utils";
interface HeaderProps {
    className?: string;
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

export const Header = ({ 
    className, 
    left = <div className="text-lg font-jamsil">FE Trend</div>,
    center,
    right, 
}: HeaderProps) => {
    const { scrollTop } = useScreen();

    return (
        <>
            <header 
                className={
                    twMerge(
                        "min-h-50 z-5 w-full sticky flex top-0 items-center justify-between p-10 bg-white dark:bg-dark", 
                        className
                    )}>
                {left}
                {center}
                {right}
                <div aria-hidden={scrollTop < 16} className="transition-opacity duration-300 absolute bottom-0 left-0 w-full border-b aria-hidden:opacity-0" />
            </header>
        </>
    )
}