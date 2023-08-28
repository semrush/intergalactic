---
title: API
fileSource: progress-bar
tabs: ProgressBar('progress-bar'), A11y('progress-bar-a11y'), API('progress-bar-api'), Example('progress-bar-code'), Changelog('progress-bar-changelog')
---

## ProgressBar

The component responsible for the background under the progress bar value.

```jsx
import ProgressBar from '@semcore/ui/progress-bar';
<ProgressBar />;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="ProgressBarProps" :types={...types} />

## ProgressBar.Value

The component responsible for the progress bar value.

```jsx
import ProgressBar from '@semcore/ui/progress-bar';
<ProgressBar.Value />;
```

<TypesView type="ValueProps" :types={...types} />
