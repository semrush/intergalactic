---
title: SERP Features
tabName: Design
---

> 💡 **General recommendations for filters are described in the [Filters, common rules guide](/filter-group/filter-rules/).**

@## Description

**Filter SERP Features** is a filter to sort the data on the page by the SERP Features parameter.

You can select multiple values or `None`, which will show all keywords without SERP Features.

**When working with SERP Features filter, it is important for the user to:**

- quickly understand it can choose one or several SERP Features;
- sort keywords with no SERP Features;
- quickly reset the entered data and search again;
- be able to select all SERP Features.

@## Appearance

### Trigger

- Trigger has styles of [Select](/components/select/) and [FilterTrigger](/components/filter-trigger/).
- **Set the trigger min-width to 120px**. It's not recommended to make the trigger smaller. When there is enough space in the interface, make the width of the trigger dependent on the content, so the text inside the trigger doesn't have to be collapsed into the `ellipsis`.

![filter placeholder](static/placeholder-serp.png)
![active filter](static/active-serp.png)

### Dropdown

- Dropdown has the list of all SERP Features (23 for mobile and 22 for desktop). SERP Features sort order.
- There is a special option - the ability to select keywords without SERP Features (`None`).
- You cannot select both `None` and SERP Features.
- Add a search input in the list. Read more about the search in Filter Search.
- Also, the list should has the Select / Deselect all option, since the list is large.

![opened filter](static/opened-serp.png)
![opened filter](static/deselct-serp.png)

**Don't make a dropdown width less than 224px**, otherwise, long SERP Features names can become unreadable after localization. If the SERP Feature name is too long, collapse into the `ellipsis`, and show its full name in the tooltip while hovering.

@## Interaction

- By default, nothing is selected in the filter.
- If the user has selected a SERP feature, the checkbox becomes active.
- Clicking on `Select all` selects all SERP features, the option changes to `Deselect all`.
- Since there can be many selected SERP features, we will not pin them after closing and reopening the filter.

Other rules for working and interacting with filters are described in the [Filters, common rules guide](/filter-group/filter-rules/).

### States

| State/edge case   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Appearance example                                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Nothing found** | Show the message: `Nothing found`, if nothing was found.                                                                                                                                                                                                                                                                                                                                                                                                                     | ![nothing found](static/nothing-found-serp.png)                                                                                                                                |
| **Select all**    | When selecting all SERP Features, change `Select all` to `Deselect all`. If at least one item is not selected, then the option will be `Select all`.                                                                                                                                                                                                                                                                                                                         | ![filled filter](static/filled-serp.png) ![filled filter](static/deselct-serp.png)                                                                                             |
| **Loading**       | In the case when the content of the filter takes a long time to load, show [Spin](/components/spin/) in the dropdown and the message: `Loading...`. In the case when the selection is long-lasting, use the [SpinContainer](/components/spin-container/) over the dropdown to show the loading process.                                                                                                                                                                      | The filter dropdown is loading. ![loading filter](static/loading-serp.png) The selected options are applied for a long time. ![loading filter](static/spin-container-serp.png) |
| **Error**         | If there was any error while loading data in the filter, show the message: `Something went wrong.`. Let a user reload the filter with the `Reload` control.                                                                                                                                                                                                                                                                                                                  | ![error](static/error-serp.png)                                                                                                                                                |
| **Filled filter** | If the user has applied the filter, show the number of selected SERP Features in the trigger. For more information on abbreviation rules, see [FilterTrigger](/components/filter-trigger/).                                                                                                                                                                                                                                                                                  | ![active serp](static/active-serp.png) ![active serp](static/active-hover-serp.png)                                                                                            |
| **No results**    | If there are no keywords in the table with the selected SERP Features, show the ["empty" state](/components/widget-empty/), as with any other filter. In this case, the search works like a sort. When there are no options, show the title: "No results found" — and the message: "Try selecting a different date or changing your filter settings.". _You can see this case in the situation when the user selected `None`, and all data have SERP Features in the table._ | ![nothing found](static/nothing-found.png)                                                                                                                                     |

@## Abbreviations and tooltips

For more information about tooltips, see the [Filters, common rules guide](/filter-group/filter-rules/).

**If the SERP Features filter name doesn't fit, abbreviate it to `SF`.**

![tooltips](static/tooltips.png)

@## Validation

The validations work is described in the [Filters, common rules guide](/filter-group/filter-rules/).

@page filter-serp-features-code
