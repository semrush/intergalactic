---
title: RadioCards
fileSource: radio-cards
tabs: Design('radio-cards'), A11y('radio-cards-a11y'), API('radio-cards-api'), Examples('radio-cards-code'), Changelog('radio-cards-changelog')
---

<Playground for="RadioCards" />

## Description

**RadioCards** is a component designed for:

- switching between predefined sets of filter values in reports
- switching between different reports and report views

## Component composition

![](static/radio-cards-composition.png){style="float: right; max-width: 65%"}

1. RadioCards
1. RadioCards.Item
2. `text`
3. `textAddon` (optional)
4. `iconAddon` (optional)
5. `description` (optional)

## Appearance

RadioCards have two options of addon size and position:

1. A small icon before the title — to highlight one item.
![small addon](static/small-addon.png)
2. A larger icon, illustration, or mini chart addon in the left part of the item — to illustrate and distinguish the items ([live example](./radio-cards-code#custom-layout-with-large-addon)).
![large addon](static/large-addons.png)

## Interaction

RadioCards behave like [Radio](../radio/radio): user can select only one at a time.

It's not mandatory for one item to be selected by default on page load. You can select one or leave all items unselected, depending on your case.

### States

Table: RadioCards item states

| State           | Illustration                                 | Note                                                                                                                          |
| --------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Normal          | ![normal](static/state-normal.png)           |                                                                                                                               |
| Hover           | ![hover](static/state-hover.png)             |                                                                                                                               |
| Selected        | ![selected](static/state-selected.png)       |                                                                                                                               |
| Initial loading | ![initial loading](static/state-loading.png) | <div style="max-width: 200px">Use this state only if there's asynchronously loaded data in the item, such as a counter.</div> |
| Disabled        | ![disabled](static/state-disabled.png)       |                                                                                                                               |


## Use in UX/UI

If your RadioCards have 4 or more items, stretch them to the full page width.

![](static/stretch.png)

If your RadioCards have 3 or less items, set a fixed width limit for the whole group. This makes it easier for the user to compare and interact with the items.

![](static/limit-3.png)
