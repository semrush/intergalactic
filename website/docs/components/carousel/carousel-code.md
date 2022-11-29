---
title: Example
---

@## Image & video galleries

@example image

@## Dot indicators

@example dots

@## Content galleries inside the modal window

@example content

@## Hidden controls to move focus in hidden block

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
