---
title: Example
fileSource: input
---

@## Password input

Button with the `ShowYes` icon enables the password display. `ShowNo` hides the password and shows bullets, respectively.

@example password

@## Loading state in the input

If the input is in a loading state while searching, sending, or entering data dynamically, add a [spin](/components/spin) to the right addon. The [spin](/components/spin) takes the place of the icon that is normally in the addon slot. During this time, the input may also be `disabled`.

@example loading

@## Input with the clearing ability

The input field may have a clickable `Close` icon inside it to clear the entered value. This icon is only visible when there is some typed text or values in the input field, regardless of its status.

@example clear

@## Input with a submit icon

In the focused state, a clickable send/confirm icon can be placed inside the input alongside the typed text. It is only visible when the input is `focused`.

> Please note that this is an outdated pattern. Now we use it only in the input inside the [pagination](/components/pagination/).

@example submit

@## Input with a text addon

You can add text to the input as an addon that the user cannot modify. This can be useful when you need a fixed placeholder text in the input.

@example placeholder

@## Input with multiple addons

When stacking two addons, the indents of the adjacent addons should be divided in half. This ensures that there is enough space around them for normal interaction.

@example 2addon

@## Input with other component inside

You can also place a [Badge](/components/badge/) or a [Tag](/components/tag/) inside the input field. All input sizes have the same size for badges.

@example custom-addon
