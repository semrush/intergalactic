---
title: Design requirements
---

@## Color and contrast

### Use of color

To ensure everyone can understand and differentiate visual elements, avoid relying solely on color. Different people see colors in different ways, and some may even be colorblind.

To use color thoughtfully, consider adding another indicator such as a visible border, label, underline, or icon. If you use charts and graphics that rely heavily on color, add other visual differences like hatching patterns or labels. It's also helpful to [learn about color blindness](https://webaim.org/articles/visual/colorblind) and use a Figma plugin or browser extension to verify the accessibility of your designs.

Refer to [WCAG guidelines](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html) to know more about use of color.

### Text color contrast

Making text highly-contrasted against the background helps people read and interact with your interface more easily.

Based on current criteria, the contrast ratio should meet these minimums:

- Text smaller than 24px or 19px bold should have a contrast ratio of at least 4.5:1.
- Text larger than 24px or 19px bold should have a contrast ratio of at least 3:1.

Refer to [WCAG guidelines](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) to know more about color contrast.

### Non-text color contrast

All graphics and components must have a contrast ratio of at least 3:1 compared to the surrounding colors, unless they are purely decorative. This rule applies to icons, charts, infographics, controls, and any states like hover or active. However, inactive components, states, and purely decorative elements are exempt from these contrast ratio requirements.

Refer to [WCAG guidelines](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) to know more about non-text color contrast.

@## Typography

Refer to the [Typography guide](/style/typography/typography-a11y/) for the detailed recommendations.

@## Focus visible

Ensuring that users can easily identify which element has the keyboard focus is essential for keyboard users to navigate a page. To achieve this:

- Make sure the focus state is distinct from the mouse hover state, so the user can see the difference.
- Use a strong, visible focus indicator for interactive elements, such as links, buttons, and form fields.
- Ensure the focus indicator has a 3:1 color contrast ratio against the background.

Refer to [WCAG guidelines](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-visible.html) to know more about visible focus.

@## Layout and structure

Make sure that user can easily understand the meaning and structure of the page and complete the required task. The design should help the user find key information quickly and easily.

![The illustration has two sections: "Don't" on the left and "Good" on the right. In the "Don't" section, there are incorrect HTML tags, such as h4 for "Your first report", h1 for "Group your marketing activities by goals", and h6 for the paragraph that follows. The "Good" side shows the proper usage of HTML tags: h1 for "Your first report", h2 for "Group your marketing activities by goals", and p for the paragraph that follows.](/core-principles/a11y/static/structure.png)

> **Why it's important**
>
> - It allows users to quickly find the necessary information and solve their cases.
> - It helps users quickly understand what's happening on the page.

**Requirements:**

- All content and design of the page should have meaningful sequence and fit into the logical structure.
- Make sure that users can navigate the site in multiple ways: with a table of contents, a sitemap, links between pages, and search on the website.
- Screen readers should read the information in the same order it is displayed.
- Use styles correctly. Level 1 headings in the layout must be H1 headings in code. At the same time, text that is clearly not a level 1 heading should not be marked up as H1 in the code. Also, don't use plain text for headings.

Refer to [WCAG guidelines](https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html) to know more about meaningful sequence.

@## Scaling and resizing

Make sure that when you zoom in to 200%, the page is still readable and functional, and the user doesn't need to scroll horizontally to see everything.

People should be also able to increase the size of text to up to 200%. This helps those with partial sight to read your content comfortably. Although this change is implemented in code, it's important to keep it in mind when designing page layouts. Check that the text can flow at a larger size and is not limited by a fixed-width or fixed-height layout.

> **Why it's important**. It's important for people with poor eyesight and when browsing the site on a mobile device.

Use adaptive layout to allow the user to choose their preferred scale while preserving the readability of the site. This is especially important for elements that contain small and low-contrast text.

This way you will both cover the needs of the visually impaired and ensure that your site can adapt for devices with any screen size. When the layout is ready, test the scaling by zooming in to 200% using `Control+` (or `Command+` on Mac).

