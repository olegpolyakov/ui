import {  useEffect, useState } from 'react';

import { Theme, getDefaultTheme, onThemeChange } from '../theme';

export function useTheme(
    initialTheme: Theme = getDefaultTheme(),
    root: HTMLElement = document.documentElement
): [Theme, (theme: Theme) => void] {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    useEffect(() => {
        if (theme && root) {
            root.setAttribute('data-theme', theme);
        }

        return onThemeChange(newTheme => {
            if (!theme) {
                setTheme(theme);
                
                if (root) {
                    root.setAttribute('data-theme', newTheme);
                }
            }
        });
    }, [theme, root]);

    return [theme, setTheme];
}