---
title: Variables and basic styles
fileSource: utils
tabName: Design
---

> ✨ Soon there will be a description of the tokens! We are currently in the process of implementing them.

@## Description

This section describes all the variable parameters and basic styles that we use in our components.

@## Main denominator

**The main denominator in the design system is 4.** All margins between the components and widgets shall be a multiple of this denominator. All paddings and margins in the widgets shall also be a multiple of 4. These rules help to keep consistency.

> Paddings inside some atomic components (icons, labels, etc.) may differ from multiples of 4, as they depend on other variable values.
>
> You don't have to think about padding inside buttons, icons, etc. — our [libraries in Figma](https://www.figma.com/@semrush) and code are designed to do it for you.

@## Basic colors

> See [Visual loudness scale](/patterns/visual-loudness-scale/) guide for more information about colors using and visual hierarchy.

|                                              | Example                                 | Variable        |
| -------------------------------------------- | --------------------------------------- | --------------- |
| Defaulr text color                           | ![text](static/text.png)                | `--gray-800`    |
| Secondary text color                         | ![secondary](static/secondary-text.png) | `--gray-500`    |
| Placeholder color                            | ![placeholder](static/placeholder.png)  | `--gray-300`    |
| Color for text on a dark or color background | ![dark bg](static/text-on-dark.png)     | `white`         |
| Link color                                   | ![link](static/link.png)                | `--blue-500`    |
| Color of success ✅                          | ![success](static/success.png)          | `--green-500`   |
| Color of warning, validation and error ⚠️    | ![warning](static/warning.png)          | `--red-500`     |
| Brand color, branded controls, and elements  | ![brand](static/brand.png)              | `--brand-color` |

@## Component's size system

| Size | Description                                                                                                                                                                                                                                                   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| XL   | An extra large size of the components. It is a size with 16px text size. Components (such as counters and tags) which is used inside the inputs use 16 text size.                                                                                             |
| L    | A large size of the components. For buttons and inputs, it is 40px. For other components such as tags, labels, input fields, etc., it is a size with 16px text size. Components (such as counters and tags) which is used inside the inputs use 14 text size. |
| M    | **Default size of components**. For buttons and inputs, it is 28px. For other components such as tags, labels, input fields, etc., it is a size with 14px text size. Components (such as counters and tags) which is used inside the inputs use 12 text size. |

@## States

### Hover and active state style rules for components with a nontransparent background

![nontransparent controls](static/nontransparent.png)

|            | Rules for styles                                                                                                                                                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hover**  | Use next color shade from the [main palette](/style/palette). _E.g. if element has `--blue-400` as a color in normal state, then use `--gray-500` for it's hover state._                |
| **Active** | Use next to the hover's color shade from the [main palette](/style/palette). _E.g. if element has `--blue-500` as a color in hover state, then use `--blue-600` for it's active state._ |

### Hover and active state style rules for components with a transparent background

In normal state controls with transparent background has opacity of 0 – 15%.

![transparent controls](static/transparent.png)

|            | Rules for styles                           |
| ---------- | ------------------------------------------ |
| **Hover**  | Change it's opacity to 20% while hovering. |
| **Active** | Change it's opacity to 30%.                |

### Valid & invalid

![valid and invalid controls](static/valid-invalid.png)

|             | Styles and variables              |
| ----------- | --------------------------------- |
| **Invalid** | `border-color: var(--red-400);`   |
| **Valid**   | `border-color: var(--green-400);` |

### Focus

![focused controls](static/focus.png)

|                   | Styles and variables                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Focus**         | `--keyboard-focus`. It's `0 0 0 3px rgba(blue-400, .3);`. For `normal` and `active` states, the focus color is `--blue-400`. For `invalid` and `valid` states see colors below. |
| **Invalid focus** | `border-color: 0 0 0 3px rgba(red-400, .3);`                                                                                                                                    |
| **Valid focus**   | `border-color: 0 0 0 3px rgba(green-400, .3);`                                                                                                                                  |

### Disabled & loading

|              | Styles and variables                                    |
| ------------ | ------------------------------------------------------- |
| **Disabled** | `--disabled-opacity: 0.3;`                              |
| **Loading**  | Use [Spinner](/components/spin) for marking this state. |

@## Borders & dividers

|                                                         | Variable     |
| ------------------------------------------------------- | ------------ |
| Primary color of borders and dividers                   | `--gray-200` |
| Secondary color of borders and dividers (e.g. popovers) | `--gray-100` |

@## Box-shadows

![box-shadows](static/box-shadow.png)

|                                                                                      | Variable              | Styles                                                                       |
| ------------------------------------------------------------------------------------ | --------------------- | ---------------------------------------------------------------------------- |
| Card                                                                                 | `--box-shadow-card`   | `0px 1px 2px 0px rgba(gray-800, 0.12), 0px 0px 1px 0px rgba(gray-800, 0.16)` |
| Card's hover                                                                         | `--box-shadow-hover`  | `3px 3px 30px 0px rgba(gray-800, 0.15)`                                      |
| Shadow of the widgets and components, raised above the content (dropdowns, popovers) | `--box-shadow-popper` | `0px 1px 12px 0px rgba(gray-800, 0.15)`                                      |
| Modal window                                                                         | `--box-shadow-modal`  | `0px 3px 8px 0px rgba(gray-800, 0.2)`                                        |
| Drag & drop shadow                                                                   | `--box-shadow-dnd`    | `0 0 1px rgba(gray-800, 0.16)`                                               |

@## Border-radius

These are rules for the rounding radius of controls, fields, dropdowns, etc.

| Variable             | Usage                                           |
| -------------------- | ----------------------------------------------- |
| `--rounded-l: 12px;` | Use only for Modal window.                      |
| `--rounded-m: 6px;`  | Use for all inputs, controls and widgets.       |
| `--rounded-s: 4px;`  | Use only for checkboxes and placeholder addons. |

@## Mask, overlay

|                                  | Styles and variables                |
| -------------------------------- | ----------------------------------- |
| Black                            | `background: --var(gray-800,0.70);` |
| Black for dialog in dialog cases | `background: --var(gray-800,0.40);` |
| White                            | `background: --var(white,0.85);`    |

@page variables-code
