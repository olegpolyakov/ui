import { useMemo, type ReactElement } from 'react';

import { cn } from '../../component';
import type { ComponentProps, ElementType, Shape, Size, Variant } from '../../types';

import Item from '../Item';

import { flattenTree } from './helpers';
import type { FlattenedItem, Item as TreeItem } from './types';

import styles from './Tree.module.scss';

export type TreeProps = {
    items: TreeItem[];
    gap?: Size;
    size?: Size;
    shape?: Exclude<Shape, 'circular'>;
    variant?: Exclude<Variant, 'filled' | 'outlined-filled' | 'text'>;
    interactive?: boolean;
    renderItem?: (item: FlattenedItem) => ReactElement;
}

Tree.displayName = 'Tree';

export default function Tree<T extends ElementType = 'ul'>({
    as,
    className,

    items = [],
    gap,
    size,
    shape,
    variant,
    interactive,
    renderItem,
    ...props
}: ComponentProps<TreeProps, T>) {
    const flattenedItems = useMemo(() => flattenTree(items), [items]);

    const Component = as || 'ul';
    const classNames = cn(
        className,
        { gap, interactive: false },
        styles
    );

    return (
        <Component className={classNames} {...props}>
            {flattenedItems.map((item, index) => renderItem?.(item) ?? (
                <Item
                    key={item.id || index}
                    content={item.content}
                    size={size}
                    shape={shape}
                    variant={variant}
                    interactive={interactive}
                    data-depth={item.depth}
                />
            ))}
        </Component>
    );
}