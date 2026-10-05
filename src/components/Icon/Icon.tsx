import { cloneElement, isValidElement } from 'react';

import { cn } from '../../component';
import type { ComponentProps, ElementType, Opacity, SizeExtended, TextColor } from '../../types';
import { getFontVariationSettings } from './utils';

import styles from './Icon.module.scss';

export type IconProps = {
    name?: string;
    color?: TextColor | 'inherit';
    size?: SizeExtended;
    opacity?: Opacity;
    weight?: number | string;
    grade?: number | string;
    filled?: boolean;
    inline?: boolean;
};

Icon.displayName = 'Icon';

export default function Icon<T extends ElementType = 'i'>({
    as,
    children,
    className,

    name,
    color,
    size,
    opacity,
    weight,
    grade,
    filled = false,
    inline = false,
    ...props
}: ComponentProps<IconProps, T>) {
    const Root = as || 'i';
    const classNames = cn(
        className,
        { color, size, opacity, inline },
        styles
    );

    const fontVariationSettings = getFontVariationSettings(
        filled,
        weight,
        grade,
        Number.parseInt(styles[`size-${size}`])
    );

    const style = fontVariationSettings ? {
        fontVariationSettings
    } : undefined;

    return isValidElement<IconProps>(children)
        ? cloneElement<IconProps & { className?: string }>(children, {
            className: classNames
        }) : (
            <Root
                style={style}
                className={classNames}
                {...props}
            >
                {name || children}
            </Root>
        );
}