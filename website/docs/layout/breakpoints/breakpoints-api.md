---
title: API
---

@## Breakpoints

It is a functional wrapper over your application giving access to the context.

```jsx
import Breakpoints from '@semcore/breakpoints';

<Breakpoints />;
```

@## Breakpoints.Context

Is the React context.

```jsx
import Breakpoints from '@semcore/breakpoints';

useContext(Breakpoints.Context);
```

@## Breakpoints.mediaList

It is an instance of the class for media queries.

```jsx
import Breakpoints from '@semcore/breakpoints';

Breakpoints.mediaList.matches();
Breakpoints.mediaList.addListener();
```
