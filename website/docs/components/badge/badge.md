---
title: Badge
fileSource: badge
tabs: Design('badge'), A11y('badge-a11y'), API('badge-api'), Examples('badge-code'), Changelog('badge-changelog')
---

<Playground for="Badge" />

## Description

**Badge** is a visual component used to indicate the status of a feature or a product.

_For example, you've added a new tab to the report. In this case, you can highlight the new feature in your product with the `new` badge._

**Main features of the component:**

- Badge can't be deleted or added by a user. Badge is added to elements by the system according to the rules described in [Types](#types).
- Badge isn’t clickable.
- Don’t use badge for filtering data.

## Appearance

Component has one size and three themes.

Table: Badge themes

| Theme     | Usage   | Example |
|-----------|---------| ------- |
| `default` | Use it with secondary controls, or when you need to add accent to the status.| ![badge example](static/buttons-default.png){width=240}  |
| `light` | Use it on the light surfaces only.   | ![badge example](static/badge-light.png){width=240} |
| `invert` | Use it on the dark and colored surfaces only, when you need to remove accent to the status.    | ![badge example](static/buttons-light.png){width=240}  |

### Types

Use the following badges in the products depending on the status of the feature or product:

Table: Badge types

| Type                       | Usage                                                                                                                                                                                                                                                                                    |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![admin](static/admin.png){width=200} | Use it with features that are only available for users with admin rights. The functionality with `admin` badge isn’t visible to the other users.                                                                                                                                         |
| ![alpha](static/alpha.png){width=200}  | Use it with features which are available only to admins and a limited number of users who have been granted access as `alpha` users. The functionality under this badge should be used without any guarantees, it's unstable, and may be changed significantly over time or be disabled. |
| ![beta](static/beta.png){width=200}    | Use only for unstable functionality of a feature or product. A product/feature with this badge was released to test the product hypothesis, and it can have major changes in the future.                                                                                                 |
| ![new](static/new.png){width=200}      | Use with products and features that are out of beta, and with new features that are available to all users. Use it to attract attention to a new product or feature.                                                                                                                     |
| ![soon](static/soon.png){width=200}    | Place on products and features that aren't yet available and are displayed for collecting feedback.                                                                                                                                                                              |
| ![unavailable](static/unavailable.png){width=200}  | Use for products and features that are unavailable due to legal or other restrictions.|

### Usage on dark/colored background

Any badge can be inverted like this:

![](static/inverted.png)

## Feature status

The feature status can be shown inside most of the components and controls.

### Button

![badge example](static/buttons-default.png)

### Pills

![](static/pills.png)

### Badge vs. Tag

Don’t confuse [Tag](/components/tag/tag) and Badge components. Tag is used for thematic grouping and labeling data, while the Badge indicates the status of a feature or product.

![](static/table-yes-no.png)

## Placement

Badge is usually placed to the right of the element.

![](static/widget.png)
