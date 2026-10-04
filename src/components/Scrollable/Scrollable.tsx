import type { ComponentProps } from '../../types';
import { cn } from '../../utils';

import useScrollable from './useScrollable';

import styles from './Scrollable.module.scss';

export type ScrollableProps = {
    height?: number;
    maxHeight?: number;
    disabled?: boolean;
    fade?: boolean;
    native?: boolean;
};

export default function Scrollable<T extends React.ElementType = 'div'>({
    as,
    children,
    className,

    height,
    maxHeight,
    disabled,
    fade,
    native,
    ...props
}: ComponentProps<ScrollableProps, T>) {
    const ref = useScrollable<HTMLDivElement>();
    
    const Root = as || 'div';
    const classNames = cn(
        className,
        styles.root,
        disabled && styles.disabled,
        fade && styles.fade,
        native && styles.native
    );
    const style = {
        height: height ? `${height}px` : undefined,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined
    };

    return (
        <Root
            ref={ref}
            className={classNames}
            style={style}
            data-scrollable
            {...props}
        >
            {children}
        </Root>
    );
}