---
title: API
fileSource: textarea
tabs: Textarea('textarea'), A11y('textarea-a11y'), API('textarea-api'), Example('textarea-code'), Changelog('textarea-changelog')
---

## Textarea

Component represents native `textarea` tag and takes all its properties such as `value` and `defaultValue`.

```jsx
import Textarea from '@semcore/ui/textarea';
<Textarea />;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="TextareaProps" :types={...types} />
