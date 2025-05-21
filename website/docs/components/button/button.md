---
title: Button
fileSource: button
tabs: Design('button'), A11y('button-a11y'), API('button-api'), Example('button-code'), Changelog('button-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';

import PlaygroundGeneration from '@components/PlaygroundGeneration';

import Button, { ButtonLink } from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';
import CheckL from '@semcore/ui/icon/Check/l';
import ArrowRightM from '@semcore/ui/icon/ArrowRight/m';
import ArrowRightL from '@semcore/ui/icon/ArrowRight/l';

const COMPONENTS = [Button, ButtonLink];
const SIZES_BUTTON = ['m', 'l'];
const SIZES_LINK = [
  { value: '100', name: '100 = 12px' },
  { value: '200', name: '200 = 14px' },
  { value: '300', name: '300 = 16px' },
  { value: '400', name: '400 = 20px' },
  { value: '500', name: '500 = 24px' },
  { value: '600', name: '600 = 32px' },
  { value: '700', name: '700 = 36px' },
  { value: '800', name: '800 = 48px' },
];
const USE = {
  Button: ['primary', 'secondary', 'tertiary'],
  ButtonLink: ['primary', 'secondary'],
};
const THEME = {
  primary: ['info', 'success', 'brand', 'danger', 'invert'],
  secondary: ['info', 'muted', 'invert'],
  tertiary: ['info', 'muted', 'invert'],
};

const Preview = (preview) => {
  const { bool, select, radio, text } = preview('Button');

  const component = select({
    key: 'component',
    defaultValue: 'Button',
    label: 'Component',
    options: COMPONENTS.map((component) => ({
      name: component.displayName,
      value: component.displayName,
    })),
  });

  const sizeButton = component === 'Button'
  ? radio({
      key: 'sizeButton',
      defaultValue: 'm',
      label: 'Size',
      options: SIZES_BUTTON,
    })
  : null;

  const sizeLink = component === 'ButtonLink'
  ? select({
      key: 'sizeLink',
      defaultValue: '300',
      label: 'Size',
      options: SIZES_LINK,
    })
  : null;

  const use = select({
    key: 'use',
    defaultValue: 'secondary',
    label: 'Use',
    options: USE[component].map((value) => ({
      name: value,
      value,
    })),
  });

  const theme = component === 'Button'
  ? select({
      key: 'theme',
      placeholder: 'Select theme',
      label: 'Theme',
      options: THEME[use].map((value) => ({
        name: value,
        value,
      })),
    })
  : null;

  const color = component === 'ButtonLink'
  ? text({
      key: 'color',
      label: 'Color',
      defaultValue: '',
      placeholder: '',
    })
  : null;

  const active = bool({
    key: 'active',
    defaultValue: false,
    label: 'Active',
  });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  const loading = component === 'Button'
  ? bool({
      key: 'loading',
      defaultValue: false,
      label: 'Loading',
    })
  : null;

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
    defaultValue: 'Default text',
    label: 'Text',
  });
  const beforeIconMap = {
    l: <CheckM />,
    m: <CheckM />,
    false: <CheckM />,
    true: <CheckL />,
  };
  const afterIconMap = {
    l: <ArrowRightM />,
    m: <ArrowRightM />,
    false: <ArrowRightM />,
    true: <ArrowRightL />,
  };

  const renderIcon = (position, size) => {
    switch (position) {
      case 'before':
        return beforeIconMap[size];
      case 'after':
        return afterIconMap[size];
      default:
        return false;
    }
  };

  return (
    component === 'Button'
    ? <Button
        use={use}
        theme={theme}
        size={sizeButton}
        loading={loading}
        disabled={disabled || loading}
        active={active}
      >
        {beforeIcon && <Button.Addon>{renderIcon(beforeIcon && 'before', sizeButton)}</Button.Addon>}
        {(beforeIcon || afterIcon) && child ? <Button.Text>{child}</Button.Text> : child}
        {afterIcon && <Button.Addon>{renderIcon(afterIcon && 'after', sizeButton)}</Button.Addon>}
      </Button>
    : <ButtonLink
        use={use}
        size={sizeLink}
        color={color}
        disabled={disabled}
        active={active}
      >
        {beforeIcon && <ButtonLink.Addon>{renderIcon(beforeIcon && 'before', (parseInt(sizeLink, 10) > 300) )}</ButtonLink.Addon>}
        {(beforeIcon || afterIcon) && child ? <ButtonLink.Text>{child}</ButtonLink.Text> : child}
        {afterIcon && <ButtonLink.Addon>{renderIcon(afterIcon && 'after', (parseInt(sizeLink, 10) > 300) )}</ButtonLink.Addon>}
      </ButtonLink>
  );
};

const App = PlaygroundGeneration(Preview);
</script>

