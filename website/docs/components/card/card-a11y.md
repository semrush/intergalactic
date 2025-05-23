---
title: Card
a11y: AA
tabs: Design('card'), A11y('card-a11y'), API('card-api'), Example('card-code'), Changelog('card-changelog')
---

## Considerations for developers

- Make sure that all interactive elements are focusable and the focus is visible.
- Use buttons instead of interactive icons whenever possible. Refer to **Settings** and **Hide widget** buttons in [our examples](./card-code).
- Ensure all text within the card is in the reading order and accessible to screen reader users.
- If the card has a title, make sure that the title has the appropriate heading level. For example, if your card follows an `<h2>` heading, the title of the card should use an `<h3>` tag. [Refer to our example](./card-code#basic-usage).
- Add an appropriate ARIA landmark role (for example, `region`) and an `aria-label` to the card if it represents an important part of the page. This allows screen reader users navigate quickly between different parts of the interface. [Refer to our example](./card-code#basic-usage).
- If the card has several elements that are loaded dynamically and announced using `aria-live` and `role="status"` attributes, make sure these updates are announced only when all elements have finished updating. You can do this by adding the `aria-busy="true"` attribute to the `Card` component during the loading and setting it to `false` when it's finished.

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
