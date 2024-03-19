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

## Hidden controls to move focus in hidden block

- `ariaHidden` controls the visibility on the screens.
- `tabIndex` controls the visibility of the focus.

```jsx
<Carousel index={index} onIndexChange={handleChangeIndex}>
  <Carousel.Item key={ind} ariaHidden={ind === index}>
    <Image />
    <Button tabIndex={ind === index ? 1 : -1} />
  </Carousel.Item>
</Carousel>
```

