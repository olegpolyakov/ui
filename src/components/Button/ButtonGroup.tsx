import { cn, renderChildren } from '../../component';
import type { ComponentProps, ElementType, Orientation, PropsWithKey, Size } from '../../types';

import Button, { ButtonProps } from './Button';

import styles from './ButtonGroup.module.scss';

export type ButtonGroupProps = {
    buttons?: PropsWithKey<ButtonProps>[];
    orientation?: Orientation;
    gap?: Size;
    fluid?: boolean;
    joined?: boolean;
    color?: ButtonProps['color'];
    size?: ButtonProps['size'];
    shape?: ButtonProps['shape'];
    variant?: ButtonProps['variant'];
};

ButtonGroup.displayName = 'ButtonGroup';

export default function ButtonGroup<T extends ElementType = 'div'>({
    as,
    className,
    children,

    buttons = [],
    orientation = 'horizontal',
    fluid,
    joined,
    gap,
    color,
    size = 'm',
    shape,
    variant= 'plain',
    ...props
}: ComponentProps<ButtonGroupProps, T>) {
    const Root = as || 'div';
    const classNames = cn(className, {
        [orientation]: orientation,
        fluid,
        joined,
        gap
    }, styles);

    return (
        <Root
            className={classNames}
            {...props}
        >
            {renderChildren(children, buttons, Button, {
                className: styles.button,
                color,
                shape,
                size,
                variant
            })}
        </Root>
    );
}