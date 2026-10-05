import { useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';

import { Button, ButtonGroup, Drawer, Heading, Icon, Item, List, Logo, Provider, Scrollable, Text, Tooltip } from '~/components';
import type { Theme } from '~/theme';
import { useIsMobile } from '~/hooks/media';

import styles from './App.module.scss';

import routes from './routes';
import GitHubIcon from './assets/github.svg?react';

export default function App() {
    const [theme, setTheme] = useState<Theme>();
    const isMobile = useIsMobile();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Provider theme={theme}>
            <Router basename={import.meta.env.BASE_URL}>
                <div className={styles.root}>
                    <Drawer
                        type={isMobile ? 'modal' : 'inline'}
                        open={isMobile ? isDrawerOpen : true}
                        header={null}
                        closeButton={null}
                        closeOnClickOutside
                        scrollable={false}
                        onClose={() => setIsDrawerOpen(false)}
                    >
                        <header className={styles.header}>
                            <Heading
                                as={Link}
                                to="/"
                                start={<Logo size="l" />}
                                className={styles.title}
                                content="OP UI"
                                size="m"
                            />

                            <ButtonGroup gap="s">
                                <Button
                                    icon
                                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                >
                                    <Tooltip
                                        content={theme ? `${theme} theme` : 'System theme'}
                                        placement="bottom"
                                    >
                                        <Icon name={theme ? `${theme}_mode` : 'settings_night_sight'} />
                                    </Tooltip>
                                </Button>

                                <Button as="a" href="https://github.com/olegpolyakov/ui" target="_blank" icon>
                                    <GitHubIcon />
                                </Button>
                            </ButtonGroup>
                        </header>

                        <Scrollable fade>
                            <Nav onItemClick={() => setIsDrawerOpen(false)} />
                        </Scrollable>
                    </Drawer>

                    <main className={styles.main}>
                        <article className="markdown">
                            <Switch>
                                {routes
                                    .flatMap(route => typeof route === 'object'
                                        ? route.routes || route
                                        : route
                                    ).map(route => (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            exact={route.exact}
                                            component={route.component}
                                        />
                                    
                                    ))}
                            </Switch>
                        </article>

                        {isMobile && (
                            <Button
                                className={styles.menuButton} 
                                icon="menu"
                                variant="filled"
                                onClick={() => setIsDrawerOpen(true)}
                            />
                        )}
                    </main>
                </div>
            </Router>
        </Provider>
    );
}

function Nav({ onItemClick }: { onItemClick?: () => void }) {
    const location = useLocation();

    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        ref.current
            ?.querySelector('[data-active="true"]')
            ?.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, []);

    return (
        <nav ref={ref} className={styles.nav}>
            {routes.map(route => route.routes
                ? (<>
                    <Text
                        className={styles.subtitle}
                        content={route.name}
                        color="secondary"
                        size="xxs"
                        decorative
                        uppercase
                    />

                    <List as="div">
                        {route.routes.filter(route => !route.hidden).map(route => 
                            <Item
                                key={route.path}
                                className={styles.link}
                                as={Link}
                                to={route.path}
                                content={route.title}
                                shape="rectangular"
                                active={location.pathname === route.path}
                                size="m"
                                variant="plain"
                                interactive
                                onClick={onItemClick}
                            />
                        )}
                    </List>
                </>)
                : (
                    <Item
                        key={route.path}
                        className={styles.link}
                        as={Link}
                        to={route.path}
                        content={route.title}
                        shape="rectangular"
                        active={location.pathname === route.path}
                        size="m"
                        variant="plain"
                        interactive
                        onClick={onItemClick}
                    />
                ))}
        </nav>
    );
}