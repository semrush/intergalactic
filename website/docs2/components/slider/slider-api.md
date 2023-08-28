---
title: API
fileSource: slider
tabs: Slider('slider'), A11y('slider-a11y'), API('slider-api'), Example('slider-code'), Changelog('slider-changelog')
---

## Slider

```jsx
import Slider from '@semcore/ui/slider';
<Slider />;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="SliderProps" :types={...types} />

## Slider.Bar

```jsx
import Slider from '@semcore/ui/slider';
<Slider.Bar />;
```

## Slider.Knob

```jsx
import Slider from '@semcore/ui/slider';
<Slider.Knob />;
```

## Slider.Options & Slider.Item

```jsx
import Slider from '@semcore/ui/slider';
<Slider.Options>
  <Slider.Item />
</Slider.Options>;
```
