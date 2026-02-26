# @semcore/stylelint-plugin

[![version](https://img.shields.io/npm/v/@semcore/stylelint-plugin.svg)](https://www.npmjs.com/@semcore/stylelint-plugin)
[![downloads](https://img.shields.io/npm/dt/@semcore/stylelint-plugin.svg)](https://www.npmjs.com/package/@semcore/stylelint-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/semrush/intergalactic/blob/HEAD/LICENSE)

> This component is part of the Intergalactic Design System

### 📖 [Component documentation](https://developer.semrush.com/intergalactic/style/design-tokens/design-tokens#stylelint-plugin)

### 🏠 [Design system](https://developer.semrush.com/intergalactic/)

The stylelint plugin help developers avoid mistakes in design token names.

## Install

```sh
npm install @semcore
```

## Usage

```json
// .stylelintrc.json
{
  "extends": ["stylelint-config-standard"],
  "plugins": ["@semcore/stylelint-plugin"],
  "rules": {
		"intergalactic/design-tokens": true
	}
}
```

### Available options

- `include` - adds custom design tokens to the list of allowed tokens.
- `exclude` - removes design tokens from the list of allowed tokens.
- `tokensSource` - path to the file with design tokens. Default is `node_modules/@semcore/core/lib/theme/themes/default.mjs`.
- `tokensPrefix` - design tokens (default is `--intergalactic-`). Only CSS variables with this prefix are considered as design tokens.

## 👤 Author

[UI-kit team](https://github.com/semrush/intergalactic/blob/HEAD/MAINTAINERS) and [others ❤️](https://github.com/semrush/intergalactic/graphs/contributors)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/semrush/intergalactic/issues). You can also take a look at the [contributing guide](https://github.com/semrush/intergalactic/blob/HEAD/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/semrush/intergalactic/blob/HEAD/LICENSE) licensed.
