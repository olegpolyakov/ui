# OP UI

A set of accessible, customizable, and easy-to-use React components.

> **⚠️ WARNING**\
> Work-in-progress — APIs and components may change without notice. Feedback and contributions are welcome.

## Installation

```sh
npm i @olegpolyakov/ui
```

## Usage

Add the following line to the `<head>` of your HTML to include Material Symbols
Outlined font:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..200,0..1">
```

Start using the UI components by importing the CSS file in the root of your application:

```jsx
import "@olegpolyakov/ui/styles";
```

Then, import and use the components you need:

```jsx
import { Button } from "@olegpolyakov/ui";

<Button>Button</Button>;
```
