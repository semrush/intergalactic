---
title: Design tokens
tabs: Tokens('design-tokens'), Usage in design('design-tokens-usage'), Usage in development('design-tokens-usage-development'), Changelog('design-tokens-changelog')
---

## Global theme

Design tokens help ensure consistent visual choices and behavior across the design system. They also make it easier to update and maintain the product, as changes can be made in a centralized way.

<!-- **Why design tokens should be used only for global theming:**

- By using design tokens for global theming, you can ensure that the design system remains flexible and adaptable to a change. As the design system evolves, updates can be made to the design tokens, which will then be reflected in all relevant places throughout the design system.
- Design tokens add a centralized approach to updating the design system look and feel, making it easier to ensure that all updates are made in a controlled and deliberate manner. -->

::: tip
If you can't find the token you're looking for, we recommend you to double-check the existing ones. If it's really missing, you can drop us a line with a request to add a new entity.
:::

### How to apply theme globally

Global themes should be preferred over local ones until multiple themes appear on the same page.

To apply a global theme, define CSS variables on the `:root` via CSS or JS. For example, following CSS will make all main backgrounds black and all primary texts white.

```css
:root {
  --intergalactic-bg-primary-neutral: #000;
  --intergalactic-text-primary: #fff;
}
```

Any design token from the [tokens list](/style/design-tokens/design-tokens#semantic-tokens) may be applied.

## Local theme

We don’t recommend using tokens for local theming or specific instances, because it can lead to visual inconsistencies within the design system and may require more effort to maintain visual decisions. Besides, using tokens only for a certain component will cause changes to be applied to the internal content of the component as well, which may be unnecessary.

If you do need to make pointed changes, then instead of using design tokens, you need to use **sstyled** and apply the styles directly to the component.

### ThemeProvider

Theme for React components subtree may also be applied via `<ThemeProvider />`.

`<ThemeProvider />` applies provided tokens on DOM node and handles passing them into React Portal created with `@semcore/portal`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/utils/design-tokens/docs/examples/themeprovider.tsx';
</script>

:::

## Components with custom styles

Design tokens are recommended when creating custom styles for a component to ensure a consistent look and reduce the time and effort spent on manual updates.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/utils/design-tokens/docs/examples/tokens-with-custom-component.tsx';
</script>

:::
