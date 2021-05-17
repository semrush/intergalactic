---
title: Code
---

> ⚠️ If you need to customize your work with the dropdown menu, please refer to the documentation [@semcore/popper](/utils/popper/)

The component is a wrap over [@semcore/dropdown](/components/dropdown) with the following logic:

- Display of the list of options in a dropdown window
- Scrolling the list of options using the keyboard

@example basic

@## Dropdown-menu

There are several methods of displaying the dropdown menu in the component. We will show each of them below.

### The first method

We implement it with the help of the combination of two components:

- `DropdownMenu.Popper` — layout of a dropdown window
- `DropdownMenu.List` and [ScrollArea](/components/scroll-area/) with option list styles

This method is good when you need a flexible content customization in a dropdown menu.

@example popper-list

### The second method

The easiest method is to use `DropdownMenu.Menu`.

It is appropriate when it is necessary to manage only the content within the options list.

`DropdownMenu.Menu` is a wrap over `DropdownMenu.Popper` and `DropdownMenu.List`. All props will fall through to `DropdownMenu.List`.

@example menu

@## Elements of the list

The component has several variants of list elements layout:

- `DropdownMenu.Item`, which is an element of the list (can be selected with the keyboard)
- `DropdownMenu.ItemTitle`, which is the title of the list (cannot be selected with the keyboard)
- `DropdownMenu.ItemHint`, which is list subhead or message with additional information (cannot be selected with the keyboard)

@example options

@## Render-function

As with the lower-level components, you can access the component logic by passing the render-function into the body.

You can see the list of available methods in the [API](/components/dropdown-menu/dropdown-menu-api/#aad4e2).

@example context
