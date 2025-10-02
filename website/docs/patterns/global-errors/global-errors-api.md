---
title: Error message
tabs: Design('global-errors'), A11y('global-errors-a11y'), API('global-errors-api'), Example('global-errors-code'), Changelog('global-errors-changelog')
---

## Error

The component that can be used to display any global errors on the page.

```jsx
import Error from '@semcore/ui/errors';
<Error />;
```

<TypesView type="ErrorsProps" :types={...types} />

## Error.Title

Error title. Extends for `<Box/>`.

```jsx
import Error from '@semcore/ui/errors';
<Error.Title />;
```

## Error.Description

Error description. Extends for `<Box/>`.

```jsx
import Error from '@semcore/ui/errors';
<Error.Description />;
```

## Error.Controls

Container for controls. Extends for `<Box/>`.

```jsx
import Error from '@semcore/ui/errors';
<Error.Controls />;
```

## AccessDenied

Template for the 403 error: user has no access to the page.

```jsx
import { AccessDenied } from '@semcore/ui/errors';
<AccessDenied />;
```

<TypesView type="AccessDeniedProps" :types={...types} />

## Maintenance

Template for the global state for the period of technical works.

```jsx
import { Maintenance } from '@semcore/ui/errors';
<Maintenance />;
```

<TypesView type="MaintenanceProps" :types={...types} />

## PageError

Template for the 500 error, caused by some technical problems.

```jsx
import { PageError } from '@semcore/ui/errors';
<PageError />;
```

<TypesView type="PageErrorProps" :types={...types} />

## PageNotFound

Template for the 404 error: page not found.

```jsx
import { PageNotFound } from '@semcore/ui/errors';
<PageNotFound />;
```

<TypesView type="PageNotFoundProps" :types={...types} />

## ProjectNotFound

Template for the 404 error, but for a project page.

```jsx
import { ProjectNotFound } from '@semcore/ui/errors';
<ProjectNotFound />;
```

<TypesView type="ProjectNotFoundProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
