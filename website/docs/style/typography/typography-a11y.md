---
title: Typography
a11y: AA
tabs: Design('typography'), A11y('typography-a11y'), API('typography-api'), Example('typography-code'), Changelog('typography-changelog')
---

## Considerations for developers

- Heading tags should be in order. That means an `<h1>` is followed by an `<h2>`, an `<h2>` is followed by a `<h2>` or `<h3>` and so on.
- Don’t style text to give the visual appearance of headings – use actual heading tags.

_Source – [A11y style guide](https://a11y-style-guide.com/style-guide/section-structure.html#kssref-structure-lists)_

## Considerations for designers

### Font

**Use a font size sufficient for comfortable reading**. The minimal font size for the body text is 16 pixels, but this size may vary depending on the font style.

**Choose a legible font**. Sans-serif fonts are generally recommended for interfaces, while serif fonts work well for long documents, but this is not a strict rule. Ensure that your font:

- Remains readable at any scale
- Has tall lowercase letters (high x-height)
- Is sufficiently large at the chosen size
- Maintains consistent letterform proportions (such as lowercase letter height and other key characteristics)
- Includes distinct characters that are easy to differentiate, such as 0 (zero) and O (uppercase O)
- Supports all required symbols and styles

**Determine the height of the text for optimal reading**. The larger the font size and line thickness, the larger the spacing should be. For the body text, the spacing to font size ratio should be around 1.4–1.65, for headings – 1–1.3, for captions and short lines – around 1.3. Lines that are spaced too tightly or too loosely make text less readable, so finding a new line becomes more difficult.

### Headings

Headings should be chosen to represent the actual hierarchical structure of the page. Navigating through the `<h1>` and `<h2>` give a user an overview of a page and how its content is structured.

Make sure that the headings differ from the main text in size, thickness, style, and color. This will ensure visual consistency and readability with the main text.

### Paragraph width

Set the paragraph width for comfortable reading. Don't make paragraphs too long or too short: 45 to 75 characters is an acceptable length, 66 is optimal. Shorter text is good for forms, image captions, and unimportant notes.

## Resources

[Use of Color](https://www.w3.org/WAI/WCAG21/quickref/#use-of-color) – color isn’t used as the only visual means of
conveying information, indicating an action, prompting a response, or distinguishing a visual element.
_(Level A)_

[Text Spacing](https://www.w3.org/WAI/WCAG21/quickref/#text-spacing) – in content implemented using markup languages, no loss of content or functionality occurs. _(Level AA)_

[Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum) – the visual presentation of
text and images of text has a contrast ratio of at least 4.5:1, except for some cases. _(Level AA)_

[Resize Text](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#resize-text) – except for captions and
images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality. _(Level AA)_

[Images of Text](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#images-of-text) – if the
technologies being used can achieve the visual presentation, text is used to convey information rather than images of text. _(Level AA)_

[Visual Presentation](https://www.w3.org/WAI/WCAG21/quickref/#visual-presentation) – _(Level AAA)_

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
