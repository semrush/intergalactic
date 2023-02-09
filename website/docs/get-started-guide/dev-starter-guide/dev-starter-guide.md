---
title: For developers
---

@## Introduction

Let's look at the design system we use at [Semrush](https://semrush.com), and which you can use for your project.

The design system consists of over 70 [React](https://reactjs.org) components. Each of them has design guides and [Figma components](https://www.figma.com/@semrush) with examples of use and API descriptions.

We also have big [icons library](/style/icon/) and [charts library](/data-display/d3-chart/).

@## Installation

Components are installed in a single package.

Example:

```bash
npm i @semcore/ui
```

After the installation, all components will be available at `@semcore/ui/{{ component name }}`.

@## Basic moments

We have developed the design system with flexibility and ease of use in mind. Therefore, it has some features, which will be described below.

### Free template

Components often consist of a complex HTML structure. We provide free template. This means that you are templating the internals of the components from the design system.

For example:

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

This approach provides more flexibility:

- The renderer is not limited by our API.
- The API is cleaner and more consistent.
- You have access to each part of the component.

### Theme

You can change the default styles for your project. We have design tokens that you can change in each component individually or globally throughout the project.

We also have [a mechanism](/style/design-tokens/#themes/) for changing our styles, this allows us to completely change the design of components and extend components with new properties.

### Controlled & uncontrolled

We develop our components in a way that does not have a state and has all statuses set externally. This allows us to ensure that you have full control over the state and its changes.

Every property that can be changed has a handler. For example, `visible` is a property that you set for a component, while `onVisibleChange` is the handler to which you subscribe and which is called when `visible` gets a new value.

> You may have seen this type of logic in the [native input](https://reactjs.org/docs/forms.html#controlled-components) where you control the value and the `onChange` serves as a
> request for change. In this case it's up to you whether to change the value or not.
>
> The handlers for these types of properties have a specific notation: `on{{ eventName }}Change`.

If you don't set these properties, the component will run in uncontrolled mode.

Also, all properties that can be changed have an initial state located in the `default + {{ Property name }}` property. It can be changed by assigning a different value.

For example, a tooltip has a `visible` property which is closed by default. If you want its initial state to be opened, you can assign it the `defaultVisible={true}` value.

@### Handlers

Consistency is essential for a library because it helps you understand what to expect in any particular case. This is why all event handlers in our library have the same format:

```tsx
(value, event) => void | boolean
```

- The first argument is the value that is obtained as a result of the handler response.
- The second argument is the event that called this handler.

Such handlers are extremely convenient if you use React hooks, since it's no longer necessary to create custom handlers and obtain the value from the event. You can simply assign a function from the hook directly to the handler:

```jsx
import React, { useState } from 'react';
import Input from '@semcore/ui/input';

export default () => {
  const [value, setValue] = useState('');

  return (
    <Input>
      <Input.Value value={value} onChange={setValue} />
    </Input>
  );
};
```

### Merge props

For convenience, all properties are merged according to a logical principle. Classname concatenations, styles merge, callbacks queue up, and refs fork. All other properties are overwritten, so it helps not to think that you will break the component by setting props.

### Refs

All our components return a DOM node in the `ref` property. This was made for the following reasons:

- You can always get a DOM node to integrate with other libraries.
- The API becomes less cluttered thanks to the absence of props like `innerRef`, `rootRef` and others.
- It is a bad practice to render the class instance, as it reveals the internal workings of our code.

### Base component

There is ["Box"](/layout/box-system/) under the hood of all our components.

```jsx
import { Box } from '@semcore/ui/flex-box';
```

`Box` allows you to:

- set such indents as `margin` or `padding` directly in `jsx`:

```jsx
<Box mr={5} p={1} />
```

- Set the sizes directly in `jsx`:

```jsx
<Box h={10} wMax="300px" />
```

- assign a `tag` to a component. The tag can be a string or another component:

```jsx
<Box tag="ul" />
<Box tag={Component} />
```

> **Important!** When you use `Box` this way `(Box tag={Component})`, the component styles merge with `Box` styles and the order of the styles can break you the display.

`Box` serves as the basis for other components, meaning its features are available across the entire library:

```jsx
import Button from '@semcore/ui/button';

<Button tag="a" mb={2} w="200px">
  Still Box 🙀
</Button>;
```

It is also worth looking at the ["Flex"](/layout/box-system/) component, which is used to build the layout. `Flex` is a wrapper for `Box` with the ability to assign properties for the **CSS Flexbox**:

```jsx
import { Flex } from '@semcore/ui/flex-box';

<Flex justifyContent="center" alignItems="center" />;
```

@## Browser support

We do not support legacy browsers as we do not want to encourage their use.

| Chrome | Firefox | Safari(macOS) | Safari(iOS) | Edge  |
| ------ | ------- | ------------- | ----------- | ----- |
| >= 90  | >= 78   | >= 14         | >= 12.5     | >= 91 |
