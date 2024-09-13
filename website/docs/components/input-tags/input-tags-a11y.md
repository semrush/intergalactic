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

See detailed information about the keyboard support for the input fields in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input_i_textarea).

## Considerations for developers

- Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique on each page, only one label can be associated to each unique form element. Keep it simple – do not all browsers correctly expose multiple labels that are linked to the same form element. [Refer to our examples](/components/input-tags/input-tags-code).
- Make optional fields obvious by adding text "optional" to the input.
- Inputs with `invalid` state should be associated with their error message. [Refer to the Validation pattern example](/patterns/validation-form/validation-form-code).

## Resources

Read more about the accessibility of the components used in `InputTags`:

- [Tag](../tag/tag-a11y.md)
- [Input](../input/input-a11y.md)
- [Combobox](../auto-suggest/auto-suggest-a11y.md)

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
