---
title: Breakpoints
fileSource: breakpoints
tabs: Design('breakpoints'), API('breakpoints-api'), Examples('breakpoints-code'), Changelog('breakpoints-changelog')
---

## Adaptivity

Most of Semrush products are designed to work with data on the desktop, so adaptivity isn’t yet required for all products.

::: tip
Most of the core components can be used on the smaller screens. You need to increase their size to the biggest (`L`) for ease of use on touch devices. You can find the examples in the [Example tab](/layout/breakpoints/breakpoints-code).
:::

If you're adding adaptivity to your interface, then use breakpoints described in the following section.

## Breakpoints system

Here is a list of the main breakpoints we recommend using in the interfaces:

| Token                  | Default value | Usage                                                |
| ---------------------- | ------------- | ---------------------------------------------------- |
| `screen-small`         | `768px`       | Breakpoint for small screens: tablet, mobile.       |
| `screen-medium`        | `1280px`      | Breakpoint for wide screens: desktop, tablet.             |

## Page layout

The adaptivity (css with media-queries) of components can be enabled by adding our [babel-plugin-react-semcore plugin](https://github.com/semrush/intergalactic/blob/HEAD/tools/babel-plugin-react-semcore/README.md).

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

