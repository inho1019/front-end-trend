import { twMerge } from "@shared/lib/utils/tw-merge";

interface HeaderProps {
    className?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
}

export const Header = ({ 
    className, 
    left = <div className="text-lg font-bold">FE Magazine</div>, 
    right, 
}: HeaderProps) => {

    return (
        <header className={twMerge("z-5 w-full fixed flex top-0 items-center justify-between p-10 bg-white shadow-md", className)}>
            {left}
            {right}
        </header>
    )
}