---
title: CSS Injection
tabs: CSS Injection('css-injection'), Local CSS Injection('css-injection-local'), Global CSS Injection('css-injection-global')
---

::: danger
:rotating_light: CSS Injection is a deprecated feature and will be removed in the next major release planned on Q1 of 2024.
:::

::: warning
:rotating_light: If you are using CSS Injection for theming purpose, consider review [design tokens based theming](/style/design-tokens/design-tokens#themes).
:::

All our components use default Semrush styles (default theme prefixed with `--intergalactic` in tokens). However, if your product uses a different color palette or you need to style the components differently, you may want to change the default Semrush styles. This page contains instructions on how to do that using the React Semcore plugin for Babel.

## Step one

Install the component you want to restyle and our React Semcore plugin. They're needed to properly transpile the code. To install the plugin, use the following command:

```bash
npm i @semcore/babel-plugin-react-semcore
```

::: warning
:warning: **Attention**. Don't process our files with Babel plugins in your code. This may lead to unpredictable results 🤕
:::

## Step two

Create a directory for components with injected CSS taking into account the following restrictions. They're needed because CSS injection are very much tied to naming and file structure.

* The directory with the CSS injection must contain directories with component names without the `@semcore` prefix.
* Directories with component names should contain only `.shadow.css` files.
* The names of `.shadow.css` files must match the names of the corresponding components' stylesheets.

In the following example, a directory contains three components:

```javascript
    components < --CSS injection root directory | ──button | └--button.shadow.css | ──product - head | └--product - head.shadow.css└── link└--link.shadow.css
```

## Step three

Add a new rule to your `webpack-config` :

```javascript
    {
        test: /\.js$/,
        include: /\/node_modules\/@semcore\//,
        enforce: 'pre',
        use: [{
            loader: 'babel-loader',
            options: {
                plugins: [
                    ['@semcore/babel-plugin-react-semcore', {
                        theme: path.resolve(process.cwd(), 'directory-with-injection')
                    }],
                ],
            },
        }, ],
    }
```

::: tip
You can also use the name of the package with CSS injections, for example `{ theme: "my-css injection-npm-package" }` .
:::

After that, all the styles created in your CSS injection style directory will be applied to the corresponding components.

👯‍ **Congratulations, you've changed the styles of the components!**

## Versioning

::: tip
Versioning is optional, but recommended for your own comfort.
:::

You can design a CSS injection for different component versions. To do this, create a `versions.json` file and specify the versions and paths to the `.css` files.

An example of file structure:

```javascript
    components < --CSS injection root directory | ──button└--button_v2.shadow.css└--button_v3.shadow.css└--versions.json
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

::: tip
Versions follow the [SemVer](https://semver.org/) format, you can also specify `*` .
:::

## Note

To develop CSS injections locally, you need hot module replacement. It won't work out of the box because CSS injections are applied during the build process and watchers can't see the changes. To fix that:

1. Add `@semcore/shadow-loader` to the webpack configuration.
2. Add loaders for `.css` files

Example rules for webpack:

```javascript
   {
       test: /\.js$/,
       include: /\/node_modules\/@semcore\//,
       use: {
           loader: '@semcore/shadow-loader',
       },
   }, {
       test: /\.css$/,
       include: /\/node_modules\/\.cache\//,
       use: ['style-loader', 'css-loader'],
   }
```
