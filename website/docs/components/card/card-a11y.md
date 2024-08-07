---
title: Card
a11y: AA
tabs: Design('card'), A11y('card-a11y'), API('card-api'), Example('card-code'), Changelog('card-changelog')
---

## Considerations for developers

- Make sure that all interactive elements are focusable and the focus is visible.
- Use buttons instead of interactive icons whenever possible. Refer to **Settings** and **Hide widget** buttons in [our examples](./card-code).
- Ensure all text within the card is in the reading order and accessible to screen reader users.
- If the card has a title, make sure that the title has the appropriate heading level. For example, if your card follows an `<h2>` heading, the title of the card should use an `<h3>` tag. [See the example](./card-code#basic-example).
- Add an appropriate ARIA landmark role (for example, `region`) and an `aria-label` to the card if it represents an important part of the page. This allows screen reader users navigate easily between different parts of the interface. [See the example](./card-code#basic-example).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
