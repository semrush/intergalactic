---
title: BaseTrigger
fileSource: base-trigger
tabs: Design('base-trigger'), A11y('base-trigger-a11y'), API('base-trigger-api'), Example('base-trigger-code'), Changelog('base-trigger-changelog')
---

## Description

**BaseTrigger** is a foundational component for creating triggers with button-like behavior, resembling buttons, links, or filters.

`BaseTrigger` has the following types for using in different scenarios:

- `ButtonTrigger`
- `FilterTrigger`
- `LinkTrigger`

## Appearance

Table: BaseTrigger sizes, margins and paddings

| Size (height in px) | Appearance example                                       | Margins |
| ------------------- | -------------------------------------------------------- | ------- |
| M (28px)            | ![](static/base-trigger-m.png) ![](static/margins-m.png) | The button has `padding: 0 var(--intergalactic-spacing-2x)`, leading addon has `margin-right: var(--intergalactic-spacing-2x)`, trailing addon has `margin-left: var(--intergalactic-spacing-2x)`. |
| L (40px)            | ![](static/base-trigger-l.png) ![](static/margins-l.png) | The button has `padding: 0 var(--intergalactic-spacing-3x)`, leading addon has `margin-right: var(--intergalactic-spacing-2x)`, trailing addon has `margin-left: var(--intergalactic-spacing-2x)`. |

## Interaction

Table: BaseTrigger states

| State     | Appearance example                    | Styles |
| --------- | ------------------------------------- | ------ |
| Normal    | ![](static/base-trigger-normal.png)   | The background uses `--bg-primary-neutral` token. |
| Hover     | ![](static/base-trigger-hover.png)    | The background changes to `--bg-primary-neutral-hover`. |
| Active    | ![](static/base-trigger-active.png)   | The background reverts to `--bg-primary-neutral`, and border changes color to `--border-info-active`. |
| Invalid   | ![](static/base-trigger-invalid.png)  | The border changes color to `--border-critical-active`. |
| Valid     | ![](static/base-trigger-valid.png)    | The border changes color to `--border-success-active`. |
| Disabled  | ![](static/base-trigger-disabled.png) | The component changes opacity to `--disabled-opacity`. |

## ButtonTrigger

ButtonTrigger has the same sizes as BaseTrigger has.

Table: ButtonTrigger sizes

| Size (height in px) | Appearance example                      |
| ------------------- | --------------------------------------- |
| M (28px)            | ![](static/button-trigger-normal-m.png) |
| L (40px)            | ![](static/button-trigger-normal-l.png) |

### ButtonTrigger states

Table: ButtonTrigger states

| State  | Appearance example |
| ------ | ------------------ |
| Normal | ![](static/button-trigger-normal-m.png) ![](static/button-trigger-normal-l.png) |
| Hover  | ![](static/button-trigger-hover-m.png) ![](static/button-trigger-hover-l.png) |
| Active | ![](static/button-trigger-active-m.png) ![](static/button-trigger-active-l.png) |
| Invalid | ![](static/button-trigger-invalid-m.png) ![](static/button-trigger-invalid-l.png) |
| Disabled | ![](static/button-trigger-disabled-m.png) ![](static/button-trigger-disabled-l.png) |

## FilterTrigger

This type has separate detailed [FilterTrigger guide](/components/filter-trigger/filter-trigger) since it operates as an active state of a filter.

![](static/filter-trigger.png) ![](static/advanced-filter-trigger.png)

## LinkTrigger

LinkTrigger has the styles of the [Link component](/components/link/link).

Table: LinkTrigger sizes

| Size (height in px) | Appearance example                    |
| ------------------- | ------------------------------------- |
| M (28px)            | ![](static/link-trigger-normal-m.png) |
| L (40px)            | ![](static/link-trigger-normal-l.png) |

### LinkTrigger states

Table: LinkTrigger states

| State  | Appearance example |
| ------ | ------------------ |
| Normal | ![](static/link-trigger-normal-m.png) ![](static/link-trigger-normal-l.png) |
| Hover  | ![](static/link-trigger-hover-m.png) ![](static/link-trigger-hover-l.png) |
| Active | ![](static/link-trigger-active-m.png) ![](static/link-trigger-active-l.png) |
| Disabled | ![](static/link-trigger-disabled-m.png) ![](static/link-trigger-disabled-l.png) |

