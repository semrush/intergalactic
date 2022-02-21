---
title: Informer
tabName: Guide
---

@## Description

**Informer** is a pattern used for visual marking of hints in the interface.

It is required when there is no space or possibility to put, for example, [hint link](/style/typography/) next to the component.

@## Appearance

The informer consists of:

- an icon of the desired size (left padding 4px);
- a [tooltip](/components/tooltip/) with information (appears when you hover over the icon).

> 💡 The Info icon shouldn't be used with the h1 title. This is generally the header of hero blocks, etc. Hiding them in an info icon is strange, isn't it? 😎

| Size | Appearance                                 | Use                                                                                                                    |
| ---- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| M    | ![info icon m size](static/info-m.png)     | Used only with the largest titles – h2 (`--fs-700`) and h3 (`--fs-600`), text of size from 33px, XL components (42px). |
|      |                                            | ![info icon m size example](static/m.png)                                                                              |
| S    | ![info icon s size](static/info-s.png)     | Used only with h4 and text of size 25px (`--fs-500`), and L components (32px).                                         |
|      |                                            | ![info icon s size example](static/s.png)                                                                              |
| XS   | ![info icon xs size](static/info-xs.png)   | Used next to widget headings, tables, and components of size M (26px).                                                 |
|      |                                            | ![info icon xs size example](static/xs.png)                                                                            |
| XXS  | ![info icon xxs size](static/info-xxs.png) | Used only inside `Options` next to the text.                                                                           |
|      |                                            | ![info icon xxs size example](static/xxs.png)                                                                          |

@## Interaction

|        | Appearance example                           | Styles                                                   |
| ------ | -------------------------------------------- | -------------------------------------------------------- |
| normal | ![info icon xs size](static/info-xs.png)     | `background-color: $stone;`                              |
| hover  | ![info icon with hover](static/hover-xs.png) | The icon color doesn't change on hover. Only cursor changes to `cursor: help;`. |

@## Click zone

| Icon size | The size of the click zone                        |
| --------- | ------------------------------------------------- |
| M         | `30px * 30px`                                     |
|           | ![hover zone m size](static/hover-zone-m.png)     |
| S         | `24px * 24px`                                     |
|           | ![hover zone s size](static/hover-zone-s.png)     |
| XS        | `20px * 20px`                                     |
|           | ![hover zone xs size](static/hover-zone-xs.png)   |
| XXS       | `16px * 16px`                                     |
|           | ![hover zone xxs size](static/hover-zone-xxs.png) |

@## The tooltip

About the tooltip you can check in the [Tooltip](/components/tooltip/).

@## Use in UX/UI

If the `Info` icon hides additional information about the control in a group of controls (for example, it occurs in filters and formats), then pay attention to margins and don’t forget about [rules of external and internal proximity](https://bureau.ru/bb/soviet/20140818/).

![info icon yes-no situation](static/informer-yes-no.png)

In the case when controls have text labels, the `Info` icon should be placed next to the labels.

![info icon with group of buttons](static/info-with-butt-group.png)

@page informer-code
