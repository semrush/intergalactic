---
title: Variables and basic styles
---

@## Description

This section describes all the variable parameters that we use in our component styles.

@## Main denominator

**The main denominator of our interface is 4**. All margins between the components and widgets shall be a multiple of this denominator. All paddings and margins in the widgets shall also be a multiple of 4. These rules help to keep consistency.

> 💡 Paddings inside some atomic components (icons, labels, etc.) may differ from multiples of 4, as they depend on other variable values.
>
> You don't have to think about padding inside buttons, icons, etc. — our [libraries in Figma](https://www.figma.com/@semrush) and code are designed to do it for you.

@## Basic colors

> See [Visual loudness scale](/patterns/visual-loudness-scale/) guide for more information about colors using and visual hierarchy.

|                                              | Example                                 | Variable        |
| -------------------------------------------- | --------------------------------------- | --------------- |
| Defaulr text color                           | ![text](static/text.png)                | `--gray800`     |
| Secondary text color                         | ![secondary](static/secondary-text.png) | `--gray500`     |
| Placeholder color                            | ![placeholder](static/placeholder.png)  | `--gray300`     |
| Color for text on a dark or color background | ![dark bg](static/text-on-dark.png)     | `white`         |
| Link color                                   | ![link](static/link.png)                | `--blue500`     |
| Color of success ✅                          | ![success](static/success.png)          | `--green500`    |
| Color of warning, validation and error ⚠️    | ![warning](static/warning.png)          | `--red500`      |
| Brand color, branded controls, and elements  | ![brand](static/brand.png)              | `--brand-color` |

@## Component's size system

| Size (height) | Description                                                                                                                                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| XL (48px)     | An extra-large size of components that are used mainly for marketing landing pages.                                                                                                                                                                           |
| L (40px)      | A large size of the components. For buttons and inputs, it is 28px. For other components such as tags, labels, input fields, etc., it is a size with 16px text size. Components (such as counters and tags) which is used inside the inputs use 14 text size. |
| M (28px)      | **Default size of components**. For buttons and inputs, it is 28px. For other components such as tags, labels, input fields, etc., it is a size with 14px text size. Components (such as counters and tags) which is used inside the inputs use 12 text size. |
| S (20px)      | A small size of the components. For components such as tags, labels, input fields, etc., it is a size with 12px text size. **When using this size, keep in mind that this size of text is difficult to read** 🙏                                              |

@## States

|           | Rules for styles                                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hover** | 1. Use next color shade from the [main palette](/style/palette). _E.g. if element has `--gray300` as a color in normal state, then use `--gray400` for it's hover state._ |
|           | 2. If it is an element with a transparent background (usually, it is opacity of 0 – 15%), then it changes its transparency by 20% when hovering.                          |

|            | Rules for styles                                                                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Active** | 1. For buttons use next to the hover's color shade from the [main palette](/style/palette). _E.g. if element has `--blue400` as a color in hover state, then use `--blue500` for it's active state._ |
|            | 2. If it's an element with a transparent background (usually, it is opacity of 0 – 15%), then in an active state it changes its transparency by 30%.                                                 |

|              | Styles and variables                                                                                                                                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Focus**    | `--keyborad-focus`. It's `0 0 0 3px rgba(blue400, .3);`. For `normal` and `active` states, the focus color is `--blue400`. For `invalid` and `valid` states see colors below. |
| **Invalid**  | `border-color: var(--red400);`                                                                                                                                                |
| **Valid**    | `border-color: var(--green400);`                                                                                                                                              |
| **Disabled** | `--disabled-opacity`                                                                                                                                                          |
| **Loading**  | Use [Spinner](/components/spin) for marking this state.                                                                                                                       |

@## Borders & dividers

|                                                         | Variable    |
| ------------------------------------------------------- | ----------- |
| Primary color of borders and dividers                   | `--gray200` |
| Secondary color of borders and dividers (e.g. popovers) | `--gray100` |

@## Box-shadows

|                                                                                      | Variable              | Styles                                                                           |
| ------------------------------------------------------------------------------------ | --------------------- | -------------------------------------------------------------------------------- |
| Card                                                                                 | `--box-shadow-card`   | `0px 1px 2px 0px rgba(25, 27, 35, 0.12), 0px 0px 1px 0px rgba(25, 27, 35, 0.16)` |
| Card's hover                                                                         | `--box-shadow-hover`  | `3px 3px 30px 0px rgba(25, 27, 35, 0.15)`                                        |
| Shadow of the widgets and components, raised above the content (dropdowns, popovers) | `--box-shadow-popper` | `0px 1px 12px 0px rgba(25, 27, 35, 0.15)`                                        |
| Modal window                                                                         | `--box-shadow-modal`  | `0px 3px 8px 0px rgba(25, 27, 35, 0.2)`                                          |
| Drag & drop shadow                                                                   | `--box-shadow-dnd`    | `0 0 1px rgba(25, 27, 35, 0.16), 0 12px 40px rgba(25, 27, 35, 0.16)`             |

@## Border-radius

These are rules for the rounding radius of controls, fields, dropdowns, etc.

| Variable             | Usage                                           |
| -------------------- | ----------------------------------------------- |
| `--rounded-l: 12px;` | Use only for Modal window.                      |
| `--rounded-m: 6px;`  | Use for all inputs, controls and widgets.       |
| `--rounded-s: 4px;`  | Use only for checkboxes and placeholder addons. |

@## Mask, overlay

|                                  | Styles and variables               |
| -------------------------------- | ---------------------------------- |
| Black                            | `background: --var(gray800,0.70);` |
| Black for dialog in dialog cases | `background: --var(gray800,0.40);` |
| White                            | `background: --var(white,0.85);`   |
