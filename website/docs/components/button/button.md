---
title: Button
fileSource: button
tabName: Design
---

@import playground

@## Description

**Button** is a control component that performs an action on the page. Compared to [Link](/components/link/), it's an accent control or call-to-action for performing actions on the page.

> In some cases, you can use the button as a [Link](/components/link/) that leads to another page.

@## Component composition

![](static/margins.png)

`Button.Text` has margins on the right and left sides. You can add addons before and after the text. As addons you can use:

- [Icon](/style/icon/),
- [Counter](/components/counter/),
- [Badge](/components/badge/),
- [Flag](/components/flags/).

Addon before the text has margin-left, while the trailing addon has margin-right.

@## Sizes

| Button size  | Icon size | Appearance example             | Description                                                                                                              |
| ------------ | --------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **L (40px)** | M         | ![](static/size-l.png) | Use this size in modal windows for main actions, empty pages and page states that need to focus user on the main action. |
| **M (28px)** | M         | ![](static/size-m.png) | This is the default size of the button. Use it freely in filters, dropdowns, tables, etc.                                |

@## Button width

The button width is determined by its content. But it can also be stretched to a certain width. For example:

```
w="100%"
```

It is necessary when the button text is short, but the button is a CTA on the page or in a modal window, or it performs an important action. Also, in terms of visual hierarchy, it is not good to make the button small-sized in such cases.

![](static/button-width.png)

It is important that the CTA is always visually more significant than the secondary button due to its color and size. So don't hesitate to make button wider if necessary.

![](static/button-width2.png)

If you need to use a single button we recommend you to set it's width to at least 120px.

![](static/button-width3.png)

@## Button types

Intergalactic design system has three button types (`use` in API). All button types can be used on a white and gray background, as well as on a transparent colored background.

### Primary

Main accent button for filters and basic actions on the page.

| Normal                              | Hover                             | Active                              | Loading                               | Disabled                                |
| ----------------------------------- | --------------------------------- | ----------------------------------- | ------------------------------------- | --------------------------------------- |
| ![](static/button-normal.png) | ![](static/button-hover.png) | ![](static/button-active.png) | ![](static/button-loading.png) | ![](static/button-disabled.png) |

### Secondary

Default non-accent button for secondary/repetitive actions on the page.

| Normal                          | Hover                                | Active                                 | Loading                                  | Disabled                                   |
| ------------------------------- | ------------------------------------ | -------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| ![](static/secondary.png) | ![](static/secondary-hover.png) | ![](static/secondary-active.png) | ![](static/secondary-loading.png) | ![](static/secondary-disabled.png) |

### Tertiary

Button type for third-party actions on the page. The tertiary button can be used when there is enough space and a large click area is needed.

| Normal                         | Hover                               | Active                                | Loading                                 | Disabled                                  |
| ------------------------------ | ----------------------------------- | ------------------------------------- | --------------------------------------- | ----------------------------------------- |
| ![](static/tertiary.png) | ![](static/tertiary-hover.png) | ![](static/tertiary-active.png) | ![](static/tertiary-loading.png) | ![](static/tertiary-disabled.png) |

@## Themes

For the primary button you can use themes according to the visual hierarchy on the page. See the [visual loudness scale](/core-principles/visual-loudness-scale) guide.

| Info                                 | Success                                    | Danger                                   |
| ------------------------------------ | ------------------------------------------ | ---------------------------------------- |
| ![](static/info-butt.png) | ![](static/success-butt.png) | ![](static/danger-butt.png) |

### Invert theme

Invert theme button is used on dark or colored background. For example in [Tooltip](/components/tooltip/), [NoticeBubble](/components/notice-bubble/), etc.

