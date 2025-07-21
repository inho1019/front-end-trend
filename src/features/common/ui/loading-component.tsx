import { twMerge } from "@shared/lib/utils/tw-merge";
import { Spinner } from "@shared/ui/common";

interface LoadingComponentProps {
  className?: string;
};

export const LoadingComponent = ({ className }: LoadingComponentProps) => {
  return (
    <div className={twMerge("flex items-center justify-center h-full", className)}>
      <Spinner className="size-64 border-8" />
    </div>
  );
}