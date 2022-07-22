---
title: Loading states
---

@## Description

Components that we use to work with user expectations:

- [Spin](/components/spin/)
- [Skeleton](/components/skeleton/)
- [ProgressBar](/components/progress-bar/)

**Use them for different cases.** For a detailed description of each component, see its guide.

> 💡 The container that contains the loading message should have margins, so in edge cases (e.g., when the user changes the size of the viewport), the container does not "stick" to other elements on the page. The margins depend on the component where the loading message is used. They are usually multiple of 4 (e.g., for spinner we recommend to use `margin: 40px;`).

@## Response from the system

### Lazy loading

If you know how much it takes to load a page, then load the page using the “Lazy loading" principle.

_For example, you know that landing page loads quickly. For this reason on such pages, you can load elements in turn, without showing either the spinner or the skeleton. First, important functionality appears (input and a submit button, for example), then illustrations and marketing text._

### Page loading

In all other cases, show [Skeleton](/components/skeleton) when loading the page.

All products should have a delay of `0.6ms` before the skeleton appears. This is to prevent flickering when switching from product to product.

### Spin as the interface's response to interaction

[Spin](/components/spin) is only used when the user interacts with a clickable interface element on the page.

@## Usage rules

### Skeleton

**Use it for:**

- initial data loading;
- showing the structure of the loading page and data;
- uploading new data.

![skeleton example](static/skeleton.png)

### Spin

**Use it while:**

- filtering a large amount of data in a widget/table/page;
- sorting a large amount of data in a widget/table/page;
- searching the data.

> 💡 If the download is fast, you can do without this state.

![spin example](static/spin.png)

### ProgressBar

Use it for cases when data collection takes a long time (more than 5 seconds). In different widgets this may take different time. _For example, in the table, if data collection takes more than 1 minute._

![progress-bar example](static/progressbar.png)
