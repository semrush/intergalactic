---
title: InputTags
a11y: AA
tabs: Design('input-tags'), A11y('input-tags-a11y'), API('input-tags-api'), Example('input-tags-code'), Changelog('input-tags-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                                  | Function                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| `Tab`, <nobr>`Shift + Tab`</nobr>    | **On a tag, or in the empty text/combobox input:** moves focus to the next (previous) focusable element. <br>**In the filled text input:** adds a new tag. |
| `Enter`                              | **On an editable tag:** starts editing the tag. <br>**On a tag's Remove button:** removes the tag. <br>**In the filled text input:** adds a new tag. <br>**In the combobox input:** opens the list of items, or applies the selected item. |
| `Space`                     | **On an editable tag:** starts editing the tag. <br>**On a tag's Remove button:** removes the tag. <br>**In the filled text input:** first `Space` adds a space, second `Space` adds a new tag. |

Find detailed information about the keyboard support for input fields in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input_i_textarea).

## Considerations for developers

- Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique within the page, only one label can be associated with each form element. [Refer to our examples](/components/input-tags/input-tags-code).
- Indicate optional fields clearly by adding the word "optional" beside the input label.
- Inputs with the `invalid` state should be associated with their error message using `aria-describedby`.

## Resources

Read more about the accessibility of the components used in `InputTags`:

- [Tag](../tag/tag-a11y.md)
- [Input](../input/input-a11y.md)
- [Combobox](../auto-suggest/auto-suggest-a11y.md)

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
