---
title: Filter Search
tabs: Design('filter-search'), Example('filter-search-code')
---

## Description

**Filter search** is an [Input](/components/input/input) we use in filters to search in a table or other kind of data. It can apply entered data dynamically and by clicking on the submit button.

**When working with Filter Search, it's important for the user:**

- filter search is easy to find, as there can be many filters in the product
- quickly understand what exactly user is looking for
- quickly understand that nothing was found
- quickly delete entered data and do another search

## Appearance

This filter inherits all [Input](/components/input/input) styles and properties.

| Inactive filter                                | Active filter                               |
| ---------------------------------------------- | ------------------------------------------- |
| ![](static/filters-default.png) | ![](static/filters-active.png) |

## Interaction

The filter searches for partial matches, not only full words.

![](static/search-results.png)

## Dynamic search

Dynamic search applies entered value as soon as at least one character is entered into the input.

**Suitable for filtering data where the number of queries isn't limited, and there is little data**.

::: tip
Set a delay for sending the entered value. So you'll not burden the search engine and it will show the results more smoothly and predictably.
:::

| State       | Appearance example                                 | Description                                                                                                                                                                                                                                        |
| ----------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Placeholder | ![](static/placeholder.png) | Default filter state. Input should always have a placeholder that reflects the purpose of the filter. If it searches only for one parameter, then write: "Filter by {parameter}". **If it searches for many parameters, then write just "Search"**. |
| Focus       | ![](static/focus.png)             | The placeholder remains until at least one character is entered.                                                                                                                                                                                   |
| Filled      | ![](static/filled.png)           | When filling in the input, the filter is triggered for each character. Be sure to display the **Clear** button to reset the entered value.                                                                                                               |

::: tip Why not “Search”

This search filter works exactly like a filter. To make it obvious by what parameter it searches, indicate it in the placeholder. Leave "Search" only for simple search inputs, or when there is an additional functionality for choosing by which parameter to search.
:::

## Search by button

Slow but accurate user assistant, searches by button or by clicking "Enter".

**Suitable for filters when:**

- filters are limited;
- there is a lot of data and each filter application is a long and expensive query.

Use [NeighborLocation](/utils/neighbor-location/neighbor-location) to "glue" multiple controls.

| State       | Appearance example                                        | Description                                                                                                                                                                                                                                        |
| ----------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Placeholder | ![](static/placeholder-button.png) | Default filter state. Input should always have a placeholder that reflects the purpose of the filter. If it searches only for one parameter, then write: "Filter by {parameter}'. **If it searches for many parameters, then write just "Search"**. |
| Focus       | ![](static/focus-button.png)             | The placeholder remains until at least one character is entered.                                                                                                                                                                                   |
| Filled      | ![](static/filled-button.png)           | When filling in the input, the filter is triggered for each character. Be sure to display the **Clear** button to reset the entered value.                                                                                                               |

## Search tuning

For the case when fine-tuning of the filter is needed, add select next to the input. You can also use a combo – input with both select and button.

| State       | Appearance example                                        | Description                                                                                                                                                                                                                                      |
| ----------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Placeholder | ![](static/placeholder-select.png) | Default filter state. Input should always have a placeholder that reflects the essence of the filter. If you search only for one parameter, then write: "Filter by {parameter}". **If you search for many parameters, then write just "Search"**. |
| Focus       | ![](static/focus-select.png)             | The placeholder remains until at least one character is entered.                                                                                                                                                                                 |
| Filled      | ![](static/filled-select.png)           | When filling in the input, the filter is triggered for each character. Be sure to display the **Clear** button to reset the entered value.                                                                                                             |

## Text label

Labels are often not added to filters because there isn't enough space. Instead, a placeholder or other visual elements are used. However, placeholders alone aren't enough because they disappear once text is entered. Labels must be visually persistent. In some cases, a magnifying glass icon can be used as a persistent label for a search field.

## Input width

The width depends on the data that's being used as a search query. For long strings, such as URLs, it's better to make the input wider. If input searches keywords, **don't make it less than 160px**.

For a dynamic input, you can set a minimum width, since in most cases it's enough to enter a couple of characters to filter and find what you need.

Always add minimum width of 160px for the search input, otherwise something like this might happen:

![](static/filter-search-yes-no.png)

## Results highlighting

This is an optional functionality. It helps the user to find on the page what they were looking for.

Use the `--intergalactic-bg-highlight-results` color for highlighting. The height of the highlighted area must match the line-height of the line.

![](static/highlighting.png)

## Nothing found

If nothing is found, display a button to reset the filter. This will help the user to understand why no data is displayed, and how to fix the situation.

You can change the description if necessary.

Refer to [Widget empty state](../../components/widget-empty/widget-empty.md) for more details.

| State                         | Appearance example            |
| ----------------------------- | ----------------------------- |
| No data at all                | ![](static/empty-no-data.png) |
| No data due to applied filter | ![](static/empty-filter.png)  |

