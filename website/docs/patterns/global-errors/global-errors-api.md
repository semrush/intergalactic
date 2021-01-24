---
title: API
---

@## Error

The component that can be used to collect any global errors display on the page.

```jsx
import Error from '@semcore/errors';
<Error />;
```

@interface IErrorsProps

@## Error.Title

Error name.

```jsx
import Error from '@semcore/errors';
<Error.Title />;
```

@interface IErrorStaticProps

@## Error.Description

Error description.

```jsx
import Error from '@semcore/errors';
<Error.Description />;
```

@interface IErrorStaticProps

@## Error.Controls

Container for controls.

```jsx
import Error from '@semcore/errors';
<Error.Controls />;
```

@interface IErrorStaticProps

@## AccessDenied

Placeholder for the 403 error. For some reason the page is restricted for the user.

```jsx
import { AccessDenied } from '@semcore/errors';
<AccessDenied />;
```

@interface IAccessDeniedProps

@## Maintenance

The placeholder for the global state for the period of technical works.

```jsx
import { Maintenance } from '@semcore/errors';
<Maintenance />;
```

@interface IMaintenanceProps

@## PageError

The placeholder for 500 error, caused by some technical problems on the page. There are two options to display: when we are aware of the error and warn the user; when we don't know about the error and recommend the user to refresh the page or contact us.

```jsx
import { PageError } from '@semcore/errors';
<PageError />;
```

@interface IPageErrorProps

@## PageNotFound

Placeholder for the 404 error, when the page is not found.

```jsx
import { PageNotFound } from '@semcore/errors';
<PageNotFound />;
```

@interface IPageNotFoundProps

@## ProjectNotFound

The placeholder for the 404 error, but for the project page.

```jsx
import { ProjectNotFound } from '@semcore/errors';
<ProjectNotFound />;
```

@interface IProjectNotFoundProps
