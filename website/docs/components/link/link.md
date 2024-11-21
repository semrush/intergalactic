---
title: Link
fileSource: link
tabs: Design('link'), A11y('link-a11y'), API('link-api'), Example('link-code'), Changelog('link-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import Link from '@semcore/ui/link';
import CheckM from '@semcore/ui/icon/Check/m';
import CheckL from '@semcore/ui/icon/Check/l';
import ArrowRightM from '@semcore/ui/icon/ArrowRight/m';
import ArrowRightL from '@semcore/ui/icon/ArrowRight/l';

const SIZE = [
  { value: '100', name: '100 = 12px' },
  { value: '200', name: '200 = 14px' },
  { value: '300', name: '300 = 16px' },
  { value: '400', name: '400 = 20px' },
  { value: '500', name: '500 = 24px' },
  { value: '600', name: '600 = 32px' },
  { value: '700', name: '700 = 36px' },
  { value: '800', name: '800 = 48px' },
];

const Preview = (preview) => {
  const { bool, select, radio, text } = preview('Button');

  const size = select({
    key: 'size',
    defaultValue: '300',
    label: 'Size',
    options: SIZE,
  });

  const color = text({
    key: 'color',
    label: 'Color',
    defaultValue: '',
    placeholder: '',
  });

  const active = bool({
    key: 'active',
    defaultValue: false,
    label: 'Active',
  });

  // const noWrap = bool({
  //   key: 'noWrap',
  //   defaultValue: true,
  //   label: 'NoWrap',
  // });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  const beforeIcon = bool({
    key: 'before',
    defaultValue: false,
    label: 'AddonLeft',
  });

  const afterIcon = bool({
    key: 'after',
    defaultValue: false,
    label: 'AddonRight',
  });

  const child = text({
    key: 'children',
    defaultValue: 'Link',
    label: 'Text',
  });

  const renderIcon = (position, size) => {
    switch (position) {
      case 'before':
        return size < 400 ? <CheckM /> : <CheckL />;
      case 'after':
        return size < 400 ? <ArrowRightM /> : <ArrowRightL />;
      default:
        return false;
    }
  };

  return (
    <Link color={color} size={size} disabled={disabled} active={active} href='#'>
      {beforeIcon && <Link.Addon>{renderIcon('before', size)}</Link.Addon>}
      {beforeIcon || afterIcon ? <Link.Text>{child}</Link.Text> : child}
      {afterIcon && <Link.Addon>{renderIcon('after', size)}</Link.Addon>}
    </Link>
  );
};
const App = PlaygroundGeneration(Preview);
</script>

:::

## Description

**Link** is a component used to create clickable links that lead to other web pages or elements. Links can be internal (within the same website) or external. It's a "quiet request" (visually subtle) control according to the [Visual loudness scale](/core-principles/visual-loudness-scale/visual-loudness-scale) guide.

## Appearance

**Default link:** An accent control that links to another web page.

![](static/default-link.png)

**Custom link:** A link with customized functionality and visual appearance. When creating custom links, follow the basic rules of default links. Avoid excessive use of custom links in your interface. Color for hover and active states, and color for icon is calculated with CSS filter, so you don't need to set them by yourself.

![](static/custom-link.png)

## Sizes and margins

You can add addons before and after the link text. Addons always have a 4px margin from the link text.

- The icon should represent the action that will be performed by the link.
- If clicking the link with an icon triggers a time-consuming process, you can replace the icon with the [Spin](/components/spin/spin) component.

Table: Link text and addon sizes and margins

| Text size                               | Appearance example     | Icon size |
| --------------------------------------- | ---------------------- | --------- |
| 12-16px (`--fs-100`-`--fs-300` tokens)  | ![](static/link-m.png) | M         |
| 20px and bigger (from `--fs-400` token) | ![](static/link-l.png) | L         |

## Interaction

Table: Default link states

| State         | Appearance    | Description     | Cursor    |
| ------------- | ------------- | --------------- | --------- |
| Normal        | ![](static/default.png)                     | The link uses the `--text-link` token for color without underline.  | `pointer` |
| Active/hover  | ![](static/hover-active.png)                 | The link changes its color to `--text-link-hover-active` and displays a solid underline on hover. If the link includes an icon, the icon's color changes alongside the text as they share the same active zone. | `pointer` |
| Disabled      | ![](static/disabled.png)                  | The component's transparency decreases from 100% to 30% to indicate the disabled state. Use this state sparingly and provide a tooltip with a message for the disabled link.   | `default` |
| Visited       | ![](static/default-visited.png)            | The link uses the `--text-link-visited` token for color. This state is optional. | `pointer` |
| Visited (hover) | ![](static/hover-active-visited.png) | The link uses the `--text-link-visited` token for color and displays a solid underline on hover. This state is optional. | `pointer` |

<!--
Hided this section because it's for the dark theme.

### Link invert

