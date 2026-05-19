import { useEffect, useRef, type RefObject } from "react";

export function useClickAway<T extends HTMLElement>(
  callback: (e: MouseEvent) => void
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback(e);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [callback]);

  return ref;
}