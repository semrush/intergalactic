---
title: Release system
tabName: About
---

@## What is it?

The release system is a system used to deliver library components in a single package.

@## What is it for?

Using the release system allows us to preserve the flexibility of our current delivery model while solving several important issues:

- Duplicates in `node_modules`
- A large huge number of `@semcore` dependencies and their management
- Incompatibility between different versions of packages

@## Update frequency

Our release cycle is **2 weeks**. That means that every two weeks we collect the changes for all packages, update the components to their new versions, write a changelog, and publish them to the library.

> There may be some deviations from this schedule due to critical errors or holidays 🥳

@## How to use

Install a new package and its dependencies will include all library components:

```bash
yarn add @semcore/ui
```

All components inside the package are divided into folders and can perform a re-export of actual components.

For example, if an import has the following format:

```js
import Button from '@semcore/button';
```

It can be replaced with the corresponding import from the ui package:

```js
import Button from '@semcore/ui/button';
```

> Due to the folder-based access to components, we cannot automatically connect commonJS or ES6. For now, we only support ES6.

@## How to use (with @semcore)

If you need a newer version of any component before we publish our package, you can install and use it separately.

> ⚠️ Don't install **`@semcore/core`** separately. It's already included in **ui** and should not be duplicated.

@page release-changelog
