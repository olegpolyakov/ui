import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react';

import { cn as ccn } from '../../component';
import type { BaseColor, ComponentProps, Shadow, Shape, Size, SizeExtended, Slotted } from '../../types';
import { cn } from '../../utils';

import Button, { type ButtonProps } from '../Button';
import Heading, { HeadingProps } from '../Heading';
import Modal from '../Modal';
import Slot from '../Slot';
import Transition from '../Transition';

import styles from './Dialog.module.scss';

export type DialogProps = {
    open?: boolean;
    title?: Slotted<HeadingProps>;
    content?: ReactNode;
    closeButton?: Slotted<ButtonProps>;
    closeButtonPosition?: 'inside' | 'outside';
    closeOnClickOutside?: boolean;
    disableScroll?: boolean;
    color?: BaseColor;
    size?: Size;
    shape?: Exclude<Shape, 'circular'>;
    shadow?: Shadow;
    onClose: () => void;
};

const sizeMap: Record<Size, SizeExtended> = {
    s: 'xs',
    m: 's',
    l: 'm'
};

Dialog.displayName = 'Dialog';

export default function Dialog({
    className,
    children,

    open,
    title,
    content = children,
    closeButton = { icon: 'close' },
    closeButtonPosition = 'inside',
    closeOnClickOutside = false,
    disableScroll,
    color,
    size = 'm',
    shape,
    shadow,
    onClose,
    ...props
}: ComponentProps<DialogProps, 'div'>) {
    const surfaceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleRootClick = useCallback(() => {
        if (closeOnClickOutside) {
            onClose();
        }
    }, [closeOnClickOutside, onClose]);

    const handleSurfaceClick = useCallback((event: MouseEvent) => {
        if (closeOnClickOutside) {
            event.stopPropagation();
        }
    }, [closeOnClickOutside]);

    const rootClassNames = cn(
        className,
        styles.root,
        styles[size]
    );
    const surfaceClassNames = ccn(styles.surface, {
        root: false,
        color,
        shape,
        shadow
    }, styles);

    return (
        <Modal
            open={open}
            disableScroll={disableScroll}
            backdrop
            fixed
        >
            <div
                className={rootClassNames}
                role="dialog"
                data-open={open ? true : undefined}
                tabIndex={-1}
                onClick={handleRootClick}
                {...props}
            >
                <Transition
                    nodeRef={surfaceRef}
                    in={open}
                    type="scale"
                    timeout={200}
                    appear
                    onExited={onClose}
                >
                    <div
                        ref={surfaceRef}
                        className={surfaceClassNames} 
                        onClick={handleSurfaceClick}
                    >
                        {title &&
                            <Slot
                                fallback={Heading}
                                className={styles.title}
                                size={sizeMap[size]}
                            >
                                {title}
                            </Slot>
                        }

                        <div className={styles.content}>
                            {content}
                        </div>

                        {closeButton && 
                            <Slot
                                fallback={Button}
                                className={cn(styles.closeButton, styles[`close-button-${closeButtonPosition}`])}
                                icon="close"
                                size={sizeMap[size]}
                                variant={closeButtonPosition === 'inside' ? 'plain' : 'plain'}
                                aria-label="Close dialog"
                                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                    event.stopPropagation();
                                    onClose();
                                }}
                            />
                        }
                    </div>
                </Transition>
            </div>
        </Modal>
    );
}