|           | Normal                                       | Hover                                      | Active                                       | Loading                                        | Disabled                                         |
| --------- | -------------------------------------------- | ------------------------------------------ | -------------------------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| Primary   | ![](static/invert-normal.png)          | ![](static/invert-hover.png)          | ![](static/invert-active.png)          | ![](static/invert-loading.png)          | ![](static/invert-disabled.png)          |
| Secondary | ![](static/invert-second-normal.png)   | ![](static/invert-second-hover.png)   | ![](static/invert-second-active.png)   | ![](static/invert-second-loading.png)   | ![](static/invert-second-disabled.png)   |
| Tertiary  | ![](static/invert-tertiary-normal.png) | ![](static/invert-tertiary-hover.png) | ![](static/invert-tertiary-active.png) | ![](static/invert-tertiary-loading.png) | ![](static/invert-tertiary-disabled.png) |

@## Margins between buttons

**The margin between buttons shall be [multiple of 4](/layout/box-system/#spacing_system)**. If there are several buttons next to each other, use the recommended margins shown in table below.

| L (40px)                 | M (28px)                 |
| ------------------------ | ------------------------ |
| ![](static/margin-1.png) | ![](static/margin-2.png) |

@## Usage in UX/UI

- Try to have one call-to-action button on the page in the modal window. _For example, one green button._
- We recommend you do not disable CTA, even if something went wrong (especially in filters and modal windows with a single CTA). User needs to understand that the product/service is working. When user clicks on the button, add a message about the error or what user needs to do in this case.
- If you can't do without a button in the disabled state, be sure to include a tooltip for it explaining why the primary action is disabled.
- If there are a lot of actions in your interface, first of all set your priorities. Place controls in your interface according to the [visual loudness scale](/core-principles/visual-loudness-scale/) guide. Use inactive "quiet" buttons in the interface. Don't "shout" at the user with your interface, let them work with your product in visual "silence" and comfort.

@## Button variations

### Text button

Use text button when:

- the button is a CTA;
- the interface has enough space for buttons.

We recommend using a button with an icon and text in cases when:

- the button is a CTA, and it needs an additional visual accent (icon);
- the interface has enough space for buttons;
- user is not yet familiar with the functionality of the button, and icon or only text may not be enough for them to understand.

### Icon-only button

We recommend using the icon-only button if:

- interface has not enough space;
- user can easily understand from the context its function (purpose) / user understands the functionality of the button without an explanation.

> **Add a tooltip with information about button's function to the icon-only buttons**. It helps user to understand functionality of the button if the icon is not the obvious one.

@## Button label

Button label always starts with a capital letter.

![](static/capitalize.png)

**Button label shall not exceed three words.** Too wordy controls are difficult to read. Try to fit the desired meaning into the short label.

![](static/max-length.png)

The label of the button should clearly indicate what happens after user clicks it.

![](static/define-action.png)

@## Branded buttons

In case when you need to show that button connects or links to some other service, use a branded color for the background or the corresponding color icon of the service.

- You can color the button in a branded color when you need to focus user's attention.
- You can use secondary button with the branded icon inside. This is the safest option in relation to saving the visual hierarchy of the product.

![](static/button-brand.png)

It may also be helpful checking the following branding guidelines:

- Google — [Sign-In Branding Guidelines](https://developers.google.com/identity/branding-guidelines?hl=ru)
- Facebook — [User Experience Design](https://developers.facebook.com/docs/facebook-login/userexperience) and [Brand Overview](https://about.meta.com/brand/resources/facebookapp/guidelines/)
- Instagram — [Brand Overview](https://about.meta.com/brand/resources/instagram/instagram-brand/)
- LinkedIn — [LinkedIn branding policies](https://brand.linkedin.com/policies)
- Twitter — [Brand Guidelines](https://about.twitter.com/en/who-we-are/brand-toolkit)
- Youtube — [Branding Guidelines](https://developers.google.com/youtube/terms/branding-guidelines) and [Brand resources](https://www.youtube.com/howyoutubeworks/resources/brand-resources/#overview)
- Pinterest — [How to use the Pinterest brand in your marketing](https://business.pinterest.com/en-us/brand-guidelines/)

@## Grouped buttons

To combine the components such as Button, [Input](/components/input), and [Select](/components/select), use the [`neighborLocation`](/components/button/button-api/) property.

@page button-a11y
@page button-api
@page button-code
@page button-changelog
