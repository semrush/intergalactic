# babel-plugin-react-semcorebabel-plugin-react-semcore

Utility for `@semcore` component's styles manipulations.

## Install

pnpm:

```shell
$ pnpm add @semcore/babel-plugin-react-semcore -D
```

## Usage

Webpack:

```javascript
{
    test: /\.js$/,
    include: /\/node_modules\/semcore\//,
    enforce: 'pre',
    use: {
        loader: require.resolve('babel-loader'),
        options: {
            babelrc: false, // optional, include if u use .babelrc
            configFile: false, // optional, include if u use babel.config.js, doesnt affect babelrc option https://babeljs.io/docs/en/options#configfile
            plugins: [['babel-plugin-react-semcore', {
              ...pluginOptions
            }]]
        },
    },
}
```

## Options

| Option   | Type                            | Description                                                                                                                      |
| -------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| theme    | `string` or `string[]`          | This option applies theme to `@semcore` components.                                                                              |
| purgeCSS | `Object` = `{ shorten: false }` | This option forwards options to [css-purge](http://rbtech.github.io/css-purge/) tool, which removes duplicates from built styles |
