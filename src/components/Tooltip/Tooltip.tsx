import {
    type ComponentPropsWithRef,
    type MouseEvent,
    type MouseEventHandler,
    type ReactElement,
    type ReactNode,
    cloneElement,
    isValidElement,
    useCallback,
    useState,
    useRef,
    Fragment
} from 'react';

import {
    Placement,
    Strategy,
    autoUpdate,
    arrow,
    flip,
    offset,
    shift,
    useFloating
} from '@floating-ui/react';

import { cn } from '../../component';
import  { ComponentProps } from '../../types';
import { isFunction } from '../../utils';

import styles from './Tooltip.module.scss';

export type TooltipProps = {
    content: ReactNode;
    arrow?: boolean;
    position?: Strategy;
    placement?: Placement;
};

Tooltip.displayName = 'Tooltip';

export default function Tooltip({
    className,
    children,

    content = children,
    position = 'fixed',
    placement = 'bottom',
    arrow: showArrow = true
}: ComponentProps<TooltipProps, 'div'>) {
    const arrowRef = useRef<SVGSVGElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const [isOpen, setOpen] = useState(false);

    const {
        refs,
        floatingStyles,
        placement: currentPlacement,
        middlewareData
    } = useFloating({
        strategy: position,
        placement,
        whileElementsMounted: autoUpdate,
        open: isOpen,
        onOpenChange: setOpen,
        middleware: [
            flip(),
            shift(),
            offset(8),
            showArrow && arrow({
                element: arrowRef
            })
        ].filter(Boolean)
    });

    const handleTargetMouseEnter = useCallback<MouseEventHandler<HTMLDivElement>>(event => {
        timeoutRef.current = window.setTimeout(() => {
            setOpen(true);
        }, 500);

        if (
            isValidElement<{onMouseEnter: MouseEventHandler<HTMLDivElement>}>(children) &&
            isFunction(children.props.onMouseEnter)
        ) {
            children.props.onMouseEnter(event);
        }
    }, [children, setOpen]);

    const handleTargetMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>(event => {
        setOpen(false);

        window.clearTimeout(timeoutRef.current!);
        timeoutRef.current = null;

        if (
            isValidElement<{onMouseLeave: MouseEventHandler<HTMLDivElement>}>(children) &&
            isFunction(children.props.onMouseLeave)
        ) {
            children.props.onMouseLeave(event);
        }
    }, [children, setOpen]);
    
    const handleTargetClick = useCallback<MouseEventHandler<HTMLDivElement>>(event => {
        window.clearTimeout(timeoutRef.current!);

        if (
            isValidElement<{onClick: MouseEventHandler<HTMLDivElement>}>(children) &&
            isFunction(children.props.onClick)
        ) {
            children.props.onClick(event);
        }
    }, [children]);

    const handleTooltipMouseEnter = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();

        setOpen(true);
    }, [setOpen]);

    const handleTooltipMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();

        setOpen(false);
    }, [setOpen]);

    const classNames = cn(
        className,
        { [currentPlacement]: currentPlacement },
        styles
    );

    return (
        <Fragment>
            {isValidElement(children) ?
                cloneElement(children as ReactElement<ComponentPropsWithRef<'div'>>, {
                    ref: refs.setReference,
                    onMouseEnter: handleTargetMouseEnter,
                    onMouseLeave: handleTargetMouseLeave,
                    onClick: handleTargetClick
                })
                :
                <div
                    ref={refs.setReference}
                    onMouseEnter={handleTargetMouseEnter}
                    onMouseLeave={handleTargetMouseLeave}
                >
                    {children}
                </div>
            }

            {isOpen &&
                <div
                    ref={refs.setFloating}
                    className={classNames}
                    style={floatingStyles}
                    data-placement={currentPlacement}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                >
                    <svg
                        ref={arrowRef}
                        className={styles.arrow}
                        viewBox="0 0 12 6"
                        xmlns="http://www.w3.org/2000/svg"
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

                    {content}
                </div>
            }
        </Fragment>
    );
}