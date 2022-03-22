---
title: Global theme
---

All our components include Semrush styles. However, if your tool uses a different color palette or you need to style the components differently, you may want to change the default Semrush styles. This page contains instructions on how to do that using the React Semcore plugin for Babel.

> ### Redesign 🎨
>
> We have created a new theme for the Semrush redesign—`@semcore/theme-redesign`.
>
> For correct changes in styles, use release [[10.0.0] - 2021-12-10](https://i.semrush.com/internal/release/release-changelog/) and above, or update the components to the latest versions. Otherwise, theme styles will apply incorrectly.

@## Step one

Install the component you want to restyle and our React Semcore plugin. They're needed to properly transpile the code. To install the plugin, use the following command:

```bash
npm i @semcore/babel-plugin-react-semcore
```

> ⚠️ **Attention**. Don't process our files with Babel plugins in your code. This may lead to unpredictable results 🤕

@## Step two

Create a directory for themed components taking into account the following restrictions. They're needed because themes are very much tied to naming and file structure.

- The directory with the theme must contain directories with component names without the `@semcore` prefix.
- Directories with component names should contain only `.shadow.css` files.
- The names of `.shadow.css` files must match the names of the corresponding components' stylesheets.

In the following example, a directory contains three components:

```javascript
    components <-- theme root directory
    |── button
    |   └-- button.shadow.css
    |── product-head
    |   └-- product-head.shadow.css
    └── link
        └-- link.shadow.css
```

@## Step three

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

> You can also use the name of the package with themes, for example `{ theme: "my-theme-npm-package" }`

After that, all the styles created in your theme style directory will be applied to the corresponding components.

👯‍ **Congratulations, you've changed the styles of the components!**

@## Versioning

> Versioning is optional, but recommended for your own safety.

You can design a theme for different component versions. To do this, create a `versions.json` file and specify the versions and paths to the `.css` files.

An example of file structure:

```javascript
    components <-- theme root directory
    |── button
        └-- button_v2.shadow.css
        └-- button_v3.shadow.css
        └-- versions.json
```

An example of the `versions.json` file :

```json
{
  "2": {
    "button.shadow.css": "button_v2.shadow.css"
  },
  "3": {
    "button.shadow.css": "button_v3.shadow.css"
  }
}
```

> Versions follow the [SemVer](https://semver.org/) format, you can also specify `*`.

@## Note

To develop themes locally, you need hot module replacement. It won't work out of the box because themes are applied during the build process and watchers can't see the changes. To fix that:

1. Add  `@semcore/shadow-loader` to the webpack configuration.
2. Add loaders for `.css` files

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