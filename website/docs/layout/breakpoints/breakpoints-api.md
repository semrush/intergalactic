---
title: Breakpoints
fileSource: breakpoints
tabs: Design('breakpoints'), API('breakpoints-api'), Example('breakpoints-code'), Changelog('breakpoints-changelog')
---

## Breakpoints

It is a functional wrapper over your application giving access to the context.

```jsx
import { defaultBreakpoints as Breakpoints } from '@semcore/base-components';

<Breakpoints />;
```

## Breakpoints.Context

Is the React context.

```jsx
import { defaultBreakpoints as Breakpoints } from '@semcore/base-components';

useContext(Breakpoints.Context);
```

## Breakpoints.mediaList

It is an instance of the class for media queries.

```jsx
import { defaultBreakpoints as Breakpoints } from '@semcore/base-components';

Breakpoints.mediaList.matches();
Breakpoints.mediaList.addListener();
```
