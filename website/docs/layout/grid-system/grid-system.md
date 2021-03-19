---
title: Grid system
fileSource: grid
tabName: Guide
---

@## Description

- The layout of the page depends on the breakpoint.
- Each range determines the number of columns, maximum content width, main container margins and text sizes.
- **You can set your own breakpoints, if it's necessary for the correct display of the interface in a particular case. _For example, add a breakpoint for screens ≦414px in the <768px range._**

> 💡 After 991px, the left menu appears and, with its width of 250px, "eats away" space from the product page 🙃

| Breakpoint            | Columns | Gutter | Max. container width                                          | Content wrapper margins | Layout scheme                                             | Description                                                                                                               |
| --------------------- | ------- | ------ | ------------------------------------------------------------- | ----------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **<768px** (0-767)    | 4       | 24px   | 500px                                                         | `margin: 80px 20px;`    | ![414 breakpoint](static/breakpoints-414.png)             | **Mobile & tablet devices**. The content has a one-column structure. The left menu is hidden.                             |
| **≥768px** (768-1153) | 6       | 24px   | 704px                                                         | `margin: 120px 32px;`   | ![768 breakpoint](static/breakpoints-768.png)             | **Mobile & tablet devices**. You can arrange the content as a two-column structure. The left menu is hidden.              |
|                       |         |        |                                                               |                         | ![768 breakpoint](static/breakpoints-768-landscape.png)   | **Mobile & tablet devices (landscape mode)**. The content is arranged as a two-column structure. The left menu is hidden. |
| **≥1154px** (1154-∞)  | 12      | 24px   | 840px for product landing pages. **956px for product pages.** | `margin; 0 auto;`       | ![1154px breakpoint](static/breakpoints-1154.png)         | **Tablet & desktop devices**. The left menu is open. You can rearrange the content as a three-column structure.           |
|                       |         |        |                                                               |                         | ![1154 breakpoint](static/breakpoints-1154-landscape.png) | **Tablet (landscape mode)**. The left menu is open. You can rearrange the content as a three-column structure.            |

@## Product pages width

The grid system is based on the left menu width (250px) and the maximum content width of our product pages.

> The maximum width of the content area on the product landing pages is 840px. If your product visually differs from the core Semrush products, then, of course, your maximum width may differ.

@page grid-api
@page grid-code
@page grid-changelog
