---
title: Breakpoints
fileSource: breakpoints
tabs: Design('breakpoints'), API('breakpoints-api'), Example('breakpoints-code'), Changelog('breakpoints-changelog')
---

## Adaptivity

Most of Semrush products are designed to work with data on the desktop, so adaptivity isn’t yet required for all products.

::: tip
Most of the core components can be used on the smaller screens. You need to increase their size to the biggest (`L`) for ease of use on touch devices. You can find the examples in the [Example tab](/layout/breakpoints/breakpoints-code).
:::

If you are adding adaptivity to your interface, then use breakpoints described below, but remember to stretch the content in each range, except for really wide screens, where we recommend fixing the maximum content width to 1920px.

## Breakpoints system

Here is a list of the main breakpoints we recommend using in the interfaces:

| Token                  | Default value | Usage                                                |
| ---------------------- | ------------- | ---------------------------------------------------- |
| `screen-extra-small`   | `320px`       | The smallest possible breakpoint for mobile devices. |
| `screen-small`         | `768px`       | The most common breakpoint for tablet devices.       |
| `screen-medium`        | `1200px`      | Our main breakpoint for desktop devices.             |
| `screen-large`         | `1920px`      | Breakpoint for large desktop screens.                |

## Page layout

Use the [Grid component](/layout/grid-system/grid-system-layout) to build a page layout. The component has an adaptive API.

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
              babelrc: false, // if you use .babelrc
              configFile: false, // if you use babel.config.js, doesn't affect babelrc option https://babeljs.io/docs/en/options#configfile
              plugins: ['@semcore/babel-plugin-react-semcore'],
            },
          },
        ],
      },
    ],
  },
};
```

