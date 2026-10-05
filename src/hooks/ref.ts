import { Ref, RefObject, useCallback } from 'react';

export function useComposedRef<T extends HTMLElement>(
    libRef: RefObject<T | null>,
    userRef?: Ref<T> | null
): (instance: T | null) => void {
    return useCallback(
        (instance: T | null) => {
            setRef(libRef, instance);
            setRef(userRef, instance);
        },
        [libRef, userRef]
    );
}

function setRef<T>(ref: Ref<T> | null | undefined, value: T | null) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref && 'current' in ref) {
        ref.current = value;
    }
}