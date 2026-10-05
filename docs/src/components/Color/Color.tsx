import { Flex, Text } from '~/components';

import styles from './Color.module.scss';

export default function Color({
    name,
    value,
    ...props
}: {
    name: string;
    value?: string;
    dark?: boolean;
    light?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={styles.root}
            style={{
                // @ts-ignore
                '--background-color': value,
                '--foreground-color': `var(--ui-${name.toLowerCase()}-contrast-color)`
            }}
            {...props}
        >
            <Flex column gap="xs" align="center">
                <Text
                    content={name}
                    color="inherit"
                    size="m"
                />
            
                <Text
                    content={value}
                    color="inherit"
                    size="xs"
                />
            </Flex>
        </div>
    );
}