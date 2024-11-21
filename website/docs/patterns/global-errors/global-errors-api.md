---
title: Error message
tabs: Design('global-errors'), A11y('global-errors-a11y'), API('global-errors-api'), Example('global-errors-code'), Changelog('global-errors-changelog')
---

## Error

The component that can be used to collect any global errors display on the page.

```jsx
import Error from '@semcore/ui/errors';
<Error />;
```

<TypesView type="ErrorsProps" :types={...types} />

## Error.Title

Error name. Extends for `<Box/>`.

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

Placeholder for the 403 error. For some reason the page is restricted for the user.

```jsx
import { AccessDenied } from '@semcore/ui/errors';
<AccessDenied />;
```

<TypesView type="AccessDeniedProps" :types={...types} />

## Maintenance

The placeholder for the global state for the period of technical works.

```jsx
import { Maintenance } from '@semcore/ui/errors';
<Maintenance />;
```

<TypesView type="MaintenanceProps" :types={...types} />

## PageError

The placeholder for 500 error, caused by some technical problems on the page. There are two options to display: when we are aware of the error and warn the user; when we don't know about the error and recommend the user to refresh the page or contact us.

```jsx
import { PageError } from '@semcore/ui/errors';
<PageError />;
```

<TypesView type="PageErrorProps" :types={...types} />

## PageNotFound

Placeholder for the 404 error, when the page isn’t found.

```jsx
import { PageNotFound } from '@semcore/ui/errors';
<PageNotFound />;
```

<TypesView type="PageNotFoundProps" :types={...types} />

## ProjectNotFound

The placeholder for the 404 error, but for the project page.

```jsx
import { ProjectNotFound } from '@semcore/ui/errors';
<ProjectNotFound />;
```

<TypesView type="ProjectNotFoundProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
