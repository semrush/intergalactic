---
title: Introducing new intergalactic npm package
date: 2024-03-27
---

We're thrilled to introduce the `intergalactic` npm package, a next step of package delivery evolution of Semrush's design system.

![Hero](./intergalactic-hero.png)

## Why we did it

Historically, our design system provided components as separate packages, such as `@semcore/button` . This approach offered developers the flexibility to update individual components without affecting the entire library, an invaluable feature for managing bugs. However, as our library grew, we recognized the need for a more integrated solution.

The fragmentation of component versions could lead to unexpected bugs, which were challenging to debug due to the interconnected nature of our core, utility sets, and other underlying components. Although we previously launched the `@semcore/ui` package, which depended on and re-exported all component packages. It was solving the problem but it fell short in supporting less popular frameworks like Astro and Remix due to their complex package re-exporting schemes.

To solve this issue, we've put the build artifacts of all components into a single package. This change not only accelerates library installation and new release publishing but also ensures compatibility with frameworks that previously faced integration difficulties.

## Package name

To facilitate a smooth transition and maintain backward compatibility, we've introduced this as a new npm package named `intergalactic` , thanks to [Dan Helfman](https://github.com/witten), who graciously agreed to transfer the rights to the package name to us.

The `@semcore/ui` package and individual component packages will continue to be available up-to-date until at least the end of Q2 2024.

## Documentation toggler

<video controls autoplay loop width="100%">
  <source src="./toggler.mp4" type="video/mp4">
</video>

To enhance the documentation experience for those not prepared to switch packages, we have added a toggle in the top navigation bar.

This affects the imports in all code examples.

## Migration

Migrating to intergalactic is designed to be as seamless as possible. To simplify the process, we've published a migration tool that automatically replaces all imports from the `@semcore/*` scope with the correct imports from `intergalactic` .

Migration example:

::: code-group

```sh [pnpm]
pnpm add intergalactic
npx intergalactic-migrate
pnpm remove @semcore/ui

```

```sh [npm]
npm install intergalactic
npx intergalactic-migrate
npm uninstall @semcore/ui
```

:::

We have tested the migration and usage of components through intergalactic on several projects with excellent results. In case if you encounter any issues, please feel free to open an issue on [GitHub](https://github.com/semrush/intergalactic/issues/new/choose).

Publish date: _2024-03-27_.

[View all blog posts](/blog/)
