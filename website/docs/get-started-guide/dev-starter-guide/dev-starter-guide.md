---
title: For developers
---

@## Semcore

Here you will find a collection of the main principles and ideas that our library is based on. The documentation is divided into sections that range from simple and fundamental concepts (for the library) to more complex and advanced stuff.

@## Installation

The library supports two delivery systems:

- Package system where each individual component is a separate package
- Release system where all components are combined in a single package

We recommend that you use the release system, since it's more convenient and it reduces the risk of bundle bloat due to package duplicates. With the release system, you can also install component packages separately if you need to.

> When installing packages with npm or Yarn, be sure to use the `--flat` flag to minimize errors in dependencies.

### Package system

All components are located in the `@semcore` namespace in npm and are installed separately.

> If the selected component is running, you must install the `@semcore/core` package.

Example:

```bash
npm i @semcore/button @semcore/core
```

- `@semcore/core` - _is the basic package by which we create our components, and it contains all of the common logic
  of the components that is discussed below. There should only be one version of the package in the project._

### Release system

Components are installed in a single package.

Example:

```bash
npm i @semcore/ui
```

After the installation, all components will be available at `@semcore/ui/{{ component name }}`.

@## Flexbox as the basis of everything

Our entire library is based on [flexbox](/layout/box-system/) that forms over 90% of all of our components. It consists of two elements: `Flex` and `Box`:

```jsx
import { Flex, Box } from '@semcore/flex-box';
import { Flex, Box } from '@semcore/ui/flex-box';
```

`Box` allows you to:

- Set such indents as `margin` or `padding` directly in `jsx`:

```jsx
<Box mr={5} p={1} />
```

- Set the sizes directly in `jsx`:

```jsx
<Box h={10} wMax="300px" />
```

- Assign a `tag` to a component. The tag can be a string or another component:

```jsx
<Box tag="ul" />
<Box tag={Component} />
```

`Flex` is a wrapper for `Box` with the ability to assign properties for the **CSS Flexbox**:

```jsx
<Flex justifyContent="center" alignItems="center" />
```

Both elements are quite convenient and flexible, but `Box` serves as the basis for other components, which means that its features are available across the entire library:

```jsx
import Button from '@semcore/ui/button';

<Button tag="a" mb={2} w="200px">
  Still Box 🙀
</Button>;
```

@## Addons

When using other UI libraries, you have almost definitely encountered the following issues:

```jsx
<MuiButton startIcon={Icon} endIcon={AnotherIcon}>
  Button with icons
</MuiButton>
```

In other words, some components may have spaces reserved for other components. Like in the example above where two icons are inserted into one button.

This is not something you'll need to worry about with our library, since it uses add-ons for this purpose. The add-ons are themselves components that serve as parent static methods with pre-configured styles:

```jsx
import Button from '@semcore/ui/button';

<Button>
  <Button.Addon tag={Icon} />
  <Button.Text>Button with icons</Button.Text>
  <Button.Addon>Whatever you want</Button.Addon>
</Button>;
```

The example above may seem overly complicated, but this approach provides more flexibility:

- The renderer is not limited by our API
- The API is cleaner and more consistent
- You have access to each part of the component

@## Refs

All of our components return a DOM node in the `ref` property. This was made for the following reasons:

- You can always get a DOM node to integrate with other libraries
- The API becomes less cluttered thanks to the absence of props like `innerRef`, `rootRef` and others
- Rendering the class instance is a bad practice, since it reveals the internal workings of our code

@## Controlled & uncontrolled

We develop our components in a way where they don't have a state and have all statuses set externally. This allows us to make sure that you have full control over the state and its changes.

Every property that can change has a handler. For example, `visible` is a property that you set for a component, while `onVisibleChange` is the handler you subscribe to and which is called when `visible` has a new value.

> You may have seen this type of logic in native input where you control the value and the `onChange` serves as a request for change. In this case it's up to you whether to change the value or not.
>
> The handlers for these types of properties have a specific notation: `on{{ eventName }}Change`.

With all that in mind, to make a component fully functional in its default state, you'll need to assign it all of its properties and subscribe to all of its handlers. This is not always convenient, because there may be a lot of properties, and it is not always necessary to describe the logic of property changes in handlers.

To solve this problem, we allowed properties to be uncontrollable. This means that if you don't assign a value to a component, it will use its internal state which changes when the handlers are called.

As a result, all of our components work by default without defined properties or handlers.

All properties can work in two modes: controlled (where you assign props) and uncontrolled (with the internal state). The uncontrolled mode implies that the initial state is set internally, but it can be changed without making the component controllable.

