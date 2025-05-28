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
| `Tab`         | Moves keyboard focus to the next focusable element. <br>The main part of the tag is focusable only if the tag is interactive. <br>The **Close** button is always foculable if present.          |
| <nobr>`Shift + Tab`</nobr> | Moves focus to the previous focusable element.                                    |
| `Enter`       | Activates an interactive tag. <br>Alternatively, removes the tag if the **Close** button is focused. |

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Roles and attributes

| Component | Role | Attribute         | Usage           |
| ------------------- | ------ | ----------------- | -------------------------------------------------------------------------------------------------------- | 
|`Tag`  |  |`tabIndex="-1"` | Removes the tag from the page `Tab` sequence. This attribute is added to the noninteractive tag. |
|`Tag` with `interactive` property | `button` |       | Defines an interactive tag as a button.  |
| `Tag.Close` | `button` | `aria-label="Remove"` | Defines an icon as a button and adds label to it for assistive technologies. |

## Considerations for developers

- Make sure screenreader reads your tags list as a group. Refer to the [Grouping tags example](./tag-code#grouping-tags).
- Interactive tags that are used as a button or a link for filtering content should also follow the accessibility guidelines for [Button](/components/button/button-a11y) or [Link](/components/link/link-a11y), respectively.

## Considerations for designers

- Tag text should be clear and concise.
- We recommend you to use only colors with 500 tone from [our palette tokens](/style/design-tokens/design-tokens#base-tokens-palette). They are selected with the 60Lc contrast (according to APCA) between the text and background. Color applies to the text and automatically calculates other tag colors (background, icon color, states' styles).
- In the case where you use other colors to color the tag, make sure to [check the contrast of the tag text against the background](/core-principles/a11y/a11y-design#color-and-contrast).

## Resources

To find more information on the ways to make your tags accessible by the keyboard and screen readers, see [Creating accessible tag](https://a11y-guidelines.orange.com/en/web/components-examples/tags/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
