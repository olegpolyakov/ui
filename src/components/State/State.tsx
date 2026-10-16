import { cn } from '../../component';
import type { ComponentProps, Size, SizeExtended, Slotted } from '../../types';

import Button, { ButtonProps } from '../Button';
import Heading, { HeadingProps } from '../Heading';
import Image, { ImageProps } from '../Image';
import Slot from '../Slot';
import { Text, TextProps } from '../Text';

import styles from './State.module.scss';

export type StateProps = {
    image?: Slotted<ImageProps>;
    title?: Slotted<HeadingProps>;
    subtitle?: Slotted<HeadingProps>;
    description?: Slotted<TextProps>;
    action?: Slotted<ButtonProps>;
    size?: Size;
};

State.displayName = 'State';

const subtitleSizeMap: Record<Size, SizeExtended> = {
    s: 'xs',
    m: 's',
    l: 'm'
};

export default function State({
    as,
    className,
    children,

    image,
    title,
    subtitle,
    description,
    action,
    size = 'm',
    ...props
}: ComponentProps<StateProps, 'div'>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        { size },
        styles
    );

    return (
        <Root className={classNames} {...props}>
            {image && (
                <Slot
                    fallback={Image}
                    className={styles.image}
                >
                    {image}
                </Slot>
            )}

            <div className={styles.main}>
                {title && (
                    <Slot
                        fallback={Heading}
                        as="h2"
                        className={styles.title}
                        size={size}
                    >
                        {title}
                    </Slot>
                )}

                {subtitle && (
                    <Slot
                        fallback={Heading}
                        as="h3"
                        className={styles.subtitle}
                        size={subtitleSizeMap[size]}
                    >
                        {subtitle}
                    </Slot>
                )}

                {description && (
                    <Slot
                        fallback={Text}
                        className={styles.description}
                        size={size}
                    >
                        {description}
                    </Slot>
                )}
            </div>

            {action && (
                <Slot
                    fallback={Button}
                    className={styles.action}
                    size={size}
                    color="brand"
                    variant="filled"
                >
                    {action}
                </Slot>
            )}

            {children}
        </Root>
    );
}