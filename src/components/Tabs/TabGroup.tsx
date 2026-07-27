import { cn, renderChildren } from '../../component';
import type { Align, ComponentProps, ElementType, PropsWithKey, Size } from '../../types';

import Tab, { TabProps } from './Tab';

import styles from './TabGroup.module.scss';

export type TabGroupProps = {
    tabs?: PropsWithKey<TabProps>[];
    align?: Align;
    fluid?: boolean;
    gap?: Size;
    color?: TabProps['color'];
    size?: TabProps['size'];
    shape?: TabProps['shape'];
    variant?: TabProps['variant'];
    activeColor?: TabProps['activeColor'];
    activeVariant?: TabProps['activeVariant'];
};

TabGroup.displayName = 'TabGroup';

export default function TabGroup<T extends ElementType = 'div'>({
    as,
    className,
    children,

    tabs = [],
    align,
    fluid,
    color,
    activeColor,
    size,
    shape,
    variant,
    activeVariant,
    gap = variant === 'underlined' ? undefined : 's',
    ...props
}: ComponentProps<TabGroupProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        {
            [`align-${align}`]: align,
            fluid,
            gap
        },
        styles
    );

    return (
        <Component className={classNames} {...props}>
            {renderChildren(children, tabs, Tab, {
                className: styles.tab,
                color,
                activeColor,
                size,
                shape,
                variant,
                activeVariant
            })}
        </Component>
    );
}