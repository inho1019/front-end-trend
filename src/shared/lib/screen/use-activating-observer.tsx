import { useEffect, type DependencyList, type RefObject } from 'react';
import { useScreen } from './use-screen';
import { useGoogleTranslate } from '@features/google-translate';

export const useActivatingObserver = (ref: RefObject<HTMLElement | null>, deps?: DependencyList) => {
    const { setActivating } = useScreen();
    const { isEnabled } = useGoogleTranslate();

    useEffect(() => {
        if (isEnabled) return;
        const element = ref.current;
        if (!element) return;

        let timeoutId: NodeJS.Timeout | null = null;

        const handleScroll = () => {
            setActivating(true);
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setActivating(false), 300);
        };

        element.addEventListener('scroll', handleScroll);

        return () => {
            element.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [ref, setActivating, deps, isEnabled]);
};