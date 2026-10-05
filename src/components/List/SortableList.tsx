import { useCallback, type ComponentPropsWithRef, type ReactElement } from 'react';

import { UniqueIdentifier, type Draggable } from '@dnd-kit/abstract';
import { DragDropProvider, DragOverlay, type DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import type { ComponentProps, ElementType } from '../../types';

import Icon from '../Icon';
import Item, { ItemProps } from '../Item';
import List from './List';
import Sortable, { type SortableApi } from '../Sortable';

import styles from './SortableList.module.scss';

const config = {
    alignment: {
        x: 'start',
        y: 'center'
    },
    transition: {
        idle: true
    }
} as const;

export type SortableListProps = Omit<ComponentPropsWithRef<typeof List>, 'items'> & {
    items: (ItemProps & { id: UniqueIdentifier })[];
    renderItem?: (item: ItemProps & { id: UniqueIdentifier }, sortable: SortableApi) => ReactElement;
    renderOverlay?: (draggable: Draggable, childrenCount: number) => ReactElement;
    onChange: (ids: UniqueIdentifier[]) => void;
};

export default function SortableList<T extends ElementType = 'ul'>({
    size,
    shape,
    variant,
    items,
    renderItem,
    renderOverlay,
    onChange,
    ...props
}: ComponentProps<SortableListProps, T>) {
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
                const ids = items.map(item => item.id);
                const [removed] = ids.splice(initialIndex, 1);
                ids.splice(index, 0, removed);
                onChange?.(ids);
            }
        }
    }, [items, onChange]);

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <List className={styles.root} {...props}>
                {items.map((item, index) => (
                    <Sortable
                        key={item.id}
                        id={item.id}
                        index={index}
                        {...config}
                    >
                        {sortable => renderItem?.(item, sortable) ?? (
                            <Item
                                start={
                                    <Icon
                                        className={styles.handle}
                                        ref={sortable.handleRef}
                                        name="drag_indicator"
                                        size="s"
                                    />
                                }
                                content={item.content}
                                size={size}
                                shape={shape}
                                variant={variant}
                                interactive
                                aria-hidden={sortable.isDragSource}
                            />
                        )}
                    </Sortable>
                ))}
            </List>

            <DragOverlay style={{ width: 'fit-content' }}>
                {draggable => renderOverlay?.(draggable, items.length) ?? (
                    <Item
                        start={
                            <Icon name="drag_indicator" size="s" />
                        }
                        content={items.find(i => i.id === draggable.id)!.content}
                        active
                        data-overlay
                    />
                )}
            </DragOverlay>
        </DragDropProvider>
    );
}