import { createContext } from 'react';

import { getDefaultTheme, type Theme } from '../../theme';

export type ProviderContextValue = {
    root: HTMLElement | null;
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export default createContext<ProviderContextValue>({
    root: null,
    theme: getDefaultTheme(),
    setTheme: () => {}
});