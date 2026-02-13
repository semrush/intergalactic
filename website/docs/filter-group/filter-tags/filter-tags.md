---
title: Tags filter
tabName: Design
tabs: Design('filter-tags'), Example('filter-tags-code')
---

::: tip
**General recommendations for filters are described in the [Filter common rules guide](/filter-group/filter-rules/filter-rules).**
:::

## Description

**Filter Tags** is a filter to sort the data on the page by the tags.

- You can select multiple values or "None", which will show all keywords without tags.
- All tags are pulled from the table data and attached to it. So the filter shows data user can work with in the context of the table.
- The filter works with the "or" logic.

**When working with Tags filter, it is important for the user to:**

- quickly understand it can choose one or several tags;
- sort keywords with no tags;
- quickly reset the entered data and search again;
- be able to select all tags.

## Appearance

### Trigger

- For trigger use [Select](/components/select/select) and [FilterTrigger](/components/filter-trigger/filter-trigger) components.
- **Set the trigger min-width to 80px**. It's not recommended to make the trigger smaller. When there is enough space in the interface, make the width of the trigger dependent on the content, so the label inside the trigger doesn't have to be collapsed into the `ellipsis`.

![filter placeholder](static/placeholder-tags.png)
![active filter](static/active-tags.png)

### Dropdown

- Dropdown has the list of all tags from the table data.
- There is a special option - the ability to select keywords without tags ("None").
- Sort a list of tags in alphabetical order.
- You cannot select both "None" and tags.

![small tags](static/small-tags.png)

- Show scroll if the list has more than 6 tags.
- Add search input if the list has more than 10 tags. See the [Filter Search](/filter-group/filter-search/filter-search) guide to know more.
- Add **Select/Deselect all** option if the list has more than 10 tags.

![opened filter](static/opened-tags.png)
![filled filter](static/filled-tags.png)

**Don't make a dropdown width less than 224px**,so if there are long names for tags, most of them will be readable. If the name of the tag is too long, collapse it into `ellipsis`, and show its full name in the tooltip while hovering.

![long tags](static/long-tags.png)

## Interaction

- By default, nothing is selected in the filter.
- If user has selected a tag, checkbox gets `active` state.
- Clicking on **Select all** selects all SERP features. After that the option changes to **Deselect all**.
- Since there can be many selected tags, don’t pin them after closing and reopening the dropdown.

Other rules for working and interacting with filters are described in the [Filter common rules guide](/filter-group/filter-rules/filter-rules).

### States

| State/edge case   | Description                                                                                                                                           | Appearance example                                                                                                                                                                                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Empty state**   | ![empty](static/empty-tags.png)                                                                                                                       | If there are no tags in the filter, show the message in the dropdown: "No tags here yet".                                                                                                                                                                                                            |
| **Nothing found** | ![nothing found](static/nothing-found-tags.png)                                                                                                       | Show the message: "Nothing found", if nothing was found.                                                                                                                                                                                                                                             |
| **Select all**    | ![filled filter](static/filled-tags.png) ![filled filter](static/deselct-tags.png)                                                                    | When selecting all tags, change **Select all** to **Deselect all**. If at least one item isn’t selected, then the option will be **Select all**.                                                                                                                                                    |
| **Loading**       | The list is loading. ![loading filter](static/loading-tags.png) The applying of the selected options need time. ![loading filter](static/loading.png) | In the case when the content of the filter takes a long time to load, show [Spin](/components/spin/spin) in the dropdown and add the message: "Loading...". In the case when the selection is long-lasting, wrap the list into [SpinContainer](/components/spin-container/spin-container) to show the loading process. |
| **Error**         | ![error](static/error-tags.png)                                                                                                                       | If there was any error while loading data in the filter, show the message: "Something went wrong.". Let a user reload the filter with the "Reload" control.                                                                                                                                          |
| **Filled filter** | ![active serp](static/active-tags.png)                                                                                                                | If the user has applied the filter, show the number of selected tags in the trigger. For more information on abbreviation rules, see [FilterTrigger](/components/filter-trigger/filter-trigger).                                                                                                                   |
| **No results**    | ![nothing found](static/nothing-found-tags.png)                                                                                                       | If there are no keywords with the selected tags, show the ["empty" state](/components/widget-empty/widget-empty), as with any other filter. When there are no options, show the title: "No results found" – and the message: "Try selecting a different date or changing your filter settings.".                 |

## Abbreviations and tooltips

For more information about tooltips, see the [Filter common rules guide](/filter-group/filter-rules/filter-rules).

Don't abbreviate the name of this filter, it is always `Tags`.

![tooltips](static/tooltip.png)

## Validation

Validations is described in the [Filter common rules guide](/filter-group/filter-rules/filter-rules).
