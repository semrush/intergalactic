---
title: Tag
fileSource: tag
a11y: AA
tabs: Design('tag'), A11y('tag-a11y'), API('tag-api'), Example('tag-code'), Changelog('tag-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                                                          |
| ------------- | --------------------------------------------------------------------------------- |
| `Tab`         | Moves keyboard focus to the interactive tag and its `Close` icon button.          |
| `Shift + Tab` | Moves focus to the previous focusable element.                                    |
| `Enter`       | Toggles `active` state for interactive tag or removes tag by `Close` icon button. |

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Roles and attributes

| Component | Role | Attribute         | Usage           |
| ------------------- | ------ | ----------------- | -------------------------------------------------------------------------------------------------------- | 
|`Tag`  |  |`tabIndex="-1"` | Removes the tag from the page `Tab` sequence. This attribute is added to the noninteractive tag. |
|`Tag` with `interactive` property | `button` |       | Defines an interaсtive tag as a button.  |
| `Tag.Close` | `button` | `aria-label="Remove"` | Defines an icon as a button and adds label to it for assistive technologies. |

## Considerations for developers

- Make sure screenreader reads your tags list as a group. Refer to [Grouping tags example](link will be here).
- Interactive tags that are used as a button for filtering content should also follow the accessibility guidelines for [Button](/components/button/button-a11y).

## Considerations for designers

- Tag text should be clear and concise.
- Make sure to [check the contrast of the tag text against the background](/core-principles/a11y/a11y-design#color_and_contrast). Refer to [section about Tag colors](/components/tag/tag#tag-colors).
- Tag that is used as a link for filtering content should also follow the accessibility guidelines for [Link component](/components/link/link-a11y).

## Resources

To find more information on the ways to make your tags accessible by the keyboard and screen readers see [Creating accessible tag](https://a11y-guidelines.orange.com/en/web/components-examples/tags/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y#contrast).
