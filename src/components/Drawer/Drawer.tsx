import { ReactNode, useCallback, useRef, type MouseEventHandler } from 'react';

import { cn as ccn } from '../../component';
import type { BaseColor, ComponentProps, ElementType, Shadow, Shape, Size, SizeExtended, Slotted } from '../../types';

import { isBoolean, isObject } from '../../utils';
import Button, { ButtonProps } from '../Button';
import Heading, { HeadingProps } from '../Heading';
import Modal from '../Modal';
import Scrollable, { ScrollableProps } from '../Scrollable';
import Slot from '../Slot';
import Transition from '../Transition';

import styles from './Drawer.module.scss';

export type DrawerProps = {
    open?: boolean;
    title?: Slotted<HeadingProps>;
    header?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    closeButton?: Slotted<ButtonProps>;
    type?: 'inline' | 'overlay' | 'modal';
    position?: 'left' | 'right' | 'top' | 'bottom';
    color?: BaseColor;
    size?: Size;
    shape?: Exclude<Shape, 'circular'>;
    shadow?: Shadow;
    backdrop?: boolean;
    inset?: boolean;
    scrollable?: boolean | ScrollableProps;
    closeOnClickOutside?: boolean;
    onClose?: () => void;
};

const sizeMap: Record<Size, SizeExtended> = {
    s: 'xs',
    m: 's',
    l: 'm'
};

Drawer.displayName = 'Drawer';

export default function Drawer<T extends ElementType = 'div'>({
    as,
    className,
    children,

    open,
    title,
    header,
    content = children,
    footer,
    closeButton = { icon: 'close' },
    type = 'inline',
    position = 'left',
    color,
    size,
    shadow,
    shape,
    backdrop = true,
    inset = false,
    scrollable = true,
    closeOnClickOutside = false,
    onClose,
    ...props
}: ComponentProps<DrawerProps, T>) {
    const surfaceRef = useRef<HTMLDivElement>(null);

    const handleRootClick = useCallback(() => {
        if (closeOnClickOutside) {
            onClose?.();
        }
    }, [closeOnClickOutside, onClose]);
    
    const handleSurfaceClick = useCallback<MouseEventHandler<HTMLDivElement>>(event => {
        if (closeOnClickOutside) {
            event.stopPropagation();
        }
    }, [closeOnClickOutside]);

    if (type === 'inline' && !open) {
        return null;
    }

    const Component = as || 'div';
    const rootClassNames = ccn(className, {
        [type]: type,
        [position]: position,
        color,
        size,
        inset
    }, styles);
    const surfaceClassNames = ccn(styles.surface, {
        root: false,
        shape,
        shadow: shadow && position === 'bottom' ? `shadow-${shadow}-` as Shadow : shadow
    }, styles);

    const rootContent = (
        <Component
            className={rootClassNames}
            tabIndex={-1}
            data-open={open ? true : undefined}
            data-position={position}
            onClick={handleRootClick}
            {...props}
        >
            <Transition
                nodeRef={surfaceRef}
                in={open}
                timeout={200}
                type={`slide-${position}`}
                appear
                disabled={type === 'inline'}
            >
                <div
                    ref={surfaceRef}
                    className={surfaceClassNames}
                    onClick={handleSurfaceClick}
                >
                    {(title || header) &&
                        <div className={styles.header}>
                            {title &&
                                <Slot
                                    fallback={Heading}
                                    className={styles.title}
                                    size={sizeMap[size ?? 'm']}
                                >
                                    {title}
                                </Slot>
                            }

                            {header}

                            {closeButton && 
                                <Slot
                                    fallback={Button}
                                    className={styles.closeButton}
                                    icon="close"
                                    size={sizeMap[size ?? 'm']}
                                    aria-label="Close dialog"
                                    onClick={onClose}
                                />
                            }
                        </div>
                    }

                    {isBoolean(scrollable) ?
                        <Scrollable className={styles.content}>
                            {content}
                        </Scrollable> :
                        isObject(scrollable) ?
                            <Scrollable className={styles.content} {...scrollable}>
                                {content}
                            </Scrollable> :
                            <div className={styles.content}>
                                {content}
                            </div>
                    }

                    {footer &&
                        <div className={styles.footer}>
                            {footer}
                        </div>
                    }
                </div>
            </Transition>
        </Component>
    );

    return type === 'modal' ?
        <Modal
            open={open}
            backdrop={backdrop}
            fixed
        >
            {rootContent}
        </Modal> :
        rootContent;
}