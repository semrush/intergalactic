---
title: TabLine
fileSource: tab-line
a11y: AA
tabs: Design('tab-line'), A11y('tab-line-a11y'), API('tab-line-api'), Example('tab-line-code'), Changelog('tab-line-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                          | Function                                                                                                                                                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                        | When focus moves into the tab list, the active `tab` element gets the focus. When the tab list contains the focus, `Tab` moves focus to the next element in the `Tab` sequence, which is the `tabpanel` element. |
| `Left Arrow` , `Right Arrow` | Changes the state of next/previous `tab` element in the group to `active`. If focus is on the last/first `tab`, arrows move focus to the first/last `tab` respectively.                                          |
| `Space`/`Enter`              | Activates focused `tab` element. Works only when TabLine has `behavior='manual'`.                                                                                                                                |

### Roles & attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component           | Attribute               | Usage                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TabLine`           | `role="tablist"`        | Indicates that the element serves as a container for a set of tabs.                                                                                                                                                                                                                                                                                                                                                                |
| `TabLine.Item`      | `role="tab"`            | Indicates the element serves as a `tab` control. When focused, is automatically activated, causing its associated `tabpanel` to be displayed. Provides a title for its associated `tabpanel`.                                                                                                                                                                                                                                      |
| `TabLine.Item`      | `aria-selected="true"`  | Indicates the tab control is activated and its associated panel is displayed. Set when a tab receives focus.                                                                                                                                                                                                                                                                                                                       |
| `TabLine.Item`      | `aria-selected="false"` | Indicates the tab control isn’t active and its associated panel isn’t displayed.                                                                                                                                                                                                                                                                                                                                                   |
| `TabLine.Item`      | `tabindex="-1"`         | Removes the element from the page `Tab` sequence. Set when a tab isn’t selected so that only the selected tab is in the page `Tab` sequence. Since an HTML `button` element is used for the tab, it isn’t necessary to set `tabindex=0` on the selected (active) tab element. This approach to managing focus is described in the section on [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd-roving-tabindex). |

## Considerations for designers & developers

### Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes you need to set to `tabpanel` with your content to make TabLine and content it operates fully accessible. [Check our code examples](/components/tab-line/tab-line-code).

Table: Roles and attributes

| Component / element | Attribute                 | Usage                                                                                                                                                                                                                                  |
| ------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TabLine`           | `aria-label` or `aria-labelledby="IDREF"` | Adds an accessible name for a set of tabs.                                                                                                                                                                            |
| `TabLine.Item`      | `aria-controls="IDREF"`   | Refers to the `tabpanel` element associated with the tab.                                                                                                                                                                              |
| `div`               | `role="tabpanel"`         | Indicates the element serves as a container for tab panel content. Is hidden unless its associated `tab` control is activated.                                                                                                         |
| `div`               | `aria-labelledby="IDREF"` | Refers to the `tab` element that controls the panel. Provides an accessible name for the tab panel.                                                                                                                                    |
| `div`               | `tabIndex="0"`            | Puts the `tabpanel` in the page `Tab` sequence. Facilitates movement to panel content for assistive technology users. Especially helpful if any panels in a set contain content where the first element in the panel is not focusable. |

## Resources

- [W3 tabs example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html) has detailed information about the tabs accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-structure.html#kssref-structure-tabs) describes the core recommendations for the tabs.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
