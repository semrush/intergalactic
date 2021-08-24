---
title: A11y
---

> ### General recommendations
>
> - Be mindful of using tabs, as they are less discoverable by design.
> - Once a tab button is focused, other tabs can be selected with the arrow keys.
> - A tab's contents can be accessed via `Tab` (if there are focusable elements in the tab well) or `PgDn` (if there are no focusable elements in the tab well).
> - Be sure to update the values of the `aria-posinset` and `aria-setsize` attributes if you have more than three tabs.
>
> [A11y style guide](https://a11y-style-guide.com/style-guide/section-structure.html#kssref-structure-tabs)

@## Keyboard support

| Key           | Function                                                                                                                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | When focus moves into the tab list, places focus on the active `tab` element. When the tab list contains the focus, moves focus to the next element in the `Tab` sequence, which is the `tabpanel` element. |
| `Right` arrow | Moves focus to the next tab. If focus is on the last tab, moves focus to the first tab. Activates the newly focused tab.                                                                                    |
| `Left` arrow  | Moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab. Activates the newly focused tab.                                                                                |

@## Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

| Role     | Attribute                 | Element  | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------- | ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tablist  |                           | `div`    | Indicates that the element serves as a container for a set of tabs.                                                                                                                                                                                                                                                                                                                                                                  |
| tab      |                           | `button` | Indicates the element serves as a tab control. When focused, is automatically activated, causing its associated `tabpanel` to be displayed. Provides a title for its associated `tabpanel`.                                                                                                                                                                                                                                          |
|          | `aria-selected="true"`    | `button` | Indicates the tab control is activated and its associated panel is displayed. Set when a tab receives focus.                                                                                                                                                                                                                                                                                                                         |
|          | `aria-selected="false"`   | `button` | Indicates the tab control is not active and its associated panel is NOT displayed. Set for all tab elements in the tab set except the focused tab.                                                                                                                                                                                                                                                                                   |
|          | `tabindex="-1"`           | `button` | Removes the element from the page `Tab` sequence. Set when a tab is not selected so that only the selected tab is in the page `Tab` sequence. Since an HTML `button` element is used for the tab, it is not necessary to set `tabindex=0` on the selected (active) tab element. This approach to managing focus is described in the section on [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex). |
|          | `aria-controls="IDREF"`   | `button` | Refers to the `tabpanel` element associated with the tab.                                                                                                                                                                                                                                                                                                                                                                            |
| tabpanel |                           | `div`    | Indicates the element serves as a container for tab panel content. Is hidden unless its associated `tab` control is activated.                                                                                                                                                                                                                                                                                                       |
|          | `aria-labelledby="IDREF"` | `div`    | Refers to the `tab` element that controls the panel. Provides an accessible name for the tab panel.                                                                                                                                                                                                                                                                                                                                  |
|          | `tabindex="0"`            | `div`    | Puts the tabpanel in the page `Tab` sequence. Facilitates movement to panel content for assistive technology users. Especially helpful if there are panels that do not contain a focusable element.                                                                                                                                                                                                                                  |

@## Resources

- [W3 tabs example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html) has detailed information about the tabs accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-structure.html#kssref-structure-tabs) describes the core recommendations for the components.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
