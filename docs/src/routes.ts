import Home from './pages/Home.mdx';

import Colors from './pages/base/Colors.mdx';
import Shadows from './pages/base/Shadows.mdx';
import Shapes from './pages/base/Shapes.mdx';
import TextStyles from './pages/base/TextStyles.mdx';
import Variants from './pages/base/Variants.mdx';

import Accordion from './pages/components/Accordion.mdx';
import Alert from './pages/components/Alert.mdx';
import Avatar from './pages/components/Avatar.mdx';
import AvatarGroup from './pages/components/AvatarGroup.mdx';
import Badge from './pages/components/Badge.mdx';
import Box from './pages/components/Box.mdx';
import Breadcrumbs from './pages/components/Breadcrumbs.mdx';
import Button from './pages/components/Button.mdx';
import ButtonGroup from './pages/components/ButtonGroup.mdx';
import Card from './pages/components/Card.mdx';
import Checkbox from './pages/components/Checkbox.mdx';
import Dialog from './pages/components/Dialog.mdx';
import Divider from './pages/components/Divider.mdx';
import Drawer from './pages/components/Drawer.mdx';
import Field from './pages/components/Field.mdx';
import Flex from './pages/components/Flex.mdx';
import Grid from './pages/components/Grid.mdx';
import Heading from './pages/components/Heading.mdx';
import Icon from './pages/components/Icon.mdx';
import Image from './pages/components/Image.mdx';
import Input from './pages/components/Input.mdx';
import Item from './pages/components/Item.mdx';
import Label from './pages/components/Label.mdx';
import Link from './pages/components/Link.mdx';
import List from './pages/components/List.mdx';
import Menu from './pages/components/Menu.mdx';
import Pill from './pages/components/Pill.mdx';
import PillGroup from './pages/components/PillGroup.mdx';
import Popover from './pages/components/Popover.mdx';
import ProgressBar from './pages/components/ProgressBar.mdx';
import ProgressCircle from './pages/components/ProgressCircle.mdx';
import Radio from './pages/components/Radio.mdx';
import Select from './pages/components/Select.mdx';
import Scrollable from './pages/components/Scrollable.mdx';
import Slider from './pages/components/Slider.mdx';
import Spinner from './pages/components/Spinner.mdx';
import State from './pages/components/State.mdx';
import Switch from './pages/components/Switch.mdx';
import Table from './pages/components/Table.mdx';
import Tabs from './pages/components/Tabs.mdx';
import Text from './pages/components/Text.mdx';
import Textarea from './pages/components/Textarea.mdx';
import Toast from './pages/components/Toast.mdx';
import Tooltip from './pages/components/Tooltip.mdx';
import Tree from './pages/components/Tree.mdx';

export default [
    { path: '/', component: Home, title: 'Introduction', exact: true, hidden: true },
    {
        type: 'section',
        name: 'Base',
        routes: [
            { path: '/', component: Home, title: 'Home', exact: true, hidden: true },
            { path: '/colors', component: Colors, title: 'Colors' },
            { path: '/shadows', component: Shadows, title: 'Shadows' },
            { path: '/shapes', component: Shapes, title: 'Shapes' },
            { path: '/text-styles', component: TextStyles, title: 'Text Styles' },
            { path: '/variants', component: Variants, title: 'Variants' }
        ]
    },
    {
        type: 'section',
        name: 'Components',
        routes: [
            { path: '/accordion', component: Accordion, title: 'Accordion' },
            { path: '/alert', component: Alert, title: 'Alert' },
            { path: '/avatar', component: Avatar, title: 'Avatar' },
            { path: '/avatar-group', component: AvatarGroup, title: 'Avatar Group' },
            { path: '/badge', component: Badge, title: 'Badge' },
            { path: '/box', component: Box, title: 'Box' },
            { path: '/breadcrumbs', component: Breadcrumbs, title: 'Breadcrumbs' },
            { path: '/button', component: Button, title: 'Button' },
            { path: '/button-group', component: ButtonGroup, title: 'Button Group' },
            { path: '/card', component: Card, title: 'Card' },
            { path: '/checkbox', component: Checkbox, title: 'Checkbox' },
            { path: '/dialog', component: Dialog, title: 'Dialog' },
            { path: '/divider', component: Divider, title: 'Divider' },
            { path: '/drawer', component: Drawer, title: 'Drawer' },
            { path: '/field', component: Field, title: 'Field' },
            { path: '/flex', component: Flex, title: 'Flex' },
            { path: '/grid', component: Grid, title: 'Grid' },
            { path: '/heading', component: Heading, title: 'Heading' },
            { path: '/icon', component: Icon, title: 'Icon' },
            { path: '/image', component: Image, title: 'Image' },
            { path: '/input', component: Input, title: 'Input' },
            { path: '/item', component: Item, title: 'Item' },
            { path: '/label', component: Label, title: 'Label' },
            { path: '/link', component: Link, title: 'Link' },
            { path: '/list', component: List, title: 'List' },
            { path: '/menu', component: Menu, title: 'Menu' },
            { path: '/pill', component: Pill, title: 'Pill' },
            { path: '/pill-group', component: PillGroup, title: 'Pill Group' },
            { path: '/popover', component: Popover, title: 'Popover' },
            { path: '/progress-bar', component: ProgressBar, title: 'Progress Bar' },
            { path: '/progress-circle', component: ProgressCircle, title: 'Progress Circle' },
            { path: '/radio', component: Radio, title: 'Radio' },
            { path: '/scrollable', component: Scrollable, title: 'Scrollable' },
            { path: '/select', component: Select, title: 'Select' },
            { path: '/slider', component: Slider, title: 'Slider' },
            { path: '/spinner', component: Spinner, title: 'Spinner' },
            { path: '/state', component: State, title: 'State' },
            { path: '/switch', component: Switch, title: 'Switch' },
            { path: '/table', component: Table, title: 'Table' },
            { path: '/tabs', component: Tabs, title: 'Tabs' },
            { path: '/text', component: Text, title: 'Text' },
            { path: '/textarea', component: Textarea, title: 'Textarea' },
            { path: '/toast', component: Toast, title: 'Toast' },
            { path: '/tooltip', component: Tooltip, title: 'Tooltip' },
            { path: '/tree', component: Tree, title: 'Tree' }
        ]
    }
];