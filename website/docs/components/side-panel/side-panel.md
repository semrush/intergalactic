---
title: SidePanel
fileSource: side-panel
tabName: Design
---

> In the [2.0.0 version](/components/side-panel/side-panel-changelog/), component was divided into three parts: `Header`,`Body` and `Footer`. This was done to make it easier to use the restyling component. Also, got an optional `Back` button.

@## Description

**SidePanel** is a component for displaying the sliding panel with content. It's also can be called just panel or drawer.

Use SidePanel when it is needed:

- to show sub-tasks, additional support information and links that may be useful to the user when working with a report, a specific widget or the whole product;
- to keep the user in the context of the page (even if SidePanel has an overlay).

> Use [Modal windows](/components/modal/) to show important information or request a response from the user.

**For example, you can use SidePanel as:**

- Notification center for the whole website;
- Help Center or News panel in products;
- "panels" on mobile devices.

@## Triggers

- News icon in the main header of the website.
- Additional link in ProductHead.

![trigger example](static/trigger.png)

- Controls inside the report that hide additional information.
- Charts inside the report, which can be clicked to show additional information.
- On small screens other controls can serve as a trigger to open SidePanel.

@## Component composition

- Container.
- Content.
- Close icon (optional).
- Overlay (optional).

![sidepanel scheme](static/sidepanel-scheme.png)

@## Overlay

|                 | Appearance example                     | Styles                                                                                                         | When to use                                                                             |
| --------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Without overlay | ![light-theme](static/light-theme.png) | In this case the panel has the shadow: `box-shadow: 0px 1px 12px var(--gray-800, 0.15);`. There is no overlay. | Use this version if you need to show additional information for a report/product/block. |
| With overlay    | ![dark-theme](static/dark-theme.png)   | In this case panel has an overlay with styles: `var(--gray-800, 0.7);`. There is no shadow.                    | If you need to focus the user on information inside SidePanel, enable overlay.          |

@## Default sizes and indents

### Width

SidePanel has a fixed width that does not change when the browser window is resized. **Default width of the panel is 256px.** You can change it if necessary.

### Container

**The component has a default padding.** It can be changed if necessary.

_It can be changed, for example, when using SidePanel on a small screen where you want to reduce paddings._

![paddings](static/container-paddings.png)

### Content margins

The padding between title and content:

![content paddings ](static/content-paddings.png)

@## Common styles and recommendations

### Header

For panel's title use 16px text (`--fs-300; --lh-300`) with `font-weight: 700;`.

> Pin header when scrolling large content inside the SidePanel.

| Appearance example                    | Styles                                                                                              |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![header paddings](static/header.png) | `height: 52px; padding-bottom: 4px; align-items: center; border-bottom: 1px solid var(–-gray-200);` |
| ![close icon](static/closeIcon.png)   | Close icon has L size and `--gray-300` color. Click zone of the icon is `48px * 48px`.              |

### Content

General recommendations for SidePanel content styles:

- Choose the text size for the panel in order to maintain a hierarchy of headers in the content within SidePanel. If necessary, you can experiment and use your text size hierarchy within our [typogarphic scale](/style/typography/).

![headings](static/hierarchy.png)

- Always pin the header and the footer, when scrolling the content of the SidePanel.

![scroll](static/scroll.png)

### Footer

You can place common controls for SidePanel content in the footer.

- Typically, any controls, CTA or other elements like [ProgressBar](/components/progress-bar) can be placed there.
- The recommended size of controls in the panel on the desktop is M. Depending on the context, use M or L controls in the panel on small screens.

Footer styles:

```css
height: 44px;
padding: 8px 0;
align-items: center;
border-top: 1px solid var(–-gray-200);
```

![footer-height](static/footer.png)

![footer-paddings](static/footer-paddings.png)

@## Interaction

### Placement in the interface

- You can customize whether the SidePanel should open in the product area or over the entire website (as modal windows do). If the SidePanel refers to a specific product, it should be rendered in the product under the main header.
- The focus remains inside the SidePanel and does not move to the page content. You can navigate through the controls inside the SidePanel using `Tab`.

### Page scroll

You can enable or disable page scroll. It's disabled by default.

Page scrolling should be enabled when SidePanel has some tips and additional things for the page.

> It is important to disable page scroll for SidePanel with overlay, otherwise it will look like a bug.

### SidePanel opening and closing

You can close the panel with:

- CTA control;
- Close icon;
- Clicking outside the area of the panel (at overlay), optional;
- `Esc` key.

SidePanel can be opened either by user clicking on the corresponding trigger or by the system in special cases to draw attention to the information in the panel.

### Animation of appearance and hiding

SidePanel opens and closes with the animation: `transition: all 350ms ease-in-out;`.

### What happens when the browser window size changes

- SidePanel has a fixed width that does not change when the browser window is resized. Default width of the panel is 256px. You can change it if necessary.
- On a 320px screen, SidePanel should not occupy more than 80% of the screen width so that the user can click outside of it and close it.

![small screen example](static/320-width.png)

@## Corner states

SidePanel should have header in all cases.

### Initial load

At the initial load of the SidePanel content, show the content structure with [Skeleton](/components/skeleton/).

![skeleton example](static/skeleton.png)

### Reloading

When loading and reloading SidePanel content, show [Spin](/components/spin/) with XL size in the center.

![spin example](static/spin.png)

### Error

If an error occurs during data loading, show the the corresponding message and the "Try again" button to reload the SidePanel content.

![error example](static/error.png)

@page side-panel-a11y
@page side-panel-api
@page side-panel-code
@page side-panel-changelog
