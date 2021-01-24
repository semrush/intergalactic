---
title: API
---

> `DropdownMenu` is a wrap over `Dropdown` with the addition of features for switching options from the keyboard.

@## DropdownMenu

DropdownMenu is a wrap over `<Dropdown/>`, which is a wrap over `<Popper/>`.

```jsx
import DropdownMenu from '@semcore/dropdown';
<DropdownMenu />;
```

@interface IDropdownMenuProps

@## DropdownMenu.Trigger

DropdownMenu.Trigger is a wrap over `<Dropdown.Trigger/>` component, which is a wrap over `<Popper.Trigger/>`.

```jsx
import DropdownMenu from '@semcore/dropdown-menu';
<DropdownMenu.Trigger />;
```

@## DropdownMenu.Popper

DropdownMenu.Popper is a wrap over `<Dropdown.Popper/>` component, which is a wrap over `<Popper.Popper/>`.

```jsx
import DropdownMenu from '@semcore/dropdown-menu';
<DropdownMenu.Popper />;
```

@## DropdownMenu.List

DropdownMenu.List is a container component for the list items with the `<ScrollArea/>` inside it.

```jsx
import DropdownMenu from '@semcore/dropdown-menu';
<DropdownMenu.List />;
```

@interface IDropdownMenuListProps

@## DropdownMenu.Menu

DropdownMenu.Menu is a wrap over the `<Dropdown.Popper/>` + `<DropdownMenu.List/>` component. In fact, it is syntactic sugar when no direct access to the `Popper` node is needed.

```jsx
import DropdownMenu from '@semcore/dropdown-menu';
<DropdownMenu.Menu />;
```

@interface IDropdownMenuMenuProps

@## DropdownMenu.Item

Interactive menu items that are available for selection and switching from the keyboard.

```jsx
import DropdownMenu from '@semcore/dropdown-menu';
<DropdownMenu.Item />;
```

@interface IDropdownMenuItemProps

@## DropdownMenu.ItemTitle

This non-interactive menu item is used to display the titles in the list. It is a wrap over the `Flex` component.

```jsx
import DropdownMenu from '@semcore/dropdown-menu';
<DropdownMenu.ItemTitle />;
```

@interface IDropdownMenuItemTitleProps

@## DropdownMenu.ItemHint

This non-interactive menu item is used to display tips in the list. It is a wrap over the `Flex` component.

```jsx
import DropdownMenu from '@semcore/dropdown-menu';
<DropdownMenu.ItemHint />;
```

@interface IDropdownMenuItemHintProps

@## Context

Context of the component is available inside the render-function.

@interface IDropdownMenuContext
