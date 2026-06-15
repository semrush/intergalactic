First of all, thank you for your interest in the library. We'd love to accept your fixes and improvements ✨

## Prerequisites

1. Install the latest LTS (min 24) version of [Node.js](https://nodejs.org/en).
2. Install [pnpm](https://pnpm.js.org) globally by running: `npm i -g pnpm@10`.
3. Set up commit signing for your contributions. Follow these steps:
   - [Generate a GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
   - [Add your GPG key to your GitHub account](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account)
   - [Inform Git about your signing key](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key)

Please note that our maintainers primarily develop on macOS. While developing on Linux or Windows is possible, there might be unintended issues. Don't hesitate to [reach out for help](https://github.com/semrush/intergalactic/issues/new/choose) if you encounter any problems.

## Getting started

1. Clone the repository by running: `git clone git@github.com:semrush/intergalactic.git && cd intergalactic`.
2. Install project dependencies using: `pnpm install`.

   2.1 If you have and error with `libpng` like `make sure that libpng is installed` - you need to install it manually. On Mac OS the simplest way is to use homebrew: `brew install libpng pkg-config`.

3. Build components with: `pnpm build`.

## Submitting changes

Follow these steps to submit your changes:

1. Fork the repository.
2. Apply and commit your changes to your fork.
3. Add a note to the appropriate changelog file (for example, `semcore/button/CHANGELOG.md`) for each change. Use the date when the changes were made for the new note.
4. Open a pull request to the main repository.

We appreciate your contributions and will review your pull request as soon as possible. Your efforts make a difference!

## Playground

We use storybook for developing components.
To get started: Run `pnpm storybook` and navigate to `http://localhost:6006` in your browser to access the playground.
All our examples from the documentation are taken from the storybook stories, from the `docs` folder.
Also in the component folders, there are also `test` and `advanced` folders - the names speak for themselves

## Tests

We use [vitest](https://vitest.dev/) for our testing needs.

- To prepare docker images for testing, use the command `pnpm test:setup`.
- To start the test runner, use the command `pnpm test:docker`.
- To execute tests and exit, use `pnpm test:docker run`.
- To update snapshots, use the command `pnpm test:docker -- -u`.
- To run tests for a specific component, use `pnpm test:docker button`.
- To update snapshots for a specific component, use `pnpm test:docker button -- -u`.

## Formatting & linting

We rely on [eslint](https://eslint.org/) for formatting and linting. It is integrated into our Git hooks and also offers a plugins for VSCode and Webstorm.

## Website

To preview the website locally, run `pnpm website`. The site will be accessible at `http://localhost:5173/intergalactic/`. Keep in mind that you may need to reload the page to see any changes made to the documentation.

## Screen reader tests

We use automated NVDA tests to check screen reader support on Windows. To prepare the environment for the first run, use `pnpm nvda-test:setup`. After setup, run the tests with `pnpm nvda-test`.

## Caveats

### Prebuilt icons

For rapid rebuilding of the playground and website, we use `esbuild` to efficiently transform components on-the-fly. However, the build process for `icon` and `illustration` components is time-consuming and cannot be performed on-the-fly. Therefore, before running the playground or website, it's essential to pre-build icons and illustrations. You can accomplish this using the command `pnpm build` (or `pnpm build:icons` and `pnpm build:illustration`).

### Text translation

Certain components have text translations in multiple languages. When adding or modifying text, focus on English only. Following the pull request review, core maintainers will handle translations for other languages using [Crowdin](https://crowdin.com).

### Unconventional website code

Our documentation website's foundation has undergone several iterations and may appear unconventional due to underlying changes. Knowing about its imperfections, we are actively working on migrating to [VitePress](https://vitepress.dev/) for a more streamlined development experience.

### Publishing process

Each component is published as a distinct npm package with `@semcore` scope, while a special `@semcore/ui` package re-exports them collectively. The complex publishing process is fully automated through our CI/CD pipeline.

### Default theme

We rely on a [set of design tokens](https://www.figma.com/community/file/1274028958101796491/Semrush---Design-Tokens) to generate CSS variables (refer to `semcore/core/src/theme/themes/default.css`). Although all components use these variables, for users it's not mandatory to declare them at the root level of the page. For proper component display, CSS variables' default theme is always included as a fallback value in the `var` function (for example, `color: var(--intergalactic-text-secondary, #6c6e79);`). After modifying the name of any CSS variable in component styles, running the `pnpm process-theme` command is necessary. This command updates the fallback value in `var` function and is integrated into the pre-commit hook.

### Implicit code transformations

Due to historical reasons, our code goes through specific Babel plugins (`babel-plugin-root` and `babel-plugin-styles`) that result in the final code functioning differently than it may initially appear. Below is a simplified example of the `Link` component's code:

```jsx
import React from "react";
import createComponent, { Component, Root, sstyled } from "@semcore/core";
import { Text } from "@semcore/typography";
import style from "./style/link.shadow.css";

class RootLink extends Component {
  static style = style;

  render() {
    const SLink = Root;
    const { styles, Children } = this.asProps;

    return sstyled(styles)(
      <SLink render={Text} tag="a">
        <Children />
      </SLink>
    );
  }
}

const Link = createComponent(RootLink);

export default Link;
```

After normal jsx to js transformation the following expression are getting returned:

```js
sstyled(styles)(
  React.createElement(
    SLink,
    { render: Text, tag: "a" },
    React.createElement(Children)
  )
);
```

### `babel-plugin-root`

The `babel-plugin-root` plugin ensures that all the props passed to a component are also passed to its root wrapper.

1. The import of the `Root` variable from `@semcore/core` is removed, as this variable is not really exported from the core.
2. The `Root` assignment expression is replaced with the value of the `tag` prop. For instance, `const SLink = Root;` is transformed into `const SLink = 'tag';`.
3. The plugin identifies the component's root wrapper based on the variable assigned in the previous step.
4. An import statement for the `assignProps` function is added, and this function is applied to the props of the root wrapper. The resulting code will look like the following:

```js
sstyled(styles)(
  React.createElement(
    SLink,
    assignProps({ render: Text, tag: "a" }, this.asProps),
    React.createElement(Children)
  )
);
```

The `assignProps` function is responsible for smart props merging:

1. It spreads the props.
2. It merges `refs` and `forwardRef` by encapsulating them within a single ref callback.
3. It spreads the value of the `style` prop.
4. It combines `className` props.
5. It wraps event handlers within a single event handler that sequentially calls each event handler. The sequence stops if any event handler returns `false`. Outer event handlers are invoked first.

While it's not trivial, this mechanism allows users to apply any props to components. For instance, in the `Link` component, we don't need to explicitly pass `href`, `target`, `rel`, or other crucial `Link` props. These are automatically passed using `assignProps`.

While this mechanism has limitations, two escape hatches are available:

1. By adding `__excludeProps={['theme']}`, you can prevent the `theme` prop from being applied to the DOM node.
2. By adding `use:theme={modifiedTheme}`, you can apply a prop that takes precedence during prop assignment.

Long-term plans involve enhancing this mechanism for more flexible prop passing.

### `babel-plugin-styles`

The `babel-plugin-styles` plugin focuses on CSS transformations. For instance, consider the style file `./style/link.shadow.css` for the `Link` component:

```css
SLink {
  display: inline-block;
  font-family: inherit;
  color: var(--intergalactic-text-link, #006dca);

  &[active],
  &:hover,
  &:active {
    color: var(--intergalactic-text-link-hover-active, #044792);

    & SText {
      border-color: currentColor;
    }
  }
  &[enableVisited]:visited,
  &[enableVisited]:visited:hover {
    color: var(--intergalactic-text-link-visited, #8649e1);
  }
}
```

This CSS file uses nesting and contains selectors targeting tag names used within the component code (for example, `SLink`).

Here's how the plugin works:

1. The plugin analyzes both the CSS and JS code of the component, identifying components prefixed with `S`.
2. It creates hashed CSS classes for the `SLink` component and for each attribute used as a selector in the CSS.
3. The plugin modifies the component's JS code to add a `className` like `.SLink-xxx-enableVisited` if the `enableVisited` prop is provided. This happens for each selector.
4. The import statement for the `.shadow.css` file is removed, and the CSS rules from the file are moved to the compiled JS output. These rules operate like CSS-in-JS, and they are incorporated into the page's stylesheets from the JS code.

If users prefer to include CSS in the final bundle in the traditional way, they can follow the instructions provided in this [guide](https://developer.semrush.com/intergalactic/get-started-guide/dev-starter-guide/production-tips).

## Conduct

All code in this repository is under the MIT License. By sending a pull request you agree to the terms of contributing under the [MIT license](https://github.com/semrush/intergalactic/blob/HEAD/LICENSE)
