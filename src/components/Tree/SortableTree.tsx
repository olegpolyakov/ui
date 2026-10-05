import type { ReactElement } from 'react';

import { Draggable } from '@dnd-kit/dom';
import { DragDropProvider, DragOverlay } from '@dnd-kit/react';

import { cn } from '../../component';
import type { ComponentProps, ElementType } from '../../types';

import Badge from '../Badge';
import Icon from '../Icon';
import Item from '../Item';
import Sortable, { SortableApi } from '../Sortable';

import type { TreeProps } from './Tree';
import { buildTree, flattenTree } from './helpers';
import type { FlattenedItem, Item as TreeItem } from './types';
import useSortableTree from './useSortableTree';

import baseStyles from './Tree.module.scss';
import sortableStyles from './SortableTree.module.scss';

export type SortableTreeProps = Omit<TreeProps, 'renderItem'> & {
  items: TreeItem[];
  indentation?: number;
  renderItem?: (item: FlattenedItem, sortable: SortableApi, removeItem: () => void) => ReactElement;
  renderOverlay?: (draggable: Draggable, childrenCount: number) => ReactElement;
  onChange: (items: TreeItem[]) => void;
}

const config = {
    alignment: {
        x: 'start',
        y: 'center'
    },
    transition: {
        idle: true
    }
} as const;

SortableTree.displayName = 'SortableTree';

export default function SortableTree<T extends ElementType = 'ul'>({
    as,
    className,

    gap,
    size,
    shape,
    variant,
    interactive,
    items = [],
    indentation = 50,
    renderItem,
    renderOverlay,
    onChange,
    ...props
}: ComponentProps<SortableTreeProps, T>) {
    const {
        flattenedItems,
        setFlattenedItems,
        sourceChildren,
        handleDragStart,
        handleDragMove,
        handleDragOver,
        handleDragEnd
    } = useSortableTree(items, indentation, onChange);

    const Component = as || 'ul';
    const classNames = cn(
        className,
        { gap, interactive: false, sortable: true },
        {
            ...baseStyles,
            sortable: sortableStyles.root
        }
    );

    const removeItem = (item: TreeItem) => {
        const newItems = flattenedItems.filter(({ id }) => id !== item.id);
        const tree = buildTree(newItems);

        setFlattenedItems(flattenTree(tree));
        onChange?.(tree);
    };

    return (
        <DragDropProvider
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Component className={classNames} {...props}>
                {flattenedItems.map((item, index) => (
                    <Sortable
                        key={item.id}
                        id={item.id}
                        index={index}
                        data={{
                            depth: item.depth,
                            parentId: item.parentId
                        }}
                        {...config}
                    >
                        {sortable => renderItem?.(item, sortable, () => removeItem(item)) ?? (
                            <Item
                                start={
                                    <Icon
                                        className={sortableStyles.handle}
                                        ref={sortable.handleRef}
                                        name="drag_indicator"
                                        size="s"
                                    />
                                }
                                content={item.content}
                                size={size}
                                shape={shape}
                                variant={variant}
                                interactive={interactive}
                                data-depth={item.depth}
                                aria-hidden={sortable.isDragSource}
                            />
                        )}
                    </Sortable>
                ))}
            </Component>
            
            <DragOverlay style={{ width: 'fit-content' }}>
                {draggable => renderOverlay?.(draggable, sourceChildren.current.length) ?? (
                    <Item
                        start={
                            <Icon name="drag_indicator" size="s" />
                        }
                        content={flattenedItems.find(i => i.id === draggable.id)!.content}
                        end={sourceChildren.current.length > 0 &&
                                <Badge content={sourceChildren.current.length} />
                        }
                        active
                        data-overlay
                    />
                )}
            </DragOverlay>
        </DragDropProvider>
    );
}