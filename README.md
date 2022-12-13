<img src=".github/images/semrush-hero.png" alt="team's picture">

[![codecov](https://codecov.io/gh/semrush/intergalactic/branch/master/graph/badge.svg?token=OILALW3YQE)](https://codecov.io/gh/semrush/intergalactic)
[![version](https://img.shields.io/npm/v/@semcore/ui.svg)](https://www.npmjs.com/package/@semcore/ui)
[![downloads](https://img.shields.io/npm/dt/@semcore/ui.svg)](https://www.npmjs.com/package/@semcore/ui)

Intergalactic is a constantly developing design system of [React](https://reactjs.org/) component, guidelines and UX patterns for buiding interfaces. You can explore components in our [documentation website](https://i.semrush.com).

---

## Features ✨

- 80+ components for your design (you can also find them in the [Figma Community](https://www.figma.com/@semrush))
- High-quality React components out of the box
- Written in TypeScript with predictable static types
- Whole package of design resources and development tools
- Powerful collection of charts
- Theme customization in every detail (coming soon)

## Browser Support

- Google Chrome
- Mozilla Firefox
- Opera
- Microsoft Edge
- Safari (two last versions)

## Before you start

This repository is a single development point for all library components. Each component is a separate package located in the `@semcore` namespace.

You can add our components to your project using any package manager.

## Installation 🛠

The library supports two delivery systems:

- Package system where each individual component is a separate package
- Release system where all components are combined in a single package

We recommend you using the release system, since it's more convenient and it reduces the risk of bundle bloat due to package duplicates. With the release system, you can also install component packages separately if you need to.

### Release system

Components are installed in a single package.

Example:

```
npm i @semcore/ui
```

After the installation, all components will be available at `@semcore/ui/{{ component name }}`.

### Package system

All components are located in the `@semcore` namespace in npm and are installed separately.

If the selected component is running, you must install the `@semcore/core package`.

Example:

```
npm i @semcore/button @semcore/core
```

`@semcore/core` is the basic package with which we create our components, and it contains all of the common logic of the components that is discussed below. There should be only one version of the package in the project.

## How to contribute to the project

All changes, including changes by the project members, must go through a code review. We use pull requests on GitHub for this purpose. [Learn more about contributing ›](https://github.com/semrush/intergalactic/blob/master/CONTRIBUTING.md)

### Contributors

Thanks to all contributors, you are so awesome! ❤️

- [Roman Lysov](https://github.com/lsroman)
- [Michael Sereniti](https://github.com/phytonmk)
- [Julia Mnizhek](https://github.com/j-mnizhek)
- [Elena Krasnopolskaia](https://github.com/ekrasnopolskaia)
- [Ruslan Gaiazov](https://github.com/freeyoungstrong)
- [Elena Khaas](https://github.com/elenakhaas)
- [Tatana Iliukhina](https://github.com/tatana-I)
- and many others from Semrush team

### I found a bug! 🕵️‍

Great job!

You always can open an [issue in the repository](https://github.com/semrush/intergalactic/issues/new?issue). We'll be glad to help!
