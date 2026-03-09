---
title: Breakpoints
fileSource: breakpoints
tabs: Design('breakpoints'), API('breakpoints-api'), Example('breakpoints-code'), Changelog('breakpoints-changelog')
---

## Breakpoints

A functional wrapper over your application giving access to the context.

```jsx
import { defaultBreakpoints as Breakpoints } from '@semcore/ui/base-components';

<Breakpoints />;
```

## Breakpoints.Context

The React context.

```jsx
import { defaultBreakpoints as Breakpoints } from '@semcore/ui/base-components';

useContext(Breakpoints.Context);
```

## Breakpoints.mediaList

An instance of the class for media queries.

```jsx
import { defaultBreakpoints as Breakpoints } from '@semcore/ui/base-components';

Breakpoints.mediaList.matches();
Breakpoints.mediaList.addListener();
```
