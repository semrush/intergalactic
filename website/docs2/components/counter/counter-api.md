---
title: API
tabs: Counter('counter'), A11y('counter-a11y'), API('counter-api'), Example('counter-code'), Changelog('counter-changelog')
---

## Counter

```jsx
import Counter from '@semcore/ui/counter';
<Counter />;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="CounterProps" :types={...types} />

## AnimatedNumber

```jsx
import { AnimatedNumber } from '@semcore/ui/counter';
<AnimatedNumber />;
```

<TypesView type="AnimatedNumberBaseProps" :types={...types} />
