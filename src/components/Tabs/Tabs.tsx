import { useEffect, useMemo, useState } from 'react';

import type { PropsWithChildren } from '../../types';

import Context, { type TabValue } from './TabsContext';
import Group, { TabGroupProps } from './TabGroup';
import Panel from './TabPanel';

export type TabsProps = {
    value?: TabValue;
    defaultValue?: TabValue;
    
    onChange?: (value: TabValue) => never;
};

Tabs.displayName = 'Tabs';
Tabs.Group = Group;
Tabs.Panel = Panel;

type TabsPropsWithoutTabs = TabsProps & {
    tabs: TabGroupProps['tabs'];
    align?: never;
    fluid?: never;
    gap?: never;
    color?: never;
    activeColor?: never;
    size?: never;
    shape?: never;
    variant?: never;
    activeVariant?: never;
};
type TabsPropsWithTabs = TabsProps & {
    tabs?: never;
    align?: TabGroupProps['align'];
    fluid?: TabGroupProps['fluid'];
    gap?: TabGroupProps['gap'];
    color?: TabGroupProps['color'];
    activeColor?: TabGroupProps['activeColor'];
    size?: TabGroupProps['size'];
    shape?: TabGroupProps['shape'];
    variant?: TabGroupProps['variant'];
    activeVariant?: TabGroupProps['activeVariant'];
};

export default function Tabs({
    children,

    value,
    defaultValue,
    tabs,
    align,
    fluid,
    color,
    activeColor,
    size,
    shape,
    variant,
    activeVariant,
    onChange
}: PropsWithChildren<TabsPropsWithoutTabs | TabsPropsWithTabs>) {
    const [selectedValue, setSelectedValue] = useState<TabValue>(value || defaultValue);

    useEffect(() => {
        if (selectedValue) {
            onChange?.(selectedValue);
        }
    }, [selectedValue, onChange]);

    const contextValue = useMemo(() => ({
        selectedValue,
        setSelectedValue
    }), [selectedValue]);

    return (
        <Context.Provider value={contextValue}>
            {tabs &&
                <Group
                    tabs={tabs}
                    align={align}
                    fluid={fluid}
                    color={color}
                    activeColor={activeColor}
                    size={size}
                    shape={shape}
                    variant={variant}
                    activeVariant={activeVariant}
                />
            }

            {children}
        </Context.Provider>
    );
}