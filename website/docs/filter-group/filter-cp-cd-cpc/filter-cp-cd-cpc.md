---
title: Click Potential, Competitive Density, CPC
tabName: Design
---

> 💡 **General recommendations for filters are described in the [Filters, common rules guide](/filter-group/filter-rules/).**
>
> **These filters are combined in one guide, since they differ only in the sorting parameter and the name.**
>
> The principle of work and states are the same.

@## Description

**Filter Click Potential** is a filter to sort the data on the page by the Click Potential parameter.

**Filter Competitive Density** is a filter to sort the data on the page by the Competitive Density parameter.

**Filter CPC** is a filter to sort the data on the page by the CPC parameter.

They contain only a field for a custom range value, there is no preset data, since click potetntial, competitive density and cost per click are very individual parameters for each instrument.

**When working with these filters, it is important for the user to:**

- quickly enter the data it needs;
- quickly understand that nothing was found;
- quickly reset the entered data and search again;
- be able to change data.

@## Appearance

### Trigger

**Set the trigger min-width to 80px**. It's not recommended to make the trigger smaller. When there is enough space in the interface, make the width of the trigger dependent on the content, so the text inside the trigger doesn't have to be collapsed into the `ellipsis`.

| Filter              | Description                                                                         | Appearance example                                                    |
| ------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Click Potential     | The Click Potential filter trigger always has one size. Do not abbreviate its name. | ![default](static/placeholder-cp.png) ![active](static/active-cp.png) |
| Competitive Density |                                                                                     | ![default](static/placeholder-cd.png) ![active](static/active-cd.png) |
| CPC                 | The CPC filter trigger always has one size. Abbreviate the name to CPC (USD).       | ![default](static/placeholder.png) ![active](static/active.png)       |

### Dropdown

**Don't make a dropdown width less than 224px**, otherwise the maximum possible values will not fit into the Custom range inputs.

| Filter              | Appearance example                                                    |
| ------------------- | --------------------------------------------------------------------- |
| Click Potential     | ![opened cp](static/opened-cp.png) ![filled cp](static/filled-cp.png) |
| Competitive Density | ![opened cd](static/opened-cd.png) ![filled cd](static/filled-cd.png) |
| CPC                 | ![opened cpc](static/opened.png) ![filled cpc](static/filled.png)     |

@## Custom range

- If the filter has the ability to select a custom period, then use [InputNumber](/components/input-number/) for this.
- Stepper buttons appear when you hover over an input.

The behavior and appearance of the stepper buttons is described in the [Filters, common rules](/filter-group/filter-rules/) guide.

@## Interaction

When you open a dropdown, the focus immediately goes to the first Custom range field.

Working and interacting with the filter are described in detail in the [Filters, common rules](/filter-group/filter-rules/) guide.

@## Tooltips

For more information about tooltips, see [Filters, common rules](/filter-group/filter-rules/) guide.

| Filter              | Appearance example                     |
| ------------------- | -------------------------------------- |
| Click Potential     | ![tooltips cp](static/tooltips-cp.png) |
| Competitive Density | ![tooltips cd](static/tooltips-cd.png) |
| CPC                 | ![tooltips cpc](static/tooltips.png)   |

@## Validation

The validations work is described in the [Filters, common rules](/filter-group/filter-rules/) guide.

@## Nothing found

The "empty" state is described in the [Filters, common rules](/filter-group/filter-rules/) guide.

@page filter-cp-cd-cpc-code
