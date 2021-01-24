---
title: Code
---

> ⚠️ If you need to customize work with the dropdown menu, please refer to the documentation [@semcore/popper](/utils/popper/)

The component is a wrap over [@semcore/dropdown-menu](/components/dropdown-menu) with the functionality of list item selection.

@## Basic use

In the simplest case, it is enough to pass an array of options to the select to implement it. `options` is an array of objects with the following fields:

- `value` is a value of the selected option
- `label` is a value displayed in the trigger when selecting an option
- `children` means `children`-options displayed in the dropdown list

@example basic

@## Controlled and uncontrolled modes

The component may operate in either controlled or uncontrolled mode.

@example controll-uncontroll

@## Component customization

When it is necessary to replace the trigger, you can pass the desired component to the `tag` of the select. Property will get to `Select.Trigger` and replace its render.

@example simple-trigger

In cases when you need deeper customization, "unfold" the component into constituents. **The example below shows how to make Select with the selection of the list of countries.**

@example custom-trigger

@## Customizing the dropdown-menu

As with [@semcore/dropdown-menu](/components/dropdown-menu), the dropdown menu can be implemented in two ways:

- `Select.Menu`
- `Select.Popper` + `Select.List`

These components are the wraps over the corresponding components of the [DropdownMenu](/components/dropdown-menu).

- `Select.Popper` is a dropdown window layout
- `Select.List` is a component of the option list with the [ScrollArea](/components/scroll-area/) inside
- `Select.Menu` is a wrap over `Select.Popper` и `Select.List`, all props will get to `Select.List`

The example below shows how to insert [Notice](/components/notice/) in the Select dropdown window.

@example notice

@## Options

The component has several variants of options layout:

- `Select.Option` is an element of the list (can be selected from the keyboard).
- `Select.OptionCheckbox` is an element of the list for multiple selection (can be selected from the keyboard).
- `Select.OptionTitle` is a title of the list (cannot be selected from the keyboard).
- `Select.OptionHint` is a subtitle of the list or a message with additional information (cannot be selected from the keyboard).

@example options

@## Options filtration

`Select.InputSearch` is added to Select for filtration of elements of the list. This is a stylized wrap over the [Input](/components/input/) component.

> The `Select.InputSearch` component is difficult to customize. All props will get to `Input.Value`. If this is not enough, you can collect yours 😇

The example below shows one of the ways to implement filtering.

@example filtering

@## Multiselect

The component has the ability to select several options. This functionality can be enabled by using `multiselect` property.

The layout of options inside the component will be changed to `Select.OptionCheckbox`, and the `value` will become an array.

@example multiselect

@## Sorting Multiselect options

The example below shows one of the ways to sort the selected options.

@example multiselect-sorted

@## Render-function

As with many of our components, you can access the logic of the component by passing a render-function to it.

The example below shows how to implement `select all` and `deselect all` buttons using this function.

@example render-function
