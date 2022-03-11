---
title: Breakpoints
fileSource: utils
tabName: Design
---

@## Adaptivity

Most of our products are designed to work with data on the desktop, so adaptivity is not yet required for all tools.

> Most of the core components can be used on the adaptive interface. You need to increase their size to the biggest (XL) for ease of use on touch devices. You can see the examples in the [Code tab](/layout/breakpoints/breakpoints-code/).

If you are adding the adaptivity to your interface, then use the breakpoints (described below), but remember to stretch the layout in each range (except for wide screens, where we usually fix the maximum content width).

Use also [Grid component](/layout/grid-system/) to build the page grid. The component has an adaptive API.
The adaptivity (css with media-queries) of components can be enabled by adding our [babel-plugin-react-semcore plugin](https://github.com/semrush/intergalactic/blob/master/tools/babel-plugin-react-semcore/README.md) for babel.

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
              plugins: [['@semcore/babel-plugin-react-semcore', { media: true }]],
            },
          },
        ],
      },
    ],
  },
};
```

@## List of breakpoints

A list of the main breakpoints that we recommend to use in our product interfaces:

| Variable               | Usage                                                |
| ---------------------- | ---------------------------------------------------- |
| `--xs-screen: 320px;`  | The smallest possible breakpoint for mobile devices. |
| `--sm-screen: 768px;`  | The most common breakpoint for tablet devices.       |
| `--md-screen: 1200px;` | Our main breakpoint for desktop devices.             |

For more information about grid and page layouts see [Grid system](/layout/grid-system/).

@page breakpoints-api
@page breakpoints-code
