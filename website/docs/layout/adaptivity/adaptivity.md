---
title: Adaptivity
fileSource: utils
tabName: Design
---

@## Description

Most of Semrush products are designed to work with data on the desktop, so adaptivity is not yet required for all products.

> Most of the core components can be used on the smaller screens. You need to increase their size to the biggest (`L`) for ease of use on touch devices. You can find the examples in the [Code tab](/layout/adaptivity/adaptivity-code/).

If you are adding adaptivity to your interface, then use the breakpoints described below, but remember to stretch the content in each range, except for really wide screens, where we recommend fixing the maximum content width to 1920px.

@## Page layout

Use [Grid component](/layout/grid-system/) to build a page layout. The component has an adaptive API.

The adaptivity (css with media-queries) of components can be enabled by adding our [babel-plugin-react-semcore plugin](https://github.com/semrush/intergalactic/blob/master/tools/babel-plugin-react-semcore/README.md).

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
              plugins: ['@semcore/babel-plugin-react-semcore'],
            },
          },
        ],
      },
    ],
  },
};
```

@page adaptivity-api
@page adaptivity-code
