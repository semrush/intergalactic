---
title: Custom range filter
tabs: Design('filter-custom-range'), Example('filter-custom-range-code')
---

::: tip
Make sure to read [Filter common rules](/filter-group/filter-rules/filter-rules).
:::

## Description

The custom range filter allows entering a custom number range or choosing a value from presets.

**When working with these filters, it's important for the user to:**

- understand that they can enter custom values
- quickly enter the data
- quickly understand that nothing was found
- quickly reset the entered data and search again
- be able to change data

## Appearance

### Trigger

**Set the trigger min-width to 80px**. It's not recommended to make the trigger smaller. When there is enough space in the interface, make the width of the trigger dependent on the content, so the trigger value isn't truncated.

| Filter              | Appearance example                                                      | Description                                                                                                                                                               |
|---------------------|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Click Potential     | ![default](static/placeholder-cp.png) ![active](static/active-cp.png)   | The Click Potential filter trigger always has one size. Don’t abbreviate its name.                                                                                        |
| Competitive Density | ![default](static/placeholder-cd.png) ![active](static/active-cd.png)   |                                                                                                                                                                           |
| CPC                 | ![default](static/placeholder.png) ![active](static/active.png)         | The CPC filter trigger always has one size. Abbreviate its name to CPC (USD).                                                                                             |
| Keyword Difficulty  | ![default](static/placeholder-kd.png) ![active](static/active-kd.png)   | The Keyword Difficulty filter trigger always has one size. Abbreviate the name to **KD %**.                                                                               |
| Positions           | ![default](static/placeholder-pos.png) ![active](static/active-pos.png) | If the filter name and the value fits the width of the trigger, show the name of the filter Positions in full. If they don’t fit, abbreviate the filter name to **Pos.**. |
| Volume              | ![default](static/placeholder-vol.png) ![active](static/active-vol.png) | If the filter name and the value fits the width of the trigger, show the name of the filter Volume in full. If they don’t fit, abbreviate the filter name to **Vol.**.    |

### Dropdown

**Don't make the dropdown width less than 224px**, otherwise the maximum possible values won't fit into the inputs.

| Filter              | Appearance example                                                        |
|---------------------|---------------------------------------------------------------------------|
| Click Potential     | ![opened cp](static/opened-cp.png) ![filled cp](static/filled-cp.png)     |
| Competitive Density | ![opened cd](static/opened-cd.png) ![filled cd](static/filled-cd.png)     |
| CPC                 | ![opened cpc](static/opened.png) ![filled cpc](static/filled.png)         |
| Keyword Difficulty  | ![opened kd](static/opened-kd.png) ![filled kd](static/filled-kd.png)     |
| Positions           | ![opened pos](static/opened-pos.png) ![filled pos](static/filled-pos.png) |
| Volume              | ![opened vol](static/opened-vol.png) ![filled vol](static/filled-vol.png) |

### Preset values

::: tip
Use an en dash, not a hyphen, between values – `Opt/Alt` + `-`.
:::

| Filter             | Keyword Difficulty                 | Positions                            | Volume                               |
|--------------------|------------------------------------|--------------------------------------|--------------------------------------|
| Appearance example | ![opened kd](static/opened-kd.png) | ![opened pos](static/opened-pos.png) | ![opened vol](static/opened-vol.png) |

## Interaction

These filters use the [InputRange](/components/input-number/input-number#inputrange) pattern.

When user opens the dropdown, keyboard focus immediately goes to the first input.

Filter interaction is described in detail in the [Filter common rules](/filter-group/filter-rules/filter-rules).

## Tooltips

For more information about tooltips, refer to the [Filter common rules](/filter-group/filter-rules/filter-rules).

## Validation

Validation is described in the [Filter common rules](/filter-group/filter-rules/filter-rules).

## Nothing found

"Empty" states is described in the [Filter common rules](/filter-group/filter-rules/filter-rules).
