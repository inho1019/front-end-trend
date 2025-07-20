import { twMerge } from "@shared/lib/utils/tw-merge";

interface MainContainerProps extends React.PropsWithChildren {
    className?: string;
}

export const MainContainer = ({ className, children } : MainContainerProps) => {

    return (
        <main className={twMerge("relative flex flex-col w-full max-w-940 mx-auto p-15 max-sm:p-10", className)}>
            {children}
        </main>
    )
}

export default MainContainer;