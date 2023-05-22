---
title: Usage in development
---

@## Global theme

Design tokens are ideal for global theming because they help ensure consistent visual choices and behavior across the design system. They also make it easier to update and maintain the product, as changes can be made in a centralized way.

**Why design tokens should be used only for global theming:**

- By using design tokens only for global theming, you can ensure that the design system remains flexible and adaptable to a change. As the design system evolves, updates can be made to the design tokens, which will then be reflected in all relevant places throughout the design system.
- Design tokens add a centralized approach to updating the design system, making it easier to ensure that all updates are made in a controlled and deliberate manner.

To sum up, using design tokens only for global theming is a best practice because it promotes consistency, maintainability, modularity, and adaptability in the design system.

> If you can't find the token you are looking for, then please double-check the existing ones. If it is really missing, you can drop us a line with a request to add a new token.

### How to apply theme globally

Global themes should be preferred over local ones until multiple themes appear on the same page.

To apply a global theme, define CSS variables on the `:root` via CSS or JS. For example, following CSS will make all main backgrounds black and all primary texts white.

```css
:root {
  --intergalactic-bg-primary-neutral: #000;
  --intergalactic-text-primary: #fff;
}
```

Any design token from the [tokens list](/style/design-tokens/#semantic_tokens) may be applied.

@## Local theme

We do not recommend using tokens for local theming or specific instances, because it can lead to visual inconsistencies within the design system and may require more effort to maintain visual decisions. Besides, using tokens only for a certain component will cause changes to be applied to the internal content of the component as well, which may be unnecessary.

If you do need to make pointed changes, then instead of using design tokens, you need to use **sstyled** and apply the styles directly to the component.

### ThemeProvider

Theme for React components subtree may also be applied via `<ThemeProvider />`.

`<ThemeProvider />` applies provided tokens on DOM node and handles passing them into React Portal created with `@semcore/portal`.

@example theme-provider
