import { twMerge } from "@shared/lib/utils";

interface SpinnerProps {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        "size-32 animate-spin rounded-full border-4 border-gray-200 border-t-black",
        className,
      )}
    />
  );
};
