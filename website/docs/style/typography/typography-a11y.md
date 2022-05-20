---
title: A11y
---

@## General recommendations

Make sure that the user can easily read the text on the page.

- **Use a font size sufficient for comfortable reading**. The minimal font size for the body text is 16 pixels, but this size may vary depending on the font style.

- **Set the paragraph width for comfortable reading**. Don't make paragraphs too long or too short: 45 to 75 characters is an acceptable length, 66 is optimal. Shorter text is good for forms, image captions, and unimportant notes.

- **Choose a legible font**. It's recommended to use sans serif fonts for interfaces and serif fonts for long documents, but this is not an absolute rule. Make sure that your font:

  - Reads well regardless of the scale
  - Has large-height lowercase letters (x-height)
  - Is sufficiently large in the selected size
  - Has constant parameters for letter forms (lowercase letter height and other parameters)
  - Has unique characters that cannot be confused with each other, for example `0` and `O`
  - Supports all necessary symbols and styles

- **Use headings to draw the user's attention to the page
  hierarchy**. Make sure that the headings differ from the main text in size, thickness, style, and color. This will ensure visual consistency and readability with the main text.

- **Determine the height of the text for optimal reading**. The larger the font size and line thickness, the larger the spacing should be. For the body text, the spacing to font size ratio should be around 1.4–1.65, for headings — 1–1.3, for captions and short lines — around 1.3. Lines that are spaced too tightly or too loosely make text less readable, so finding a new line becomes more difficult.

@## Headings

- Navigating through the `<h1>` and `<h2>` give a user an overview of a page and how its content is structured. The `<h3>` through `<h6>` elements provide a quick understanding of the details in each section.
- Heading tags should be in order. That means an `<h1>` is followed by an `<h2>`, an `<h2>` is followed by a `<h2>` or `<h3>` and so on. It is ok to skip heading levels when going up in order (ex. `<h4>` to `<h1>`).
- Keep heading tags consistent. Inconsistently implementing headings can create confusion and frustration for users using assistive technologies.
- Do not style text to give the visual appearance of headings — use actual heading tags.

_Source — [A11y style guide](https://a11y-style-guide.com/style-guide/section-structure.html#kssref-structure-headings)_

@## List

- Creating accessible lists is fairly straight-forward and easy if you use the correct mark-up.
- Use `ol` markup to group ordered lists; use `ul` markup to group unordered lists; and use `dl` markup to group terms with their definitions.
- Simple comma-separated lists may not need list markup, but longer lists or groups of links should have it.

_Source — [A11y style guide](https://a11y-style-guide.com/style-guide/section-structure.html#kssref-structure-lists)_

@## Resources

[Use of Color](https://www.w3.org/WAI/WCAG21/quickref/#use-of-color) — color is not used as the only visual means of
conveying information, indicating an action, prompting a response, or distinguishing a visual element.
_(Level A)_

[Text Spacing](https://www.w3.org/WAI/WCAG21/quickref/#text-spacing) — in content implemented using markup languages, no loss
of content or functionality occurs. _(Level AA)_

[Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum) — the visual presentation of
text and images of text has a contrast ratio of at least 4.5:1, except for some cases. _(Level AA)_

[Resize Text](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#resize-text) — except for captions and
images of text, text can be resized without assistive technology up to
200 percent without loss of content or functionality. _(Level AA)_

[Images of Text](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#images-of-text) — if the
technologies being used can achieve the visual presentation, text is used to convey
information rather than images of text. _(Level AA)_

[Visual Presentation](https://www.w3.org/WAI/WCAG21/quickref/#visual-presentation) — _(Level AAA)_

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
