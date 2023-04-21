---
title: Switch
fileSource: switch
tabName: Design
---

@import playground

@## Description

**Switch** is a control for instant switching between two options, states or functions.

Use it in cases when boolean operation submits user's choice instantly, without reloading the page and clicking the confirm button.

![](static/check-or-toggle.png)

@## Sizes and margins

Our switch has three sizes: xl, l and m.

You also can add a text label to switch input. The text of enabled option use `--text-primary` token for color, and the text of disabled option has `--text-secondary` token for color.

|     | Appearance and margins                     | Styles                                                                                                                            |
| --- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| XL  | ![](static/switch-on-text-xl.png) | `width: 44px`, `height: 24px`, circle size is 20px, `font-size: var(--fs-300)`, margin between the control and the text is 8px |
| L   | ![](static/switch-on-text-l.png)   | `width: 36px`, `height: 20px`, circle size is 16px, `font-size: var(--fs-200)`, margin between the control and the text is 8px |
| M   | ![](static/switch-on-text-m.png)   | `width: 20px`, `height: 12px`, circle size is 8px, `font-size: var(--fs-100)`, margin between the control and the text is 8px  |

@## Themes

Switch component has two themes: `info` and `success`.

| Theme   | Appearance example                            | Usage                                                                                                 |
| ------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Info    | ![](static/on-info.png) | Default theme for most common actions.                                                                |
| Success | ![](static/on-success.png) | Additional theme for cases when it;s necessary to emphasize the enabled positive state of the switch. |

> When the switch is used to enable/disable a social network account, you can use the appropriate brand color for the `active` state.

@## Icon

You can place an icon inside the switch with big sizes. We recommend you to use different icons for off and on states.

| Switch size | Off state                          | On state                          |
| ---------- | ---------------------------------- | --------------------------------- |
| XL         | ![](static/switch-off-icon-xl.png) | ![](static/switch-on-icon-xl.png) |
| L          | ![](static/switch-off-icon-l.png)  | ![](static/switch-on-icon-l.png)  |

@## Interaction

Switch has three possible states: off, on, and disabled. To change the state, user can click either on the switch itself or on the text label next to it.

| State    | Appearance                                                                              | Styles                                                                                                 |
| -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| off      | ![](static/off.png)                                                           | `background: var(--control-switch-bg)`                                                                |
| on       | ![](static/on-success.png) ![](static/on-info.png)                    | `background: var(--control-primary-success)` или `background: var(--control-primary-info)`           |
| Disabled | ![](static/disabled.png) ![](static/disabled-success.png) | Transparency of the component changes to 30%. Use [`--disabled-opacity`](/style/design-tokens/) token. |

@## Usage in UX/UI

**Use positive language for text labels in the Switch** to make it clear what interface will do if user enables the toggle.

Avoid negations such as: “Don't show trending subtopics”, — which would mean that the user would have to enable the switch so something will not be shown.

![](static/switchlabel_yes_no.png)

> Use verbs for the labels. _For example, "Send by email"._

You can use a label without a verb in cases when:

- you have not enough space in the interface;
- when the label belongs to a group of switches (for example, in the settings).

@page switch-a11y
@page switch-api
@page switch-code
@page switch-changelog