| State         | Appearance                                               | Description                                                                                                                                                                                   | Cursor    |
| ------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Normal        | ![normal](static/default-invert.png)                     | Link has `--blue-200` color, without underline.                                                                                                                                               | `pointer` |
| Active/hover  | ![hover](static/hover-active-invert.png)                 | Link changes its color to `--blue-300`. A solid underline appears. If the link is used together with the icon, then the icon changes its color with the text – they have the same active zone. | `pointer` |
| Disabled      | ![hover](static/disabled-invert.png)                     | he component changes its transparency from 100% to 30%. Use this state as a last resort and be sure to add tooltip with a message to the `disabled` link.                                     | `pointer` |
| visited       | ![visited](static/default-invert-visited.png)            | Link has `--purple-500` color. This state is an optional.                                                                                                                                     | `pointer` |
| visited hover | ![visited-hover](static/hover-active-invert-visited.png) | Link has `--purple-500` color with a solid underline. This state is optional.                                                                                                                 | `pointer` | -->

## Links on dark and colored background

Default links can be used on a colored background within a [Notice](/components/notice/notice) component.

![](static/default-yes.png)

## Link text and target zone

::: tip
_Link sizes should be generous. Large link sizes make it easier for users with low coordination or on mobile devices to activate links. Link size consideration is most important for links that aren't contained within blocks or paragraphs of text, such as call to action links. Links should be at least 44px wide and 22px tall._

_Links shouldn't be too large on mobile. Very large links that take up much of the viewport can be accidentally activated, such as when a user touches the screen to scroll up or down._

[Yale University article about the accessible links](https://usability.yale.edu/web-accessibility/articles/links#other-design-considerations)
:::

For a link that leads to another page or opens a modal dialog, the link text should clearly indicate the type of page or modal window it will be. Use an infinitive form ("What should be done?") for the link text.

![](static/name-example-1.png)

![](static/name-example-2.png)

Avoid using very short link names as they can be difficult to click. If the link is still very short, increase its target area.

![](static/name-example-3.png)

Always put quotation marks inside the link.

![](static/name-example-4.png)

If a sentence ends with an email, URL, or domain link, omit the period in the end of the sentence. Users often select and copy addresses, and may accidentally include the period.

![](static/name-example-5.png)

Avoid putting punctuation marks in link text, except when the entire sentence is a link.

In lists, it's recommended to make the entire line a link to reduce visual clutter and improve click ability.

![](static/name-example-6.png)

If a link spans two lines, ensure that the cursor remains consistent throughout the interline area by using `display: block`.

![](static/name-example-7.png)

## Margin between links

For links placed in one line, maintain a margin between them that's a multiple of 4px:

- 20px for sufficient space
- 12px for limited space

![](static/link-margin.png)

## Default link or ButtonLink?

::: tip
For more information refer to [ButtonLink](../button/button.md#button-with-link-styles).
:::

- Default link is suitable for going to a page, either internal (within domain) or external, opening an email address or download a file.
- `ButtonLink` can be used in cases where you'd normally use a button, but there's not enough space. Such cases are: reloading the page, updating data in a widget, opening a dialog or a dropdown, and so on.

Table: How to choose what type of link you should use

| Action on the page                     | Default link       | ButtonLink |
| -------------------------------------- | ------------------ | ---------- |
| Internal transition                    | ✅                 | ❌         |
| External transition                    | ✅                 | ❌         |
| Clickable email                        | ✅                 | ❌         |
| Reloading the page                     | ❌                 | ✅         |
| Updating data in a small block/widget  | ❌                 | ✅         |
| Updating data in a table row           | ❌                 | ✅         |
| Opening a modal window                 | ❌                 | ✅         |
| Opening a dropdown                     | ❌                 | ✅         |
| Opening an accordion                   | ❌                 | ✅         |
| Opening the full text on the same page | ❌                 | ✅         |
| `DescriptionTooltip` on click          | ❌                 | ✅         |

## Links in tables

- Use [tertiary buttons](/components/button/button) in tables whenever there's enough space. If the space is limited, you can use [ButtonLink](../button/button.md#button-with-link-styles) instead.
- In table rows, use 14px links. If the link is a URL leading to an external page, include the `LinkExternal` icon with M size and `--icon-secondary-neutral` color next to it. Ensure it has a `margin-left: var(--spacing-1x)`.

![](static/table-yes-no.png)

## External links

::: tip
External links always open in a new tab.
:::

Table: Cases for appearance of external links

| Case description     | Transition inside product | Transition to external resource | Appearance example     |
| ---- | ------------------------------------------------ | ---------------------- | --------------------------------------------- |
| Link leads to a page within the product. In this case, you don't need to add the `LinkExternal` icon to the link. Add URL only to the link text.      | ✅         | ❌                                            | ![](static/link-example-1.png) |
| If the link leads to an external website or product, then only the `LinkExternal` icon next to the link should have a URL. The icon is always gray.          | ❌                                               | ✅                                            | ![](static/link-example-2.png)                                                                           |
| If the link leads to both a page within the product and an external resource, the text and `LinkExternal` icon must have a different URL and color. The text always leads to a page within the product, and `LinkExternal` icon always leads to an external resource. | ✅                                               | ✅                                            | ![](static/link-example-3.png)                                                                           |

### Styles

- Use the `LinkExternal` icon with M size and `--icon-secondary-neutral` color to indicate the transition to an external resource.
- The icon should always have a `margin-left: var(--spacing-1x)`.
- When hovering over the icon, it changes color to the darker one with CSS filter.
- If necessary, you can use link styles to highlight the external resource icon.

## Usage in UX/UI

Avoid using the link component for text that doesn't lead to another page or perform an action to prevent misleading users.

![](static/yes-no-link.png)