Refer to [WCAG guidelines](https://www.w3.org/WAI/WCAG21/Understanding/resize-text) to know more about scaling and resizing criteria.

@## Graphics and images

Make sure that user understands all content, including charts, icons, and images.

### Graphics

- Don't use graphics if your case can be solved with text.
- Make sure all graphics are accompanied by a clear text description. However, decorative graphics don't require a text alternative.
- Use icons as additional visual cues, not decorations, and only where it's really necessary. Choose easily recognizable icons (for example, a trash can for deleting something).
- Don't forget about contrast when placing text on an image. Use a solid background or make the image darker.

### Data visualization

- Provide a text description for the data visualizations.
- Make sure data and specifications are clearly labeled.
- Provide sufficient contrast between the presented data (for example, lines in charts), so that colorblind users can distinguish between them. Getting a 3:1 contrast ratio between all colors in a data visualization can be hard. We recommend including other visual cues such as a difference in pattern and/or the use of textual labels (we plan to implement some solutions in our charts library).

### Alternate versions

- Create an alternate form for the content that cannot be presented as text. For example, to help the user find an ATM, you could offer a map, a table, or a list.
- Captcha tops the list of the most difficult and common problems that blind users face. It's often used needlessly from a security point of view, and can be replaced with other validation methods. If using a Captcha is absolutely necessary, be sure to add an audio alternative for visually impaired users.

To learn more, visit the [text alternatives](https://www.w3.org/TR/WCAG21/#text-alternatives) section of the WCAG website.

@## Media content

Make sure that your media content (videos, images, etc.) is accessible to hearing and visually impaired users.

**Requirements**:

- Add subtitles and a transcript to your audio and video content to make it accessible to the hard-of-hearing and the users who don't speak the language the content is presented in.
- Avoid harmful design elements. Make sure that you don't have elements that flash more than three times per second.

> Animated website elements, flickering or flashing logos or ads can cause a seizure in people suffering from photosensitive epilepsy.

@## Forms

![The illustration is in two parts; "Don't" on the left and "Good" on the right. In the "Don't" section, two input fields are shown - one labeled "Phone number" and the other labeled "Company name." There are no helpful hints or placeholders. The "Good" side shows a more user-friendly form. The first input is labeled "Phone number" and includes the USA flag and telephone code, so the user doesn't need to remember it. The second input is labeled "Company name" and includes the placeholder "Enter keywords you need." There's also a hint below the input box that says "E.g., if your company is 'Apple,' then type in 'iPhone, Mac'."](/core-principles/a11y/static/forms.png)

Provide instructions and hints to help users avoid mistakes when filling out a form.

- Make sure that all input elements have meaningful labels that remain visible even after a field has been filled out.
- Let the user know the data format in advance (date, phone number, zip code, etc.). It's also a good practice letting the user know when their Caps Lock button is enabled.
- Provide clear instructions to help user fix any errors.

> Minimize the need to enter text or search. Whenever possible, enable voice input, text field autocomplete, and previews.
>
> **Useful resources**
>
> Web content accessibility guidelines on:
>
> - [Non-text Content ›](https://www.w3.org/TR/WCAG21/#non-text-content)
> - [Info and Relationships ›](https://www.w3.org/TR/WCAG21/#info-and-relationships)
> - [On Focus ›](https://www.w3.org/TR/WCAG21/#on-focus)
> - [Error Identification ›](https://www.w3.org/TR/WCAG21/#error-identification)
> - [Labels or Instructions ›](https://www.w3.org/TR/WCAG21/#labels-or-instructions)
> - [Error Suggestion ›](https://www.w3.org/TR/WCAG21/#error-suggestion)
> - [Error Prevention ›](https://www.w3.org/TR/WCAG21/#error-prevention-legal-financial-data)
> - [Name, Role, Value ›](https://www.w3.org/TR/WCAG21/#name-role-value)

@## Labels and instructions

Make sure that the labels for the elements clearly indicate what will happen when the user clicks on them.

**Requirements**:

- **It should be clear from the link text what will happen on click**. Don't use URLs or the _"Click here"_ anchor text for your links, as they are too uninformative. For example, instead of _"Click here"_ use _"Download report"_, or _"Create account"_ instead of _"Finish"_. This way, the user will have a clear idea of what will happen next.
- **Links should be an organic part of a sentence**. For example, it's better to write: _"In the new version of the iPhone application, we added support for the Cyrillic alphabet"_ – instead of _"In the new application for the iPhone, we added support for the Cyrillic alphabet. Download"_. Sentences like this are easier to understand for all users, and especially for those who use screen readers.
- **If clicking on a link leads to the download of a document, let the user know**. If your link leads to a PDF file, write: _"Download instructions in PDF"_. This is important for mobile users with data caps.

![The illustration has two sides; "Don't" on the left and "Good" on the right. In the "Don't" section, the text says "You can see all plans and pricing lists here." Only the word "here" is colored blue to indicate it's a link. In the "Good" section, the entire text "all plans and pricing lists here" is colored like a link.](/core-principles/a11y/static/labels.png)

- **Make sure that the instructions can be followed by hearing or visually impaired users**.

- **Don't make references to the shape, size, visual layout, or sound**. Prompts like _"See image above"_ or _"Find instructions in the right column"_ will mean nothing to a blind user, while a deaf user will not be able to follow the instructions like _"Continue after the beep"_ or _"Confirm the transfer via a phone call"_.

![](/core-principles/a11y/static/instructions.png)

> **Useful resources**
>
> Web content accessibility guidelines on:
>
> - [Link Purpose (In Context) ›](https://www.w3.org/TR/WCAG21/#link-purpose-in-context)
> - [Sensory Characteristics ›](https://www.w3.org/TR/WCAG21/#sensory-characteristics)

@## Touch targets

Make sure that the touch targets of the items are large enough and are easily accessible.

**Requirements**:

- **Make sure that it's possible to reach the main controls with your mouse on the desktop device or with your thumb on the mobile device**.
- **Set target areas to at least 44px**. An average adult's fingertip size is around 10mm, so you'll need to increase the size of the target area around your icons to make them easier to hit.
- **Separate actionable elements with an appropriate margin**. This will help the user activate the element they're aiming for.

![The illustration has two sides; "Don't" on the left and "Good" on the right. The "Don't" side has text that says "You need to click the button to confirm your subscription." In comparison, the "Good" side shows a big blue button labeled "Confirm subscription."](/core-principles/a11y/static/click-zone.png)

> **Useful resources**
>
> Web content accessibility guidelines on:
>
> - [Touch Target ›](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
> - [Touch Target Size and Spacing ›](https://www.w3.org/TR/mobile-accessibility-mapping/#touch-target-size-and-spacing)
> - [Placing buttons where they are easy to access ›](https://www.w3.org/TR/mobile-accessibility-mapping/#h-placing-buttons-where-they-are-easy-to-access)

@## Text readability

> **Why it's important**
>
> Some of your users may suffer from dyslexia or developmental disorders, making it difficult for them to read and understand complex sentences with rich or wordy expressions. Some of your users might not understand technical terms or slang. Mobile users also have difficulty reading long paragraphs of text.

**Requirements**:

- **Use clear headings**. Make your headings clear and descriptive so that readers can easily understand what the following text is about. Try to keep your paragraphs short for easier viewing on mobile devices. Use short sentences whenever possible.

- **Be careful with typos**. Watch your keyboard layout. Remember that the English letter _C_ and the Russian letter _С_ are 2 completely different characters, despite the fact that they look the same. Screen readers read symbols based on their code in the symbol table, and not from its typeface. So if there are any typos like this in the text of the page, it makes it extremely difficult to work with for your blind or visually impaired users.

- **Avoid idioms**. Try not to use idioms or other expressions whose meaning cannot be easily recognized from the usual meanings of the words that they consist of. For example, an expression like _play the fool_ can be taken literally by users with mental disabilities or those who use a sign language to communicate.

> To learn more, visit the [Readable](https://www.w3.org/TR/WCAG21/#readable) section of the WCAG website.
