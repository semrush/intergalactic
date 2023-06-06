---
title: InputMask
fileSource: input-mask
tabName: Design
---

@import playground

@## Description

**InputMask** is a wrapper that enables you to define the format for an input value. It provides users with guidance on the expected number and format of the data they need to enter.

> Note that InputMask should not be used as a placeholder for the input field.

The mask helps users prevent errors by ensuring they enter the correct number of characters and automatically formats the input value.

**Consider using InputMask in the following situations:**

- When the format for the data is known.
- When the user needs to enter a specific (usually lengthy) number of characters.

However, if you don't have precise information about the format of the data, it is not recommended to use InputMask.

@## Appearance

The character `_` is used as a space holder for each character in the mask.

It is important to include a placeholder in the input field with the same format as the mask. The placeholder helps users navigate the form and understand which inputs are not filled in yet.

Find an example of using a mask in an input field for entering a phone number in the [Example tab](/components/input-phone/input-phone-code).

|             | Appearance examples      | Tokens                                         |
| ----------- | ------------------------ | ---------------------------------------------- |
| Placeholder | ![](static/placeholder-default.png) | Placeholder use `--text-placeholder` as color. |
| Mask        | ![](static/mask-default.png)        | Mask use `--text-primary` as color.            |

@## Hint instructions

We suggest including clear text instructions for inputs that have specific data format requirements.

| Size (height in px) | Hint text size | Appearance example                  | Margins                                   |
| ------------------- | ------------------- | ----------------------------------- | ----------------------------------------- |
| M (28px)            | 12px (use `--fs-100`, `--lh-100` tokens) | ![](static/inputmask-help-text-m.png) | ![](static/inputmask-help-text-margin-m.png) |
| L (40px)            | 14px (use `--fs-200`, `--lh-200` tokens) | ![](static/inputmask-help-text-l.png) | ![](static/inputmask-help-text-margin-l.png) |

@## Interaction

You have the ability to validate the characters that the user enters. If the user inputs an invalid character, such as `/`, the InputMask will remove it automatically.

Find an example of the mask behavior in the in an input field for entering a phone number in the [Example tab](/components/input-phone/input-phone-code).

| Placeholder        | Focus with mask        | Filled input                                    |
| ------------------ | ---------------------- | ----------------------------------------------- |
| ![](static/placeholder-default.png) | ![](static/mask-focus.png) | ![](static/mask-filled.png)|

@page input-mask-a11y
@page input-mask-api
@page input-mask-code
@page input-mask-changelog