> All properties that can be changed have an initial state located in the `default property + {{ property name }}` property. It can be changed by assigning a different value.
>
> For example, a tooltip has a `visible` property which is closed by default. If you want its initial state to be open, you can assign it the `defaultVisible={true}` value.

@## Handlers

Consistency is essential for a library because it helps you understand what to expect in any particular case. This is why all event handlers in our library have the same format:

```tsx
(value, event) => void | boolean
```

- The first argument is the value that is obtained as a result of the handler response
- The second argument is the event that called this handler

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

@## Portal

In our library, all pop-ups (from drop-downs to modal windows) have a common feature — they are rendered in React Portal.

Here are a few important things that you need to keep in mind:

- You can disable rendering in Portal
- You can set your own DOM node where the components will be rendered
- Nested popups are rendered in the same node, one after another

With that last point, you don't need to worry about things like `z-index` for such components.

@## Poppers

All of our pop-ups and modeless windows are based on Popper, which means that:

- Focus inside pop-up windows is blocked
- Pop-up windows are closed by clicking on another part of the page
- Pop-up windows are closed by pressing `Esc`
- Windows render in React Portal

When using Popper-based components, you will encounter several specific features:

- The component wrapper doesn't have its own DOM node, it only transfers React Context with the working logic to the child objects
- `Popper.Trigger` is a node that represents an element that the pop-up window will “stick” to
- `Popper.Popper` is the pop-up window itself

```jsx
<Popper>
    <Popper.Trigger tag="button">
        I'm trigger
    <Popper.Trigger>
    <Popper.Popper>
        I'm content
    </Popper.Popper>
</Popper>
```

You will observe a similar pattern in all the components made with Popper (with few exceptions).

See the tooltip component below for an example:

```jsx
<Tooltip title="I'm content" >
    <Button>I'm trigger</Button>
</Tooltip>

<Tooltip>
    <Tooltip.Trigger>
        <Button>I'm trigger</Button>
    </Tooltip.Trigger>
    <Tooltip.Popper>
        I'm content
    <Tooltip.Popper>
</Tooltip>
```

> Both tooltips from the example above are completely identical, but the first one is a deliberate simplification designed for convenience.

@## Context, static children

When using our components, you will often encounter situations where a part of a component is a static method of the parent:

```jsx
<Pagination>
  <Pagination.FirstPage />
  <Pagination.PrevPage />
  <Pagination.NextPage />
  <Pagination.PageInput />
  <Pagination.TotalPages />
</Pagination>
```

This approach is implemented using the **React Context API**:

- The parent component contains all the working logic
- The parent component contains methods that return `props` required for the child objects to work
- React Context transfers these methods to child objects
- Methods are called when child objects are being rendered

This may seem unnecessarily difficult, but the flexibility you get when using this approach offers incredible opportunities. You can easily change the logic of the component as well as its appearance, as long as you keep a few important things in mind:

- `props` transferred by the user are always applied (even if it ends up breaking the component)
- You can completely cancel event handlers or override their logic by returning the `false` value from them

@## Render functions

Render functions can be transferred to each of our components. They have the following format:

```jsx
(props, handlers) => React.ReactElement;
```

### Props

The first argument of the render function is the `props` object. It contains:

- `props` of the component
- `propGetters` of the component

The `propGetters` is a set of functions that return `props` for child components. Note that they have a specific naming: `get{{ child name }}Props`.

For example, the `Popper` component has the following child components: `Popper.Trigger` and `Popper.Popper`. This means that you will have access to the following prop getters in Popper's render function:

- `getPopperProps`
- `getTriggerProps`

```jsx
<Popper>
  {(props, handlers) => {
    const {
      // Will return props for Popper.Trigger
      getTriggerProps,
      // Will return props for Popper.Popper
      getPopperProps,
    } = props;
  }}
</Popper>
```

One important feature of `propGetters` is that you can transfer an object with `props` in a call. This will result in the following:

- User `props` and `props` from `propGetter` will be merged (user props have a higher priority)
- User event handlers and events from `propGetter` will be combined into a single function and will be called in sequence, with the user event handler being called the last
- `Refs` will be merged

### Handlers

The second argument is the `handlers` object that contains methods used to change the internal state of components.

For example, the `Popper` component has an internal visibility state. This means that you will have access to a `visible` function in `handlers`, and calling this function will change it.

This will allow you to manage the internal state of the component without having to control it directly.

In the example below, the `Popper` component will be closed when the user clicks the button inside of it:

```jsx
<Popper>
    {(props, handlers) => {
        const { visible } = handlers;
        return (
            <React.Fragment>
                <Popper.Popper>
                    <Button onClick={() => visible(false)}>I'll close popper</Button>
                <Popper.Popper>
            </React.Fragment>
        )
    }}
</Popper>
```
