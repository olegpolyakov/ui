import { cloneElement, isValidElement, type FunctionComponent, type ReactElement } from 'react';

import { Data } from '@dnd-kit/abstract';
import { useSortable, UseSortableInput } from '@dnd-kit/react/sortable';

import { isFunction } from '../../utils';

export type SortableProps<T extends Data> = UseSortableInput<T> & {
    children: SortableElement | ((sortable: SortableApi) => ReactElement)
};
export type SortableApi = ReturnType<typeof useSortable>;
export type SortableElementProps = {
    ref: (element: Element | null) => void;
};
export type SortableElement = ReactElement<SortableElementProps, FunctionComponent<SortableElementProps>>;

export default function Sortable<T extends Data = Data>({
    id,
    index,
    data,
    children,
    ...rest
}: SortableProps<T>) {
    const sortable = useSortable({ id, index, data, ...rest });

    return isFunction(children)
        ? children(sortable)
        : isValidElement<SortableElementProps>(children)
            ? cloneElement<SortableElementProps>(children, { ref: sortable.ref })
            : null;
}