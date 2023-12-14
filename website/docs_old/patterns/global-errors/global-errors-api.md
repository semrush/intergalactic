---
title: API
---

@## Error

The component that can be used to collect any global errors display on the page.

```jsx
import Error from '@semcore/ui/errors';
<Error />;
```

@typescript ErrorsProps

@## Error.Title

Error name. Extends for `<Box/>`.

```jsx
import Error from '@semcore/ui/errors';
<Error.Title />;
```

@## Error.Description

Error description. Extends for `<Box/>`.

```jsx
import Error from '@semcore/ui/errors';
<Error.Description />;
```

@## Error.Controls

Container for controls. Extends for `<Box/>`.

```jsx
import Error from '@semcore/ui/errors';
<Error.Controls />;
```

@## AccessDenied

Placeholder for the 403 error. For some reason the page is restricted for the user.

```jsx
import { AccessDenied } from '@semcore/ui/errors';
<AccessDenied />;
```

@typescript AccessDeniedProps

@## Maintenance

The placeholder for the global state for the period of technical works.

```jsx
import { Maintenance } from '@semcore/ui/errors';
<Maintenance />;
```

@typescript MaintenanceProps

@## PageError

The placeholder for 500 error, caused by some technical problems on the page. There are two options to display: when we are aware of the error and warn the user; when we don't know about the error and recommend the user to refresh the page or contact us.

```jsx
import { PageError } from '@semcore/ui/errors';
<PageError />;
```

@typescript PageErrorProps

@## PageNotFound

Placeholder for the 404 error, when the page isn’t found.

```jsx
import { PageNotFound } from '@semcore/ui/errors';
<PageNotFound />;
```

@typescript PageNotFoundProps

@## ProjectNotFound

The placeholder for the 404 error, but for the project page.

```jsx
import { ProjectNotFound } from '@semcore/ui/errors';
<ProjectNotFound />;
```

@typescript ProjectNotFoundProps
