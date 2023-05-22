---
title: Example
fileSource: input
---

@## Input for entering a password

The icon on the right shows/hides the password. Button with the `ShowYes` icon enables the password display. `ShowNo` hides the password and shows bullets, respectively.

@example password

@## Loading state in the input

If the input has a loading state when dynamically searching/sending/entering data, then we add a spinner in the right addon. The spinner can replace the icon that occupies the addon slot. In this case, the input may get the `disabled` state.

@example loading

@## Input with the clearing ability

Inside the input with the typed text, there can be a clickable `Close` icon to clear the entered value. The icon is only visible in the input field with some typed text/values, regardless of its status.

@example clear

@## Input with a submit icon

A clickable send/confirm icon can be placed inside the input with the typed text. It is only visible in the `focused` state.

> Please note that this is an outdated pattern. Now we use it only in the input inside the [pagination](/components/pagination/).

@example submit

@## Input with a text addon

You can add text to the input as an addon. The user will not be able to change it. It can be used when you need a "permanent" placeholder text in the input.

@example placeholder

@## Input with multiple addons

If you need to stack two addons, the indents of neighboring addons shall be divided in half to maintain the normal target area around them.

@example 2addon

@## Input with other component inside

[Badge](/components/badge/) and [Tag](/components/tag/) can also be put in the input. All input sizes use the same size of badges.

@example custom-addon
