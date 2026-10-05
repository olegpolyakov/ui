import { cn, resolveChildren } from '../../component';
import type { ComponentProps, ElementType, PropsWithKey, Size } from '../../types';

import AccordionItem, { AccordionItemProps } from './AccordionItem';

import styles from './Accordion.module.scss';

export type AccordionProps = {
    items?: PropsWithKey<AccordionItemProps>[];
    size?: Size;
    gap?: Size;
};

Accordion.displayName = 'Accordion';
Accordion.Item = AccordionItem;

export default function Accordion<T extends ElementType = 'div'>({
    as,
    className,
    children,

    items = [],
    size = 'm',
    gap,
    ...props
}: ComponentProps<AccordionProps, T>) {
    const Root = as || 'div';
    const classNames = cn(className, {
        gap
    }, styles);

    return (
        <Root className={classNames} {...props}>
            {resolveChildren(children, items, AccordionItem).map(({ key, ...rest }, index) =>
                <AccordionItem
                    key={key || index}
                    size={size}
                    {...rest}
                />
            )}
        </Root>
    );
}