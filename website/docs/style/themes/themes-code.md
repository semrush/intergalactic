---
title: Code
---

All our components are already styled for Semrush tools, but if your tool uses a different color palette or you need to style the components differently, then you can influence the appearance of `@semcore` components with:

- babel-plugin
- styles composition

@## Babel-plugin (local theme)

### Step one

You have installed our `component` and our plugin `@semcore/babel-plugin-react-semcore` to properly transpile the code.

> ⚠️ **Attention**. Make sure that you don't process our files with `babel`-plugins in your code, otherwise the result is unpredictable 🤕

```bash
npm i @semcore/button @semcore/babel-plugin-react-semcore
```

### Step two

Create a directory for themed components.

Themes are very much tied to naming and file structure, which adds several restrictions.

- The directory with the theme must contain directories with component names without the `@semcore` prefix.
- Directories with names of components should contain only `.shadow.css` files.
- The names of `.shadow.css` files must match the names of the stylesheets of the corresponding components.

An example of a correct file structure:

```javascript
    components <-- theme root directory
    |── button
    |   └-- button.shadow.css
    |── product-head
    |   └-- product-head.shadow.css
    └── link
        └-- link.shadow.css
```

### Step three

Add a new rule to your `webpack-config`:

```javascript
    {
      test: /\.js$/,
      include: /\/node_modules\/@semcore\//,
      enforce: 'pre',
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@semcore/babel-plugin-react-semcore', { theme: path.resolve(process.cwd(), 'directory-with-theme') }],
            ],
          },
        },
      ],
    }
```

After that, all the styles that will be created in your themed styles directory will be applied to the corresponding components.

> 👯‍ **Congratulations, you've changed the styles of the component!**

### Note

Also for local development of "themes" you'll need HMR. It won't work out of the box, as themes are applied in build time and watchers don't see the changes.
To start working with themes, you need:

- add our `@semcore/shadow-loader` to webpack-config
- add loaders for `.css` files

Example rules for webpack:

```javascript
   {
     test: /\.js$/,
     include: /\/node_modules\/@semcore\//,
     use: {
       loader: '@semcore/shadow-loader',
     },
   },
   {
     test: /\.css$/,
     include: /\/node_modules\/\.cache\//,
     use: ['style-loader', 'css-loader'],
   }
```

@## Style composition

### Step one

You've installed our `component` and our plugin `@semcore/babel-plugin-shadow` to properly transpile the code.

> ⚠️ **Attention**. Make sure that you do not process our files with `babel` plugins in your code, otherwise the result is unpredictable 🤕

```bash
npm i @semcore/button @semcore/babel-plugin-shadow
```

### Step two

You wrote your own styles for our components using one of the following methods:

- css-in-js

```jsx
import { css } from '@semcore/core';
const styles = css`
  SWhatever {
    some-styles: 'Cool' !important;
  }
`;
```

- good old CSS

```jsx
import styles from './custom.shadow.css';
```

> ⚠️ The extension `.shadow.css` is required

### Step three

Pass the new styles to the `styles` property of our component:

```jsx
import Button from '@semcore/Button';
export default (props) => <Button styles={styles} {...props} />;
```

> 👯‍ **Congratulations, you've changed the styles of the component!**

### Note

**Rules for writing styles**

Look at the source of styles in GitHub, styles are written in the same format.

- You do not write styles with the `.button` classes, you use the tag names `SButton`.
- By convention, all of our styled tags are capitalized `S + ComponentName`.
- If you need to access the properties of a component, then use `SButton[keybordFocus]` or properties with the value `SButton[size="m"]`.
- If you need properties `:hover` and others, then they are available as usual `SButton:hover`.

@example sellerly
