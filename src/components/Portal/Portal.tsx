import { useContext } from 'react';
import { createPortal } from 'react-dom';

import type { ComponentProps } from '../../types';
import { ProviderContext } from '../Provider';

export type PortalProps = {
    container?: HTMLElement;
};

Portal.displayName = 'Portal';

export default function Portal({
    container,
    children
}: ComponentProps<PortalProps, 'div'>) {
    const { root } = useContext(ProviderContext);

    return createPortal(
        children,
        container || root || document.body
    );
}