---
title: Code
---

@## InputMask

This component is an input wrapper that allows you to set the format for the input value.

@## Mask

This is the example for a simple input with a `mask`. The mask is set via the mask property, which determines the input format and value validation.

> Be sure to set the placeholder input with the mask. As a rule, it duplicates the mask itself.

@example basic

@## Aliases

`aliases` is the object that defines how characters in the mask are validated. By default, they are configured as follows:

- `9` - numbers
- `a` - Latin and Cyrillic letters in any case
- `*` - numbers and Latin and Cyrillic letters in any case

@example aliases

@## Pipe

`pipe` is a function that processes and changes the `InputMask` value after user input.

In the example below, it is used for formatting and validating the card's expire date input. The focus is switched to the next input by the `onSucces` event. It is called when the entered value fully matches the input mask.

@example pipe
