---
title: DropdownMenu
fileSource: dropdown-menu
a11y: AA
tabs: Design('dropdown-menu'), A11y('dropdown-menu-a11y'), API('dropdown-menu-api'), Example('dropdown-menu-code'), Changelog('dropdown-menu-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                              | Function                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `Tab`                            | Moves focus to the next focusable element.                                                                           |
| `Shift + Tab`                    | Moves focus to the previous focusable element.                                                                       |
| `Space`, `Enter`, <nobr>`Up Arrow`</nobr>, <nobr>`Down Arrow`</nobr> | When focus is on the trigger, opens the dropdown.                                |
| <nobr>`Up Arrow`</nobr>, <nobr>`Down Arrow`</nobr> | Moves selection between the list options in the dropdown. If selection is on the last/first option, moves selection to the first/last option respectively. |
| <nobr>`Right Arrow`</nobr>       | Moves selection to the submenu or inline actions. |
| <nobr>`Left Arrow`</nobr>        | Moves selection to the parent menu item. |
| `Space`, `Enter`                 | Selects the option and closes the dropdown. Or, if the option has a submenu, moves selection to the submenu. |
| `Esc`                            | Closes the menu.                  |

When dropdown is closed, the focus stays on the trigger.

### Roles & attributes

The following list describes roles and attributes that component already has.

| Component / element                              | Role / Attribute             | Usage                                                              |
| ------------------------------------------------ | ---------------------------- | ------------------------------------------------------------------ |
| `DropdownMenu.Trigger`                           | `role="button"`              | Tells the screen reader the element is a button.                   |
|                                                  | `aria-haspopup="true"`       | Indicates that the element triggers a dialog.                      |
|                                                  | `aria-expanded="true/false"` | Set to `true` when dialog is visible. Indicates that the dialog is open. |
|                                                  | `aria-controls="IDREF"`      | Indicates which element this `Trigger` opens.                      |
| `DropdownMenu.Menu`                              | `menu`                       | The `menu` role is a type of composite widget that offers a list of choices to the user.            |
|                                                  | `aria-labelledby="IDREF"`    | Identifies the title for the menu.                                 |
| `DropdownMenu.Popper`                            | `role="dialog"`              | **Only if `DropdownMenu.Popper` is used explicitly.** Identifies the popper as a dialog. |
| `DropdownMenu.Item`, `DropdownMenu.Item.Content` | `role="menuitem"`            | Indicates that the element is a menu item. This is the default menu item role. |
|                                                  | `role="menuitemcheckbox"`    | **Only if the menu has both `selectable` and `multiselect` properties.** Indicates that the element is a menu item that can be checked and unchecked. |
|                                                  | `role="menuitemradio"`       | **Only if the menu has the `selectable` property.** Indicates that the element is a menu item that can be checked and unchecked within a set, where only one item can be checked at a time.       |
|                                                  | `aria-describedby="IDREF"`   | Gives the item an accessible description by referring to the `Item.Hint`, the tooltip, or both, describing the primary message or purpose of the item.               |
| `DropdownMenu.Item.Hint`                         | `aria-hidden="true"`         | Hides element from assistive technologies.                         |
| `DropdownMenu.Item.Content`                      | `aria-haspopup="dialog"`     | Indicates that the element triggers a dialog.                      |
|                                                  | `aria-expanded="true/false"` | Set to `true` when dialog is visible. Indicates that the dialog is open. |
| `DropdownMenu.Group`                             | `role="group"`               | Identifies a set of user interface objects that's not intended to be included in a page summary or table of contents by assistive technologies. |
|                                                  | `aria-labeledby="IDREF"`     | Identifies the title for the content group.                        |

## Considerations for developers

Only use `DropdownMenu.Popper` explicitly if it must have additional elements beside the menu, as in [the example with a Notice](./dropdown-menu-code.md#second-method). In that case the popper will be presented as a dialog, which hints to the screen reader user to use the `Tab` key to navigate between the menu and other elements.

If your `DropdownMenu` is a list of options without additional features, use it with `DropdownMenu.Menu`, as in the [basic example](./dropdown-menu-code.md#basic-usage). This will let the screen reader user know that `Up` and `Down` keys are enough to navigate within the control.

### Roles and attributes

The following list will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Roles and attributes

| Component             | Attribute                         | Usage                                                     |
| --------------------- | --------------------------------- | --------------------------------------------------------- |
| `DropdownMenu.Popper` | `aria-label` or `aria-labelledby` | **Only if `DropdownMenu.Popper` is used explicitly.** Defines an accessible name for the popper. |

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).