import { useContext, useEffect, useRef } from 'react';

import { cn } from '../../component';
import type { PropsWithChildren } from '../../types';

import Portal from '../Portal';
import { ProviderContext } from '../Provider';
import Transition from '../Transition';

import styles from './Modal.module.scss';

export type ModalProps = PropsWithChildren<{
    container?: HTMLElement;
    backdrop?: boolean;
    fixed?: boolean;
    open?: boolean;
    disableScroll?: boolean;
}>;

Modal.displayName = 'Modal';

export default function Modal({
    className,
    children,

    container,
    backdrop = false,
    fixed = false,
    open = false,
    disableScroll = true
}: ModalProps) {
    const { root } = useContext(ProviderContext);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || !disableScroll) return;

        document.body.classList.add(styles.scrollDisabled);

        return () => {
            document.body.classList.remove(styles.scrollDisabled);
        };
    }, [open, disableScroll]);

    useEffect(() => {
        const activeElement = document.activeElement as HTMLElement;
        const firstChild = modalRef.current?.firstChild as HTMLElement;

        firstChild?.focus?.();

        return () => {
            firstChild?.blur?.();
            activeElement?.focus?.();
        };
    }, []);

    const classNames = cn(
        className,
        { backdrop, fixed },
        styles
    );

    return (
        <Portal container={root ?? container}>
            <Transition
                in={open}
                nodeRef={modalRef}
                type="fade"
                timeout={200}
                unmountOnExit
            >
                <div
                    ref={modalRef}
                    className={classNames}
                    data-open={open ? true : undefined}
                >
                    {children}
                </div>
            </Transition>
        </Portal>
    );
}