---
title: BottomSheet (mobile only)
fileSource: bottom-sheet
tabName: Design
---

@## Description

BottomSheet is a mobile component containing additional content. It is always attached to the bottom of the screen. Use this component instead of these desktop components: tooltip, dropdown, dropdown-menu and such.

> Use it wisely and make sure that it improves the user experience rather than adding unnecessary complexity.

Use the bottom sheet in the following scenarios:

- A set of quick actions related to the current screen. For example, to allow users to share or save a piece of content without leaving the current screen.
- Any kind of settings, allowing users to easily access and modify preferences.
- A list of filters or sorting options for a list or grid of items.
- To show hints and additional information to the user (text, formatted text with lists, links, buttons and small images).

Do not use the bottom sheet:

- For complex information (data widgets, graphs, tables, etc.)
- To notify a user to take action.
- Instead of sidepanel, notisbabble, confirming modal windows or regular modal windows.

@## Component composition

![](static/composition.png)

@## Paddings and margins

The content area has default padding — 20px *32px.

![](static/paddings.png)

The ResizeHandle has defaul padding — 12px.

![](static/handle_paddings.png)

Recommendation for content margins for variant with text.

![](static/margin_example.png)

@## Scaling and adaptation

On mobile devices, bottom sheets extend across the width of a screen and are elevated above the primary content. Usually it works for all mobile devices and tablets from 824px (e.g. iPad pro) and smaller. Sheet should scale to fit larger screens in one of two ways:

- Setting a maximum width.
- Switching to another component (e.g. side panel).

@## Variations

There are two variants of bottom sheets — fixed and resizable. The user can expand the bottom sheet to take up most of the viewing area by swiping or dragging it up.

**Fixed**

Fixed bottom sheet is not resizable by the user and auto sizes to fit the content.

![](static/fixed_sheet.png)

**Resizable**

Resizable bottom sheets allow the user to drag or swipe up to reveal more. The expanded bottom sheet leaves at least 48px uncovered at the top of the screen to allow for an area to tap to close.

![](static/resizable_sheet.png)

**Interaction**

Bottom sheets can be closed by swiping down on the bottom sheet or by using the Close button inside the component. The component can also be closed by tapping outside the bottom sheet.

@## Usage

We recommend to use button instead of link. The main action should be always the primary button. Other actions could be secondary or tertiary buttons depending on their priority.

>If you use link for a main action, make sure you have expanded the touch target area.

![](static/link_button.png)

Try to avoid placing buttons in more than two rows.

![](static/three_button.png)

The height of the bottom sheet should be matched with the height of the content.

![](static/height_of_content.png)

