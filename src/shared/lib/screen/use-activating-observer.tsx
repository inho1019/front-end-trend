import { useEffect, type DependencyList, type RefObject } from 'react';
import { useScreen } from './use-screen';

export const useActivatingObserver = (ref: RefObject<HTMLElement | null>, deps?: DependencyList) => {
    const { activatingRef } = useScreen();

    useEffect(() => {
        const element = ref.current;
        const activatingElement = activatingRef?.current;
        if (!element || !activatingElement) return;

        let timeoutId: NodeJS.Timeout | null = null;

        const handleScroll = () => {
            activatingElement.ariaHidden = "true";
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => activatingElement.ariaHidden = "false", 300);
        };

        element.addEventListener('scroll', handleScroll);

        return () => {
            element.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [ref, deps, activatingRef]);
};