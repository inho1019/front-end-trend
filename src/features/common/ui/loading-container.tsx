import { twMerge } from "@shared/lib/utils";
import { Spinner } from "@shared/ui/common";

interface LoadingContainerProps {
  className?: string;
};

export const LoadingContainer = ({ className }: LoadingContainerProps) => {
  return (
    <div className={twMerge("flex items-center justify-center h-full", className)}>
      <Spinner className="size-64 border-8 max-sm:size-48 max-sm:border-6" />
    </div>
  );
}