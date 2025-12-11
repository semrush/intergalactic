# @semcore/css-virtualizer-unplugin

[![version](https://img.shields.io/npm/v/@semcore/i18n-unplugin.svg)](https://www.npmjs.com/@semcore/css-virtualizer-unplugin)
[![downloads](https://img.shields.io/npm/dt/@semcore/i18n-unplugin.svg)](https://www.npmjs.com/package/@semcore/css-virtualizer-unplugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/semrush/intergalactic/blob/master/LICENSE)

> This component is part of the Intergalactic Design System

### 🏠 [Design system](https://developer.semrush.com/intergalactic/)

## Install

```sh
npm install @semcore/css-virtualizer-unplugin
```

## Options

```ts
type Options = {
  prefix?: string; // Defines the prefix for a virtual CSS file. Default is undefined.
}
```

## Usage

### Vite

```js
import { defineConfig } from 'vite';
import { intergalacticCssVirtualizerVitePlugin } from '@semcore/css-virtualizer-unplugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intergalacticCssVirtualizerVitePlugin({
      prefix: 'myprefix' // optional
    }),
  ],
});
```

### Webpack

```js
import { intergalacticCssVirtualizerWebpackPlugin } from '@semcore/css-virtualizer-unplugin';

module.exports = {
  // ...
  plugins: [
    intergalacticCssVirtualizerVitePlugin({
      prefix: 'myprefix' // optional
    }),
  ],
  // ...
};

## 👤 Author

[UI-kit team](https://github.com/semrush/intergalactic/blob/master/MAINTAINERS) and [others ❤️](https://github.com/semrush/intergalactic/graphs/contributors)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/semrush/intergalactic/issues). You can also take a look at the [contributing guide](https://github.com/semrush/intergalactic/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/semrush/intergalactic/blob/master/LICENSE) licensed.
