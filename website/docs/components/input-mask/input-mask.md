---
title: InputMask
fileSource: input-mask
tabName: Design
---

@import playground

@## Description

**InputMask** is the input with a mask. Mask gives user the cue about the number and format of the data that needs to be entered.

> Note, that InputMask should not be used as an input placeholder.

The mask helps user to avoid mistakes when entering the required number of characters and automatically formats the entered value.

**Use InputMask when:**

- the format for the data is known;
- user needs to enter a certain (usually large) number of characters.

**Do not use InputMask if you don't know the exact format for the data.**

@## Appearance

The symbol that reserves space for character, — `_`.

> The mask has the color of the text, so it is important to add a placeholder to the input. It can reduplicate the mask. Placeholders help the user navigate the form and see which inputs are already filled in.

Example of using a mask in the [input field to enter a phone number](/components/input-phone/input-phone-code).

|             | Appearance examples                                | Tokens                                         |
| ----------- | -------------------------------------------------- | ---------------------------------------------- |
| Placeholder | ![](static/placeholder-default.png) | Placeholder use `--text-placeholder` as color. |
| Mask        | ![](static/mask-default.png)        | Mask use `--text-primary` as color.            |

@## Help instructions

We recommend you to provide visible text instructions for inputs with constraints, such as a specific format for data.

| Size (height in px) | Text size for the hint | Appearance example                  | Margins                                   |
| ------------------- | ------------------- | ----------------------------------- | ----------------------------------------- |
| M (28px)            | 12px (use `--fs-100`, `--lh-100` tokens) | ![](static/inputmask-help-text-m.png) | ![](static/inputmask-help-text-margin-m.png) |
| L (40px)            | 14px (use `--fs-200`, `--lh-200` tokens) | ![](static/inputmask-help-text-l.png) | ![](static/inputmask-help-text-margin-l.png) |

@## Interaction

You can validate the characters user enters. If the user enters an invalid character (for example, `/`), the InputMask will cut it.

Example of the mask behavior in the [input field for entering a phone number](/components/input-phone/input-phone-code).

| Placeholder                                        | Focus with mask                                    | Filled                                            |
| -------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------- |
| ![](static/placeholder-default.png) | ![](static/mask-focus.png) | ![](static/mask-filled.png) |

@page input-mask-a11y
@page input-mask-api
@page input-mask-code
@page input-mask-changelog
