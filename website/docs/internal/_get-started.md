---
title: Get started
---

@## Use in your project

Use **npm** for installation to reduce the number of dependencies and the bundle size. For more details, see the [production-build guide](/internal/production/).

Each component is a separate package. To use it, you need to run the command:

```bash
npm install @semcore/<Имя компонента>
```

Styles are supplied inside javascript by default. They will be added to the head tag when the component is imported into the project. Don't use this method in production-build, separate js and css into different files. For more details, see the [production-build guide](/internal/production/).

@## Adaptivity

Our interfaces are desktop first, so adaptability is still optional.

Most of the core components are adaptive. They increase their size for ease of use on touch-appliances. Complex components can change their behaviors and appearance on small screens.

**Component adaptability is enabled for screens smaller than 768px**.

Use also [Grid](/layout/grid-system/) to build the page grid. The component has an adaptive API.
The adaptivity (css with media-queries) of components can be enabled by adding our [babel-plugin-semcore plugin](https://github.com/semrush/intergalactic/blob/master/tools/babel-plugin-semcore/README.md) for babel.

This is how your **webpack.config.js** might look like:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /\/node_modules\/@semcore\//,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false, // is u use .babelrc
              configFile: false, // if u use babel.config.js, doesnt affect babelrc option https://babeljs.io/docs/en/options#configfile
              plugins: [['@semcore/babel-plugin-semcore', { media: true }]],
            },
          },
        ],
      },
    ],
  },
};
```
