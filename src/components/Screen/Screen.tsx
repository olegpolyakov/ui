import type { ComponentProps, ElementType } from '../../types';
import { cn } from '../../utils';

import styles from './Screen.module.scss';

export type ScreenProps = {
    full?: boolean;
};

Screen.displayName = 'Screen';

export default function Screen<T extends ElementType = 'div'>({
    as,
    className,

    full,
    ...props
}: ComponentProps<ScreenProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        styles.root,
        full && styles.full
    );

    return (
        <Root className={classNames} {...props} />
    );
}