:::

## Description

**Button** is a control component that performs an action on the page. Compared to [Link component](/components/link/link), it's an accent control or call-to-action for performing actions on the page.

::: tip
In some cases, you can use the button as a [Link component](/components/link/link) that leads to another page.
:::

## Component composition

![](static/button-composition.png)

Component consists of the following:

1. `Button.Text`
2. `Button.Addon`

You can add addons before and after the text. As addons you can use:

- [Icon](/style/icon/icon)
- [Counter](/components/counter/counter)
- [Badge](/components/badge/badge)
- [Flag](/components/flags/flags)

## Appearance

### Sizes

Table: Button sizes and margins

| Button size (height in px) | Icon size | Margins                | Description                                                                                                              |
| -------------------------- | --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **M (28px)**               | M         | ![](static/size-m.png) | This is the default size of the button. Use it freely in filters, dropdowns, tables, etc.                                |
| **L (40px)**               | M         | ![](static/size-l.png) | Use this size in modal windows for main actions, empty pages and page states that need to focus user on the main action. |

### Types

Intergalactic Design System has three button types (`use` property in API):

- `primary`: Main accent button for filters and basic actions on the page.
- `secondary`: Default non-accent button for secondary/repetitive actions on the page.
- `tertiary`: Button type for third-party actions on the page. The tertiary button can be used when there is enough space and a large click area is needed.

All button types can be used on a white and gray background, as well as on a transparent colored background.

Table: Button types

| `use`       | Appearance example               |
| ----------- | -------------------------------- |
| `primary`   | ![](static/button-primary.png)   |
| `secondary` | ![](static/button-secondary.png) |
| `tertiary`  | ![](static/button-tertiary.png)  |

### Themes

You can use themes (`theme` property in API) for the buttons according to the visual hierarchy on the page. See the [visual loudness scale](/core-principles/visual-loudness-scale/visual-loudness-scale) guide.

Invert theme button is used on dark or colored background. For example in [Tooltip](/components/tooltip/tooltip), [NoticeBubble](/components/notice-bubble/notice-bubble), etc.

Table: Button themes

| `use` / `theme` | `muted`                         | `info`                        | `success`                    | `brand`                    | `danger`                    | `invert`                               |
| --------------- | ------------------------------- | ----------------------------- | ---------------------------- | -------------------------- | --------------------------- | -------------------------------------- |
| `primary`       | _no theme_                      | ![](static/info-butt.png)     | ![](static/success-butt.png) | ![](static/brand-butt.png) | ![](static/danger-butt.png) | ![](static/invert-normal.png)          |
| `secondary`     | ![](static/secondary-muted.png) | _deprecated_                  | _no theme_                   | _no theme_                 | _no theme_                  | ![](static/invert-second-normal.png)   |
| `tertiary`      | ![](static/tertiary-muted.png)  | ![](static/tertiary-info.png) | _no theme_                   | _no theme_                 | _no theme_                  | ![](static/invert-tertiary-normal.png) |

<!-- I'D REMOVED THIS SECTION BECAUSE IMO SHOWING STATIC IMAGES OF BUTTON STATES IS A BAD PRACTICE
## States

Table: States for all buttons types and themes

| Button type | Normal                        | Hover                           | Active                           | Loading                           | Disabled                           |
| ----------- | ----------------------------- | ------------------------------- | -------------------------------- | --------------------------------- | ---------------------------------- |
| `primary`   | ![](static/button-normal.png) | ![](static/button-hover.png)    | ![](static/button-active.png)    | ![](static/button-loading.png)    | ![](static/button-disabled.png)    |
| `secondary` | ![](static/secondary.png)     | ![](static/secondary-hover.png) | ![](static/secondary-active.png) | ![](static/secondary-loading.png) | ![](static/secondary-disabled.png) |
| `tertiary`  | ![](static/tertiary.png)      | ![](static/tertiary-hover.png)  | ![](static/tertiary-active.png)  | ![](static/tertiary-loading.png)  | ![](static/tertiary-disabled.png)  | -->

## Button with Link styles

::: warning
This component was created to ensure proper accessibility for existing patterns in the interface. Avoid adding buttons with link styles into new interfaces, especially with `use="primary"`. Instead, use either `Button` or `Link` depending on what the element does.
:::

If you need an element that looks like a link, but has the native button semantics, use the separate `ButtonLink` component instead of a link. For example, in the [Feedback](/components/feedback/feedback-form-code) and [ProductHead](/components/product-head/product-head-code) components, use `ButtonLink` as the dialog trigger.

Table: Button with Link styles

| Button type | Appearance example & states           |
| ----------- | ------------------------------------- |
| `primary`   | ![](static/button-link-primary.png)   |
| `secondary` | ![](static/button-link-secondary.png) |

