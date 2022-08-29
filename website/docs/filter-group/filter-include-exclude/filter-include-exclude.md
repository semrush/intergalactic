---
title: Include/Exclude keywords
tabName: Design
---

> **General recommendations for filters are described in the [Filter common rules guide](/filter-group/filter-rules/).**

@## Description

**Include/Exclude keywords filter** is a filter for sorting by a large amount of keywords.

**When to use it:**

- User need the ability to add a large list of keywords. And users frequently copy/paste and edit this data in the process.
- The logic “AND” + “Or” is needed in the work with the entered data.
- If users need syntax while working with keywords.

**When working with filters, it is important for the user to:**

- be able to copy/paste large amounts of data;
  - see the copied data is formatted by the filter in the correct view/format;
  - quickly reset the entered data and search again;
- be able to change data.

@## Appearance

### Trigger

- For trigger use [Select](/components/select/) and [FilterTrigger](/components/filter-trigger/) components.
- **Set the trigger min-width to 140px**. It's not recommended to make the trigger smaller. When there is enough space in the interface, make the width of the trigger dependent on the content, so the label inside the trigger doesn't have to be collapsed into the `ellipsis`.

![filter placeholder](static/placeholder-include.png)
![filter placeholder](static/placeholder-exclude.png)
![active filter](static/active-include-exclude.png)

### Dropdown

- The Include filter, unlike Exclude, contains radio buttons for selecting the search logic — "AND"/"Or". They help looking for keywords containing all entered words or any of the entered ones ("All keywords" and "Any keywords").
- Textarea has 7 lines by default.
- When opening a dropdown texarea immediately gets the focus.
- The filter has the "Broad / Exact match" syntax and hints about its work above the field and in the placeholder. If the user enters a keyword without parentheses, then show keywords containing this word. If the user enters a keyword in square brackets, then show only the exact value.

**Don't make a dropdown width less than 224px**, so if there are long keywords in the list, most of them will be readable.

![opened filter](static/opened-include.png)

![opened filter](static/opened-exclude.png)

@## Interaction

> All common rules for working and interacting with filters are described in the [Filter common rules guide](/filter-group/filter-rules/).

When opening a dropdown texarea immediately gets the focus.

### User have entered keywords

- If the number of entered keywords in the field is more than 7, show the scroll in the field.
- Clicking "Apply" applies the filter with the entered data, and shows the number of applied keywords.
- Clicking "Clear all" clears the field. The next click on "Apply" applies the cleaned filters.
- Wrapping of words in the input applies by clicking the "Enter", using a comma or semicolon.
- If the user have entered something, but did not apply, save the entered data until the page is refreshed.

### Additional cases

- If user pressed the square bracket at the beginning and then he pressed a comma or "Enter", then close the square bracket in this line. This behavior should work in the case when the user puts only a square bracket at the end.
- If user closes the square bracket in a line, then move the cursor to the next line.
- **The "AND" logic works in the line between words.**
- Change the logic between the lines using radio buttons (in the "Include keywords" filter).
- Do not allow to nest additional square brackets inside square brackets. When user opens (or when inserting) a new open parenthesis, close the previous word and wrap the data onto a new line of data.

@## Validation

- When validating the data, highlight invalid lines with a Warning icon at the beginning of the line.
- By clicking on "Apply", cut out special characters and leave only keywords.

### Limit for number of keywords

Include/Exclude filters are linked, so user can enter only 300 keywords in both filters (restriction on the backend) in total.

![filter validation](static/validation-1.png)

### Limit for keyword length

The keyword cannot be longer than 255 characters. If a keyword does not fit on a line, wrap it to the next line. Highlight such a long keyword, show a tooltip with a description of the error.

![filter validation](static/validation-2.png)

### Limit for special characters

Add a restriction on entering special characters in the textarea.

![filter validation](static/validation-3.png)

### Input has many errors

If there are many keywords with errors in the input, show the text below the field with the number of errors and controls (down/up arrows) to switch between them.

For each error, be sure to show a tooltip with an explanation of what needs to be corrected. **When switching between errors, change the contents of the tooltip.**

![filter validation](static/many-errors.png)

@## Abbreviations and tooltips

If the names of filters "Include keywords" and "Exclude keywords" do not fit completely, abbreviate them to "Include" and "Exclude", respectively.

![filter tooltips](static/tooltips.png)

@## Old browsers support

> **Why do we have a separate view of this filter for the older browsers?**
>
> Some of our users have old browsers, and we want them to be able working in them.
>
> To make users use this filter, we have a cut version of it.

- For users with a new browser, show errors on the fly and highlight them, and add line numbering with keywords in the input.
- In the old browser, these convenient things are absent, and the validation applies only after the clicking on "Apply" button.

Determine that the user has an input in the old browser only at the moment of the first input — the interface will blink and the Info icon will appear. While hovering over this icon show a tooltip with a message about the old browser and why the interface has changed.

![filter in old browsers](static/old-browser-1.png)

**Since in older browsers we cannot indicate on the fly input errors and highlight invalid data, report errors in general.**

![filter in old browsers](static/old-browser-2.png)
![filter in old browsers](static/old-browser-3.png)

@## Nothing found

"Empty" state is described in the [Filter common rules](/filter-group/filter-rules/).

@page filter-include-exclude-code
