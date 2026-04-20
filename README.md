<h2 align="center">
  <img src=".github/images/intergalactic-hero.png" alt="Intergalactic Design System">
</h2>

[![codecov](https://codecov.io/gh/semrush/intergalactic/branch/master/graph/badge.svg?token=OILALW3YQE)](https://codecov.io/gh/semrush/intergalactic)
[![version](https://img.shields.io/npm/v/@semcore/ui.svg)](https://www.npmjs.com/package/@semcore/ui)
[![downloads](https://img.shields.io/npm/dt/@semcore/ui.svg)](https://www.npmjs.com/package/@semcore/ui)

Intergalactic is a constantly developing design system of [React](https://reactjs.org/) components, guidelines and UX patterns for building interfaces. You can explore components in our [documentation website](https://i.semrush.com).

---

### Features ✨

- 70+ components for your design (you can also find them in the [Figma Community](https://www.figma.com/@semrush))
- High-quality React components out of the box
- Written in TypeScript with predictable static types
- Whole package of design resources and development tools
- Powerful collection of charts
- Theme customization in every detail (find details in the [Design tokens guide](https://developer.semrush.com/intergalactic/style/design-tokens/))


### Browser support

- Google Chrome
- Safari (two last versions)
- Mozilla Firefox
- Microsoft Edge
- Opera

---

### Installation

```sh
pnpm add @semcore/ui --shamefully-hoist
```
or
```sh
npm install @semcore/ui
```

After the installation, all components will be available at `@semcore/ui/{{component_name}}`.

### Testing

The project uses a comprehensive testing setup with multiple testing frameworks and tools:

#### Testing tools

- **Vitest** - Unit and component tests
- **Playwright** - Browser automation and E2E tests
- **React Testing Library** - Component testing utilities
- **Axe** - Accessibility testing
- **@guidepup** - Screen reader testing (NVDA)

#### Running tests

Docker ensures consistent rendering for image snapshot tests across different environments.

```sh
# Build Docker image (first time or after dependency changes)
pnpm test:setup

# Run all unit tests
pnpm test

# Run unit tests for a specific component
pnpm test button

# Run browser tests in Docker
pnpm browser-test:docker

# Run browser tests in Docker for a specific component
pnpm browser-test:docker button

# Run accessibility tests
pnpm axe-test

# Run NVDA tests (Windows only, requires setup)
pnpm nvda-test:setup   # first time
pnpm nvda-test
```

#### Configuration and setup

Test configurations are located in the project root:
- `vitest.config.mts` - Vitest configuration for unit tests
- `playwright.*.config.ts` - Various Playwright configurations for different test types

Testing utilities and shared test helpers are located in `./tools/testing-utils/`:
- `setupTests.ts` - Global test setup with custom matchers and mocks
- `vitest.ts` - Extended Vitest test runner with Allure integration
- `playwright.ts` - Extended Playwright test runner with accessibility helpers
- `testing-library.ts` - Re-exports React Testing Library utilities

#### Mocks and utilities

The testing setup includes:
- `ResizeObserver` mock for components using resize detection
- `matchMedia` mock for responsive components
- `SVGElement.getBBox` mock for SVG-based components
- Custom matchers from `@testing-library/jest-dom`: `toHaveStyle`, `toHaveFocus`, `toHaveAttribute`, `toBeInTheDocument`

Tests are located in `__tests__` directories within each component package, for example: `semcore/button/__tests__/`.

### How to contribute to the project

[Learn more about contributing ›](https://github.com/semrush/intergalactic/blob/HEAD/CONTRIBUTING.md)

#### Contributors

Thanks to all contributors, you are so awesome! ❤️

- [Roman Lysov](https://github.com/lsroman)
- [Michael Sereniti](https://github.com/msereniti)
- [Julia Mnizhek](https://github.com/j-mnizhek)
- [Sheila Sheikh](https://github.com/sheila-semrush)
- [Ilia Brauer](https://github.com/ilyabrower)
- [Elena Krasnopolskaia](https://github.com/ekrasnopolskaia)
- [Ruslan Gaiazov](https://github.com/freeyoungstrong)
- [Elena Khaas](https://github.com/elenakhaas)
- [Tatana Iliukhina](https://github.com/tatana-I)
- and many others from Semrush team

#### I found a bug! 🕵️‍

Great job!

You always can open an [issue in the repository](https://github.com/semrush/intergalactic/issues/new/choose). We'll be glad to help!

#### I have a question or feature request! 🙋

You can also open an [issue](https://github.com/semrush/intergalactic/issues/new/choose). We will review it soon!
