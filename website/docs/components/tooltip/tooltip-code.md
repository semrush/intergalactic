---
title: Code
---

> ⚠️ If you need to customize work with the tooltip dropdown window, see the documentation [@semcore/popper](/utils/popper/)

The component is a wrap over [@semcore/popper](/utils/popper) with the following additions:

- Stylization and themes for a dropdown window
- Displaying the check mark of a dropdown window

@## Basic use

As mentioned above, tooltip is just a stylized wrap over the [@semcore/popper](/utils/popper). It works exactly the same way.

@example tooltip

@## Title

For your convenience, the component has property `title`, to which you can pass content for a dropdown window. This will allow you to reduce the volume of the code 🧐

The code below fully repeats the functionality of the previous example.

@example tooltip-title

@## Singleton

Use a single tooltip for many different reference elements. This allows you to "group" tooltips with a shared timer
to improve UX.

@example tooltip-singleton
