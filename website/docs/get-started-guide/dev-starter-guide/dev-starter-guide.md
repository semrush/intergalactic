---
title: For developers
tabs: Get started('dev-starter-guide'), For production('production-tips')
---

## Introduction

Let's explore the design system used at [Semrush](https://semrush.com), which you can also integrate into your own projects. The design system has more than 70 [React](https://reactjs.org) components, each of them accompanied by design guides, Figma components, usage examples and API descriptions. Additionally, we offer an extensive [icons library](/style/icon/icon) and [charts library](/data-display/d3-chart/d3-chart-code).

## Installation

All components are bundled together in a single package, making the installation process straightforward. For example:

::: code-group

```sh [pnpm]
pnpm add @semcore/ui
```

```sh [npm]
npm install @semcore/ui
```

:::

After the installation, you can access each component at `intergalactic/{component_name}`.

## Key features

We have developed this design system with a strong focus on flexibility and ease of use, resulting in several notable features described below:

### Free template

Components often consist of complex HTML structures. To enhance flexibility, we provide a free template, allowing you to customize the internals of the components from the design system. Here's an example using the [Button](/components/button/button) component:

```jsx
import Button from '@semcore/ui/button';

<Button>
  <Button.Addon>
    <Icon />
  </Button.Addon>
  <Button.Text>Button with icons</Button.Text>
  <Button.Addon>Whatever you want</Button.Addon>
</Button>;
```

This approach provides multiple benefits:

- The renderer is not constrained by our API.
- The API remains clean and consistent.
- You gain access to each part of the component.

### Theme

You have the ability to change the default styles for your project. We offer [design tokens](/style/design-tokens/design-tokens) that can be adjusted on a per-component basis or applied globally throughout the project. Additionally, we provide a [mechanism for changing styles](/style/design-tokens/design-tokens#themes), enabling complete design customization and the extension of components with new properties.

### Controlled & uncontrolled

By default, our components work in uncontrolled mode. Once you provide a value a pair of prop and handler (for example, `value` and `onChange`), the component starts ignore it's internal state related to this pair of props and switches it to a controlled mode. This grants you complete control over the state and its changes. For instance, `visible` is a property that you can set for a component, while `onVisibleChange` is the handler to which you subscribe and which is called when `visible` receives a new value.

::: tip
This logic is similar to the [native input](https://reactjs.org/docs/forms.html#controlled-components) behavior, where you control the value and the `onChange` serves as a request for change. In this case, it's up to you whether to change the value or not.

The handlers for these types of properties follow a specific notation: `on{ eventName }Change`.
:::

If you choose not to set these properties, the component will operate in an uncontrolled mode. Furthermore, all properties that can be changed have an initial state located in the `default + { Property name }` property, which can be modified by assigning a different value. For example, if a tooltip has a `visible` property that is closed by default, you can set the `defaultVisible={true}` value to have it initially open.

### Handlers

Consistency is crucial for a library as it ensures predictability. In our library, all event handlers follow the same format:

```tsx
(value, event) => void | boolean
```

- The first argument is the value that results from the handler response.
- The second argument is the event that triggers this handler.

These handlers are especially convenient when using React hooks, as you no longer need to create custom handlers and extract values from the event. Instead, you can directly assign a function from the hook to the handler, as shown in this example using the Input component:

```jsx
import React from 'react';
import Input from '@semcore/ui/input';

export default () => {
  const [value, setValue] = React.useState('');

  return (
    <Input>
      <Input.Value value={value} onChange={setValue} />
    </Input>
  );
};
```

### Merge props

For convenience, all properties are merged logically. Classname concatenations, styles merging, callback queues, and refs forking are all handled appropriately. Other properties are simply overwritten, eliminating the concern of accidentally breaking the component by setting props.

### Refs

All our components return a DOM node in the `ref` property. This decision was made for several reasons:

- You can always obtain a DOM node to integrate with other libraries.
- The API becomes less cluttered without the need for props like `innerRef`, `rootRef`, and others.
- Rendering the class instance is considered a bad practice, as it reveals the internal workings of our code.

### Base component

Underlying all our components is ["Box"](/layout/box-system/box-system), which serves as a foundational building block. By importing Box from `intergalactic/flex-box`, you can leverage its capabilities, including:

```jsx
import { Box } from '@semcore/ui/flex-box';
```

`Box` allows you to:

- Directly setting indents such as `margin` or `padding` in JSX:

```jsx
<Box mr={5} p={1} />
```

- Setting sizes directly in JSX:

```jsx
<Box h={10} wMax="300px" />
```

- Assigning a `tag` to a component. The `tag` can be a string or another component:

```jsx
<Box tag="ul" />
<Box tag={Component} />
```

::: tip
**Important!** When you use `Box` this way `(Box tag={Component})`, the component styles merge with `Box` styles, and the order of the styles may affect the display.
:::

`Box` serves as the foundation for other components, making its features available throughout the entire library. For example:

```jsx
import Button from '@semcore/ui/button';

<Button tag="a" mb={2} w="200px">
  Still Box 🙀
</Button>;
```

Additionally, consider exploring the ["Flex"](/layout/box-system/box-system) component, which is a wrapper for `Box` and allows you to apply properties for **CSS Flexbox**:


```jsx
import { Flex } from '@semcore/ui/flex-box';

<Flex justifyContent="center" alignItems="center" />;
```

## Browser support

To ensure the best performance and user experience, we do not support legacy browsers. Our design system is optimized for the following browser versions:

Table: Browser support

| Chrome | Firefox | Safari(macOS) | Safari(iOS) | Edge  |
| ------ | ------- | ------------- | ----------- | ----- |
| >= 90  | >= 78   | >= 14         | >= 12.5     | >= 91 |
