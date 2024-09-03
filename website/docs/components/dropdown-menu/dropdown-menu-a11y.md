---
title: DropdownMenu
fileSource: dropdown-menu
a11y: AA
tabs: Design('dropdown-menu'), A11y('dropdown-menu-a11y'), API('dropdown-menu-api'), Example('dropdown-menu-code'), Changelog('dropdown-menu-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                              | Function                                                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                            | Moves focus to the next focusable element.                                                                                                     |
| `Shift + Tab`                    | Moves focus to the previous focusable element.                                                                                                 |
| `Space` , `Enter` , `Down Arrow` | When focus is on the trigger, opens the dropdown.                                                                                              |
| `Up Arrow` , `Down Arrow`        | Moves focus between the list options in the dropdown. If focus is on the last/first option, moves focus to the first/last option respectively. |
| `Space` , `Enter`                | Selects the option and closes the dropdown.                                                                                                    |
| `Esc`                            | Closes the dropdown.                                                                                                                           |

When dropdown is closed, the focus returns to the trigger.

### Roles & attributes

The list below describes roles and attributes that component already has.

| Component / element                              | Role / Attribute             | Usage                                                                                                                                            |
| ------------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DropdownMenu.Trigger`                           | `button`                     | Tells the screen reader the element is a button.                                                                                                 |
|                                                  |                              | `aria-haspopup="true"`                                                                                                                           | Indicates that the element triggers a dialog. |
|                                                  | `aria-expanded="true/false`  | Set to `true` when dialog is visible. Indicates that the dialog is open.                                                                         |
|                                                  | `aria-controls="IDREF"`      | Indicates which element this `Trigger` opens.                                                                                                    |
| `DropdownMenu.Menu`                              | `menu`                       | The `menu` role is a type of composite widget that offers a list of choices to the user.                                                         |
|                                                  | `aria-labelledby="IDREF"`    | Identifies the title for the menu.                                                                                                               |
| `DropdownMenu.Item`, `DropdownMenu.Item.Content` | `menuitem`                   | Indicates the element is an option in a set of choices contained by a `menu`.                                                                    |
|                                                  | `aria-describedby="IDREF"`   | Gives the item an accessible description by referring to the item hint that describes the primary message or purpose of the item.                |
| `DropdownMenu.Item.Hint`                         | `aria-hidden="true"`         | Hides element from assistive technologies.                                                                                                       |
| `DropdownMenu.ItemTitle`                         | `aria-hidden="true"`         | Hides element from assistive technologies.                                                                                                       |
| `DropdownMenu.Item.Content`                      | `aria-haspopup="dialog"`     | Indicates that the element triggers a dialog.                                                                                                    |
|                                                  | `aria-expanded="true/false"` | Set to `true` when dialog is visible. Indicates that the dialog is open.                                                                         |
| `DropdownMenu.Group`                             | `group`                      | Identifies a set of user interface objects that is not intended to be included in a page summary or table of contents by assistive technologies. |
|                                                  | `aria-labeledby="IDREF"`     | Identifies the title for the content group.                                                                                                      |

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./dropdown-menu-a11y-report.md-->
