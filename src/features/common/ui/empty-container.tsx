import { twMerge, useTrans } from "@shared/lib/utils";

interface EmptyContainerProps {
  className?: string;
};

export const EmptyContainer = ({ className }: EmptyContainerProps) => {
    const { trans } = useTrans();

    return (
        <div className={twMerge("flex items-center justify-center text-2xl text-gray-300 font-medium h-full", className)}>
            {trans("magazine.empty", "데이터를 찾을 수 없습니다")}
        </div>
    );
}