---
title: Content in modal window
---

> Description of the component for modal windows can be found in the [Modal](/components/modal/).

Here we have compiled recommendations for content styles in modal windows.

@## Margins

**Margin between the title and the content:**

- 16px to a text (`--spacing-4x` token);
- 24px to controls and inputs (`--spacing-6x` token).

![](static/margins-heading.png)

![](static/big-margins-heading.png)

**For confirm modals use small margin of 8px.**

![](static/margins-heading-confirm.png)

**Margin between the content and CTA buttons — 24px.**

![](static/big-margins.png)

**For confirm modals margin between the content and CTA buttons — 16px.**

![](static/margins.png)

@## Title and text

- For title in confirm windows use text with 20px size (`--fs-400`, `--lh-400`). For title in all other window types use text with 24px size (`--fs-500`, `--lh-500`).
- For blocks of text use 16px size (`--fs-300`, `-lh-300` tokens). Avoid using font-size less than 16px for blocks of text that user needs to read. Use 14px font-size carefully, and always check it's readability and contrast against background.

![](static/s-confirm.png)

![](static/m-settings.png)

@## Buttons

Modal window must have a CTA or main button. The "Cancel" button and "Close" icon are optional, but recommended.

We also recommend you to use controls with L size in modal windows.

@## Notice

The notice should be located next to the place that triggers the alert.

For example, if the user tried to submit a project title and failed, the notice should be placed next to the buttons.

![](static/m-notice.png)

@## Dual-zone modal window

For the dual-zone modal window use:

```css
background-color: var(--bg-secondary-neutral);
```

![](static/m-modal.png)

@## Fixed header and footer

While scrolling the modal's content area fixed areas gets shadows from the top and bottom sides.

Make paddings inside the fixed area not too big (for example, 8px).

![](static/fixed.png)

![](static/fixed-margins.png)

@## Loading

While loading or reloading the content inside the modal window, show [Spin](/components/spin/) over the content.

- Use Spin with the largest size — XXL.
- The spinner is necessarily centered regarding the hidden content.
- The message for this state is optional.

![](static/spinner.png)

@## Content alignment

In most cases, we make the content, titles, and controls of modal windows left aligned.

**However, there may be exceptions,** when according to the composition, both the header and controls are should be aligned to the center of the modal window.

**Align the content to the left when:**

- content has lists, large texts (they are left aligned for readability);
- form has inputs of different lengths;
- modal window is divided into several logical parts (wizards, dual-zone windows with previews and a separate filter section);
- content has different types of content: form, lists, tables, etc.;
- content has fixed controls.

![](static/m-settings.png)

**Align the content to the center when:**

- modal window displays a success notification that contains an illustration;
- modal window displays a notification with a single main button or buttons that scroll through the content.

![](static/m-news.png)
