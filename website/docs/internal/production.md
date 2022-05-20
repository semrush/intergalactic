---
title: For production
---

Here you will find the solutions to the problems you may encounter while using the @semcore library, as well as some tips for optimizing the library in production.

@## ⚠️ СSS extract

> ⚠️ This guide is for updated components using the new style format.

The styles in our library are ready to use and don't require any additional actions. They are applied automatically and added to the head of your application by inserting CSS into JavaScript.

To speed up the load time and decrease TTI (time to interactive), separate JS and CSS. This will reduce the size of the JS files and will allow to load CSS and JavaScript in parallel decreasing the application launch time.

To do that, use the [shadow-loader](https://github.com/semrush/intergalactic/blob/master/tools/shadow-loader/README.md) webpack plugin. It will strip the styles from JavaScript and replace them with `require ("./style.css")` in the component code. This way you will be able to extract the styles into a separate file using [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) or a similar tool.

This is what your `webpack.config.js` might look like:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // ...
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules\/(@semcore|\.cache\/reshadow)/,
        use: '@semcore/shadow-loader',
      },
      {
        test: /\.css$/,
        include: /node_modules\/(@semcore|\.cache\/reshadow)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

@## Style isolation

Classes in styles have a hash of the content and version to avoid collisions. However, this solution doesn't work when there are two components of the same version from two different teams on the same page. In such cases, styles may overlap and apply incorrectly due to issues with the order of the CSS cascade.

To solve this problem, make the classes unique by using a prefix. Since we supply pre-built JavaScript and CSS files, there is no correct way to assign a prefix directly.

The solution that we suggest is to replace the placeholder `_gg_` in the class names by using [string-replace-loader](https://www.npmjs.com/package/string-replace-loader).

Note that the placeholder needs to be replaced in both JS and CSS files. This is what your `webpack.config.js` might look like:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(js|css)$/,
        include: /node_modules\/(@semcore|\.cache\/reshadow)/,
        enforce: 'pre',
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              search: '_gg_',
              replace: '-my-team',
              flags: 'g',
            },
          },
        ],
      },
    ],
  },
};
```

Also note that the configuration of the `rule` parameter in JS files uses `enforce: 'pre'`. Otherwise, obfuscation will change the function names and make it impossible to search and replace CSS classes. Add these rules to your `webpack-config.js` as a separate section, since they should process packages from the @semcore library only.

@## Server-side rendering

There are two ways to implement SSR.

### SSR via sstyled.getStyles function

This method will work for you if you're not using the @semcore/shadow-loader package (see [CSS extract](/internal/production/#a5c869)).

Use the @semcore/core package and the `sstyled.getStyles` function which will return `style` tags with all the necessary styles:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { sstyled } from '@semcore/core';
import App from './App';

const body = ReactDOM.renderToString(<App />);

const html = `
    <html>
        <head>
            {sstyled.getStyles().css}
        </head>
        <body>
            <div id="root">{body}</div>
        </body>
    </html>
`;
```

### SSR via style extract

This method will work for you if you are using the @semcore/shadow-loader package (see [CSS extract](/internal/production/#a5c869)).

If you use `CSS-extract`, it should already be configured. If you don't use it, go to the [CSS extract](/internal/production/#a5c869) section and follow the steps described. Once you've done that, all component styles will be collected in a separate chunk that needs to be included in HTML generated on the server.

### If you use themes

The [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals) package is often used to reduce the size of the generated server bundle. This plugin excludes all modules located in the `node_modules` folder from the bundle, which disables the @semcore library style processing and the application of themes. As a result, you may end up with a server bundle with no theme applied.

This problem is solved by the following configuration for `webpack-node-externals`:

```javascript
{
  externals: [
    webpackNodeExternals({
      modulesFromFile: true,
      whitelist: [/^@semcore/]
    })
  ],
}
```

@## Bundle size reduction 🔪

We often reuse some of our components inside others to avoid duplicating styles and logic. Each component is a separate package, and sometimes different versions of the same components may end up included in a bundle.

Package managers like npm or Yarn are aimed at solving this problem by optimizing the tree of dependencies, making it more flat. Unfortunately, they don't always succeed 🤷‍♂️

When the lock-files have already been created, updating or installing new packages may lead to duplication of components not included in `package.json` and increase the bundle size.

To solve the duplicate problem, you'll need to thoroughly update all components and recalculate the entire dependency tree.

All our packages are collected under the @semcore scope. There are no native tools that would allow to update the entire scope yet, so we recommend that you use the [update-by-scope](https://www.npmjs.com/package/update-by-scope) package.

Check your `package.json` for any critical updates by running the following command:

```bash
npx update-by-scope @semcore
```

> Eliminating duplicates helps reduce the bundle size by **~30%** on average.

Use these commands regularly and monitor the size of your bundle with [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) 👀
