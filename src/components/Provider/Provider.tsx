import { useMemo, useState } from 'react';

import { useTheme } from '../../hooks/theme';
import type { Theme } from '../../theme';
import type { Props } from '../../types';
import { cn } from '../../utils';

import Context from './ProviderContext';

import styles from './Provider.module.scss';

export type ProviderProps = {
    theme?: Theme;
};

Provider.displayName = 'Provider';

export default function Provider({
    theme: defaultTheme,

    children,
    className, 
    ...props
}: Props<ProviderProps>) {
    const [root, setRoot] = useState<HTMLElement | null>(null);
    const [theme, setTheme] = useTheme(defaultTheme, root ?? undefined);

    const classNames = cn(
        className,
        styles.root
    );

    const value = useMemo(() => ({
        root,
        theme,
        setTheme
    }), [root, theme, setTheme]);

    return (
        <div
            ref={setRoot}
            className={classNames}
            data-theme={theme}
            {...props}
        >
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        </div>
    );
}