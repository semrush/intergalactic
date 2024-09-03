---
title: Carousel
tabs: Design('carousel'), A11y('carousel-a11y'), API('carousel-api'), Example('carousel-code'), Changelog('carousel-changelog')
---

## Carousel with default indicators

::: sandbox

<script lang="tsx">
  export Demo from './examples/carousel_with_default_indicators.tsx';
</script>

:::

## Carousel with preview indicators

::: sandbox

<script lang="tsx">
  export Demo from './examples/carousel_with_preview_indicators.tsx';
</script>

:::

## Carousel without modal window

::: sandbox

<script lang="tsx">
  export Demo from './examples/carousel_without_modal_window.tsx';
</script>

:::

## Carousel without prev/next buttons

::: sandbox

<script lang="tsx">
  export Demo from './examples/carousel_with_indicators_only.tsx';
</script>

:::

## Hiding nested elements on hidden slides

- `ariaHidden` controls the element's visibility for screen readers.
- `tabIndex` determines whether the element is included in the tab sequence on the page.

```jsx
<Carousel index={index} onIndexChange={handleChangeIndex}>
  <Carousel.Item key={ind} ariaHidden={ind === index}>
    <Image />
    <Button tabIndex={ind === index ? 1 : -1} />
  </Carousel.Item>
</Carousel>
```

