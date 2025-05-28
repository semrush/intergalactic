---
title: Web-performance
tabName: Design
---

After adding new features to your product, check whether the loading time fits into the recommendations. Download speed can be checked with [Speedcurve](https://speedcurve.com/) or [tool from Google](https://developers.google.com/speed/pagespeed/insights/).

You can also read about the skeleton and spinner in the guides:

- [Skeleton](/components/skeleton/skeleton) (it also describes loading heavy images)
- [Spin](/components/spin/spin)

Animation of the appearance and disappearance of the skeleton and spinner – `ease-out 0.3`. **The exception is the first spinner that launches the product – it doesn't have animation**, because the `@semcore` components haven't loaded yet.

::: tip
Why is the animation time chosen this way? This is a recommendation that is related to users' perception of time when working with interfaces. Read more about this, for example, in the article from Smashing Magazine – [Why Perceived Performance Matters, Part 1: The Perception Of Time](https://www.smashingmagazine.com/2015/09/why-performance-matters-the-perception-of-time/).
:::

Schemes with a detailed loading process are available in the inner [Figma file](https://www.figma.com/file/eqmm39DfX895qOSM0KnQGb/Web-performance-schemes) and [Miro board](https://miro.com/app/board/o9J_kp1mGGg=/). From Figma, the scheme can be exported to `pdf` or `png` format – [Non-SPA loading scheme](https://www.figma.com/file/eqmm39DfX895qOSM0KnQGb/Web-performance-schemes?node-id=21%3A559) and the [SPA loading scheme](https://www.figma.com/file/eqmm39DfX895qOSM0KnQGb/Web-performance-schemes?node-id=21%3A560). **They are available only for Semrush developers.**
