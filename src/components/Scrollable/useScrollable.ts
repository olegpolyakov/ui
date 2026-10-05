import { useEffect, useRef } from 'react';

import styles from './Scrollable.module.scss';

export default function useScrollable<T extends HTMLElement>(element: T | null = null) {
    const ref = useRef<T>(element);

    useEffect(() => {
        if (!ref.current) return;
 
        const element = ref.current;
            
        function observe() {
            const hasScrollbar = element.scrollHeight > element.clientHeight;
            element.toggleAttribute('data-scrolling', hasScrollbar);
        }
            
        observe();
            
        const resizeObserver = new ResizeObserver(observe);
        
        resizeObserver.observe(element);
            
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!ref.current) return;
        
        const element = ref.current;

        function handleScroll() {
            updateScrollFades(element);
        }

        element.addEventListener('scroll', handleScroll);

        updateScrollFades(element);

        return () => {
            element.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return ref;
}

const THRESHOLD = 2; // A small buffer to account for any rounding issues

function updateScrollFades(element: HTMLElement) {
    const scrollTop = element.scrollTop;
    const maxScroll = element.scrollHeight - element.clientHeight; 

    // check if scrolled to the top
    if (scrollTop > THRESHOLD) {
        element.classList.add(styles.topFade);
    } else {
        element.classList.remove(styles.topFade);
    }

    // check if scrolled to the bottom
    if (maxScroll - scrollTop > THRESHOLD) {
        element.classList.add(styles.bottomFade);
    } else {
        element.classList.remove(styles.bottomFade);
    }
}