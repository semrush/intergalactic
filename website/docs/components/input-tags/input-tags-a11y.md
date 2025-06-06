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

Find detailed information about the keyboard support for input fields in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input-and-textarea).

### Roles and attributes

The following table describes roles and attributes the component already has.

Table: Roles and attributes

| Element              | Attribute                  | Usage                              |
| -------------------- | -------------------------- | ---------------------------------- |
| `InputTags` > `ul`   | `aria-label`               | Defines an accessible name for the list of tags. Automatically populated from the accessible name of `InputTags.Value`. |
| `InputTags.Tag.Text` | `aria-describedby="IDREF"` | **Only for `editable` tags**. Provides a "Press Enter to edit" description. |

## Considerations for developers

- Label `InputTags.Value` using either `<label>`, `aria-labelledby` or `aria-label`. Remember that, when using `<label>`, only one label can be associated with each form element. [Refer to our examples](/components/input-tags/input-tags-code).
- Indicate optional fields clearly by adding the word "optional" beside the input label.
- Inputs in `invalid` state should be associated with their error message using `aria-describedby`.

## Resources

Read more about the accessibility of the components used in `InputTags`:

- [Tag](../tag/tag-a11y.md)
- [Input](../input/input-a11y.md)
- [Combobox](../auto-suggest/auto-suggest-a11y.md)

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
