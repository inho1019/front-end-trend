import { useEffect, type RefObject } from 'react';
import { useScreen } from './use-screen';

export const useScrollingObserver = (ref: RefObject<HTMLElement | null>) => {
    const { setScrolling } = useScreen();

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let timeoutId: NodeJS.Timeout | null = null;

        const handleScroll = () => {
            setScrolling(true);
            console.log("Scrolling detected");
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setScrolling(false), 300);
        };

        element.addEventListener('scroll', handleScroll);

        return () => {
            element.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [ref, setScrolling]);
};