The following table shows in which cases you should use `primary` or `secondary` `ButtonLink`.

Table: How to choose what type of ButtonLink you should use

| Action on the page                     | use="primary"                       | use="secondary" |
| -------------------------------------- | ----------------------------------- | --------------- |
| Reloading the page                     | ✅                                  | ❌              |
| Updating data in a small block/widget  | ✅                                  | ❌              |
| Updating data in a table row           | Allowed if it's an important action | ✅              |
| Opening a modal window                 | Allowed if it's an important action | ✅              |
| Opening a dropdown                     | Allowed if it's an important action | ✅              |
| Opening an accordion                   | Allowed if it's an important action | ✅              |
| Opening the full text on the same page | ❌                                  | ✅              |
| `DescriptionTooltip` on click          | ❌                                  | ✅              |

## Button width

The button width is determined by its content. But it can also be stretched to a certain width. For example:

```
w="100%"
```

It's necessary when the button text is short, but the button is a CTA on the page or in a modal window, or it performs an important action. Also, in terms of visual hierarchy, it isn’t good to make the button small-sized in such cases.

![](static/button-width.png)

It's important that the CTA is always visually more significant than the secondary button due to its color and size. So don't hesitate to make button wider if necessary.

![](static/button-width2.png)

If you need to use a single button we recommend you to set it's width to at least 120px.

![](static/button-width3.png)

## Button label

Button label always starts with a capital letter.

![](static/capitalize.png)

**Button label shall not exceed three words.** Too wordy controls are difficult to read. Try to fit the desired meaning into the short label.

![](static/max-length.png)

The label of the button should clearly indicate what happens after user clicks it.

![](static/define-action.png)

## Grouped buttons

**The margin between buttons should be [multiple of 4](/layout/box-system/box-system#spacing-system)**. If there are several buttons next to each other, use the recommended margins shown in table below.

Table: Grouped buttons

| L (40px)                 | M (28px)                 |
| ------------------------ | ------------------------ |
| ![](static/margin-1.png) | ![](static/margin-2.png) |

## Button variations

### Text button

Use text button when:

- the button is a CTA;
- the interface has enough space for buttons.

We recommend using a button with an icon and text in cases when:

- the button is a CTA, and it needs an additional visual accent (icon);
- the interface has enough space for buttons;
- user isn’t yet familiar with the functionality of the button, and icon or only text may not be enough for them to understand.

### Icon-only button

We recommend using the icon-only button if:

- interface hasn’t enough space;
- user can easily understand from the context its function (purpose) / user understands the functionality of the button without an explanation.

::: tip
**Add a tooltip with information about button's function to the icon-only buttons**. It helps user to understand functionality of the button if the icon isn’t the obvious one.
:::

### Branded buttons

In case when you need to show that button connects or links to some other service, use a branded color for the background or the corresponding color icon of the service.

- You can color the button in a branded color when you need to focus user's attention.
- You can use secondary button with the branded icon inside. This is the safest option in relation to saving the visual hierarchy of the product.

![](static/button-brand.png)

It may also be helpful checking the following branding guidelines:

- Google – [Sign-In Branding Guidelines](https://developers.google.com/identity/branding-guidelines?hl=ru)
- Facebook – [User Experience Design](https://developers.facebook.com/docs/facebook-login/userexperience) and [Brand Overview](https://about.meta.com/brand/resources/facebookapp/guidelines/)
- Instagram – [Brand Overview](https://about.meta.com/brand/resources/instagram/instagram-brand/)
- LinkedIn – [LinkedIn branding policies](https://brand.linkedin.com/policies)
- Twitter – [Brand Guidelines](https://about.twitter.com/en/who-we-are/brand-toolkit)
- Youtube – [Branding Guidelines](https://developers.google.com/youtube/terms/branding-guidelines) and [Brand resources](https://www.youtube.com/howyoutubeworks/resources/brand-resources/#overview)
- Pinterest – [How to use the Pinterest brand in your marketing](https://business.pinterest.com/en-us/brand-guidelines/)

## Usage in UX/UI

- Try to have one call-to-action button on the page in the modal window. _For example, one green button._
- We recommend you don’t disable CTA, even if something went wrong (especially in filters and modal windows with a single CTA). User needs to understand that the product/service is working. When user clicks on the button, add a message about the error or what user needs to do in this case.
- If you can't do without a button in the disabled state, be sure to include a tooltip for it explaining why the primary action is disabled.
- If there are a lot of actions in your interface, first of all set your priorities. Place controls in your interface according to the [visual loudness scale](/core-principles/visual-loudness-scale/visual-loudness-scale) guide. Use inactive "quiet" buttons in the interface. Don't "shout" at the user with your interface, let them work with your product in visual "silence" and comfort.
