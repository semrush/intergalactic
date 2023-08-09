---
title: Example
fileSource: select
---

> If you need to customize the dropdown menu's behavior, please refer to the [@semcore/ui/popper](/utils/popper/) documentation.

The Select component serves as a wrapper over [@semcore/ui/dropdown-menu](/components/dropdown-menu) with the additional functionality of item selection.

@## Basic usage

In the simplest case, you can implement the select by passing an array of options. The `options` array consists of objects with the following fields:

- `value`: the value of the selected option.
- `label`: the value displayed in the trigger when selecting an option.
- `children`: represents nested options displayed in the dropdown list.

@example basic

## Controlled and uncontrolled modes

The component can operate in either controlled or uncontrolled mode.

@example controll-uncontroll

@## Trigger customization

When you need to customize the trigger, you can pass the desired component to the `tag` property of the select. The property will be passed to `Select.Trigger` and replace its render.

@example simple-trigger

In cases when you require deeper customization, you can "unfold" the component into its constituents. The example below shows how to create a Select component for selecting a list of countries.

@example custom-trigger

@## DropdownMenu customization

Similar to [@semcore/ui/dropdown-menu](/components/dropdown-menu), the dropdown menu can be implemented in two ways:

- `Select.Menu`
- `Select.Popper` + `Select.List`

These components serve as wrappers over the corresponding components of the [DropdownMenu](/components/dropdown-menu).

- `Select.Popper` is a layout for the dropdown window.
- `Select.List` is a component for the option list with the [ScrollArea](/components/scroll-area/) inside.
- `Select.Menu` is a wrapper over `Select.Popper` and `Select.List`, and all props are passed to `Select.List`.

The example below shows how to insert a [Notice](/components/notice/) in the Select dropdown window.

@example notice

## Options

The component offers several variants of options layout:

- `Select.Option`: an element of the list (can be selected from the keyboard).
- `Select.OptionCheckbox`: an element of the list for multiple selections (can be selected from the keyboard).
- `Select.OptionTitle`: a title of the list (cannot be selected from the keyboard).
- `Select.OptionHint`: a subtitle of the list or a message with additional information (cannot be selected from the keyboard).

@example options

## Options filtration

The `InputSearch` is added to Select for filtering elements in the list. This is a stylized wrapper over the [Input](/components/input/) component.

> The `InputSearch` component is difficult to customize. All props are passed to `Input.Value`. If this isn’t enough, you can create your own custom solution.

The example below shows one of the ways to implement filtering.

@example filtering

## Multiselect

The component has the ability to select several options. This functionality can be enabled by using the `multiselect` property.

The layout of options inside the component will be changed to `Select.OptionCheckbox`, and the `value` will become an array.

@example multiselect

@## Sorting multiselect options

The example below shows one of the ways to sort the selected options.

@example multiselect-sorted

## Render-function

As with many of our components, you can access the logic of the component by passing a render-function to it.

The example below shows how to implement "Select all" and "Deselect all" buttons using this function.

@example render-function
