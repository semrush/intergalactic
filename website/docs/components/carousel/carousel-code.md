---
title: Example
---

@## Image & video galleries on the page

@example image

@## Dots indicators

@example dots

@## Content galleries inside the modal window

@example content

@## Hidden controls to move focus in hidden block

```jsx
<Carousel index={index} onIndexChange={handleChangeIndex}>
  <Carousel.Item key={ind} ariaHidden={ind === index}>
    <Image />
    <Button tabIndex={ind === index ? 1 : -1} />
  </Carousel.Item>
</Carousel>
```

`ariaHidden` - control the visibility on the screens

`tabIndex` - control the visibility for the focus
