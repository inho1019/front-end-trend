import { useEffect, type DependencyList, type RefObject } from 'react';
import { useScreen } from './use-screen';

export const useScrollingObserver = (ref: RefObject<HTMLElement | null>, deps?: DependencyList) => {
    const { setScrolling } = useScreen();

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let timeoutId: NodeJS.Timeout | null = null;

        const handleScroll = () => {
            setScrolling(true);
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setScrolling(false), 300);
        };

        element.addEventListener('scroll', handleScroll);

        return () => {
            element.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [ref, setScrolling, deps]);
};