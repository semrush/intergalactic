---
title: Validation
tabs: Design('validation-form'), A11y('validation-form-a11y'), Example('validation-form-code')
---

## Description

**Validation** refers to the process of checking if the user's input is correct.

## How validation works

Input's validation can be performed two ways:

| Validation type | Description | Important notes |
| --------------- | ----------- | --------------- |
| By `unFocus`    | Happens right away when user types something in the input and clicks outside it (`unFocus`). Input (or inputs) gets invalid state and become highlighted. When user focuses an invalid input, it shows tooltip with a message what should be fixed. | In this case avoid validating empty fields (where nothing has been typed) right after the user clicks outside them (`unFocus`). |
| By `submit` | Happens by submitting button (usually at the end of the form). Input (or inputs) gets invalid state and become highlighted. The first invalid input gets focus accompanied by a tooltip with a message what should be fixed. | For this case it's good to keep primary buttons active (not disable them). This way, users won't think the form or filter is broken. |



If the page is long, focusing on the initial input with an error should scroll the page to it. In such cases, a tooltip providing correction guidance should also be visible.

::: tip
If the form is long and the first invalid input is focused, the page should scroll to it and show a tooltip with a message what should be fixed.

The message should explain why the input is invalid or gives steps to fix it. Try to place the message close to the input and end it with a period.
:::

### How the invalid state is removed from the input

- If browser-based validation is in play, the `invalid` state can be reset as soon as the input becomes `valid`.
- For server-based validation, the `invalid` state can be reset each time input data changes.

If users address inputs with errors out of sequence, all uncorrected inputs will remain highlighted, unless changes are made to them.

## unFocus validation

Where deductions of paid limits and backend complexities are absent, immediate validation can be applied as users complete forms. Use this validation approach to facilitate form and filter completion. Displaying correction cues before submitting the form is recommended.

![](static/immediate-validation.png)

## Appearance

Uniformly, all form elements assume an `invalid` state, marked by a `var(--border-danger-active)` border. When focused, this state triggers a tooltip with the `warning` theme.

![](./static/checkbox-validation.png)

![](./static/radio-validation.png)

![](./static/input-validation.png)

![](./static/select-validation.png)

![](./static/textarea-validation.png)

## Notice with error message

For guidance on positioning the error message notice, refer to the [Notice](/components/notice/notice).

## Validation messages

A standard text pattern is: Please enter something.

Table: Validation messages

| Condition  | Text            |
| ---------- | --------------- |
| Empty field | If referring to user data input, use: Please enter your [field name]. |
| Entering someone else's data | Use: Please enter a/an [field name].  |
| Field filled with erroneous data | For instance, with email field: Please enter a valid email. |
| Checkbox error for Terms & Conditions | Use: Please confirm that you agree to our Terms and Conditions and Privacy Policy.   |

