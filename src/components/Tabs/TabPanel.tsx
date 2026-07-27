import { useContext } from 'react';

import type { ComponentProps, ElementType } from '../../types';
import { cn } from '../../utils';

import TabsContext from './TabsContext';

import styles from './TabPanel.module.scss';

export type TabPanelProps = {
    value: string | number;
    hidden?: boolean;
};

TabPanel.displayName = 'TabPanel';

export default function TabPanel<T extends ElementType = 'div'>({
    as,
    className,
    children,

    value,
    hidden,
    ...props
}: ComponentProps<TabPanelProps, T>) {
    const { selectedValue } = useContext(TabsContext);

    const Component = as || 'div';
    const classNames = cn(
        className,
        hidden && styles.hidden
    );

    if (value !== selectedValue) {
        return null;
    }

    return (
        <Component className={classNames} {...props}>
            {children}
        </Component>
    );
}