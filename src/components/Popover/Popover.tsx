import {
    type HTMLAttributes,
    type MouseEvent as ReactMouseEvent,
    type ReactElement,
    type ReactNode,
    type RefAttributes,
    type RefObject,
    type SyntheticEvent,
    cloneElement,
    isValidElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    Fragment
} from 'react';

import {
    Middleware,
    Placement,
    VirtualElement,
    autoUpdate,
    arrow,
    offset,
    useFloating
} from '@floating-ui/react';

import { cn } from '../../component';
import type { PropsWithChildren, Size } from '../../types';

import Portal from '../Portal';

import styles from './Popover.module.scss';

export type { Placement, VirtualElement };

export type PopoverTrigger = 
    ReactElement<RefAttributes<HTMLElement> & 
    HTMLAttributes<HTMLElement> & 
    {
        active?: boolean;
        disabled?: boolean;
        onClick?: (event: ReactMouseEvent) => void;
    }>;

export type PopoverProps = PropsWithChildren<{
    containerElement?: HTMLElement;
    anchorRef?: RefObject<Element | null>;
    anchorElement?: Element | null;
    placement?: Placement;
    fallbackPlacements?: Placement[];
    trigger?: PopoverTrigger;
    content?: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    arrow?: boolean;
    offset?: number;
    size?: Size;
    variant?: 'filled' | 'outlined';
    disabled?: boolean;
    attached?: boolean;
    unstyled?: boolean;
    middleware?: Middleware[];
    onOpen?: (placement: Placement) => void;
    onClose?: () => void;
    onOpenChange?: (isOpen: boolean, event?: SyntheticEvent | KeyboardEvent | MouseEvent) => void;
}>;

Popover.displayName = 'Popover';

export default function Popover({
    children,
    className,

    trigger,
    content = children,
    containerElement,
    anchorRef,
    anchorElement = anchorRef?.current,
    placement,
    open,
    defaultOpen = false,
    arrow: showArrow = true,
    offset: _offsetValue = 0,
    size,
    variant,
    attached,
    disabled,
    unstyled,
    middleware = [],
    onOpen,
    onClose
}: PopoverProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const surfaceRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);

    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    const offsetValue = Number.parseInt(_offsetValue.toString());

    const {
        refs,
        placement: internalPlacement,
        floatingStyles,
        middlewareData
    } = useFloating({
        placement,
        open: internalOpen,
        onOpenChange: setInternalOpen,
        elements: anchorElement ? {
            reference: anchorElement,
            floating: surfaceRef.current
        } : undefined,
        middleware: [
            offsetValue !== undefined
                ? offset(showArrow
                    ? offsetValue + 10
                    : offsetValue
                )
                : undefined,
            showArrow && arrow({
                element: arrowRef
            }),
            ...middleware
        ].filter(Boolean),
        whileElementsMounted: autoUpdate
    });

    const isUncontrolled = open === undefined;

    useLayoutEffect(() => {
        if (!open && !internalOpen) return;

        if (document.body.style.overflow === 'hidden') return;

        const bodyWidthBefore = document.body.clientWidth;

        document.body.style.overflow = 'hidden';

        const bodyWidthAfter = document.body.clientWidth;

        if (bodyWidthBefore !== bodyWidthAfter) {
            document.body.style.marginRight = Math.abs(bodyWidthAfter - bodyWidthBefore) + 'px';
        }

        return () => {
            document.body.removeAttribute('style');
        };
    }, [open, internalOpen]);

    useEffect(() => {
        if (!open && !internalOpen) return;

        if (isUncontrolled) {
            setInternalOpen(true);
        }

        onOpen?.(internalPlacement);

        function handleClick(event: MouseEvent) {
            const target = event.target as Node;
            const fromPopover = contentRef.current?.contains(target);

            if (fromPopover) return;

            if (isUncontrolled) {
                setInternalOpen(false);
            }

            onClose?.();
        }

        const root = rootRef.current;

        root?.addEventListener('click', handleClick);

        return () => {
            root?.removeEventListener('click', handleClick);
        };
    }, [open, internalOpen, internalPlacement, isUncontrolled, onOpen, onClose]);

    const handleTriggerClick = useCallback((event: ReactMouseEvent) => {
        if (isUncontrolled) {
            setInternalOpen(true);
        }

        onOpen?.(internalPlacement);
        trigger?.props.onClick?.(event);
    }, [trigger, isUncontrolled, internalPlacement, setInternalOpen, onOpen]);

    const handlePopoverClick = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }, []);

    const classNames = cn(
        className,
        {
            size,
            [internalPlacement]: internalPlacement,
            attached,
            unstyled
        },
        styles
    );

    const surfaceClassNames = cn(
        styles.surface,
        { root: false, variant },
        styles
    );

    return (
        <Fragment>
            {isValidElement(trigger) &&
                cloneElement(trigger, {
                    ref: refs.setReference,
                    active: trigger.props.active ?? (open || internalOpen),
                    disabled: trigger.props.disabled ?? disabled,
                    onClick: handleTriggerClick
                })
            }

            {(open || internalOpen) &&
                <Portal container={containerElement}>
                    <div
                        ref={rootRef}
                        className={classNames}
                        data-open={internalOpen}
                        data-placement={internalPlacement}
                    >
                        <div
                            ref={refs.setFloating}
                            className={surfaceClassNames}
                            style={floatingStyles}
                            onClick={handlePopoverClick}
                        >
                            {!unstyled && showArrow &&
                                <svg
                                    width="12"
                                    height="6"
                                    viewBox="0 0 12 6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    ref={arrowRef}
                                    className={styles.arrow}
                                    style={middlewareData.arrow && {
                                        left: middlewareData.arrow.x,
                                        top: middlewareData.arrow.y
                                    }}
                                >
                                    <polygon
                                        points="6,0 12,6 0,6"
                                    />

                                    <line
                                        x1="0" y1="6"
                                        x2="6" y2="0"
                                        strokeWidth="1"
                                    />

                                    <line
                                        x1="12" y1="6"
                                        x2="6" y2="0"
                                        strokeWidth="1"
                                    />
                                </svg>
                            }

                            <div ref={contentRef} className={styles.content}>
                                {content}
                            </div>
                        </div>
                    </div>
                </Portal>
            }
        </Fragment>
    );
};