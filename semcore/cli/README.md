## Intall package cli in your project

```bash
npm i -D @semcore/cli
```

**_If package install global that should set NODE_PATH_**
**Example: NODE_PATH=~/.nvm/versions/node/v16.14.0/lib/node_modules**

## Create component

```bash
semcore component
```

Accepts parameters:

- name - component name
- destination - component package name

## Build component

```bash
semcore build
```

Accepts parameters:

- component - component name
- destination - component package name
- source - file type (js, ts)

> you can pass additional parameters that will receive
> [@babel/cli](https://babeljs.io/docs/en/babel-cli)

```bash
semcore build --component button --destination components --source js --presets ...
```

## Run lint component

```bash
semcore lint
```

Accepts parameters:

- destination - component package name

> You will receive two files `tsconfig.json`, `tsconfig.dts.json` in the root of your project, which you can correct at your discretion.

## Run test component

```bash
semcore test
```

Accepts parameters:

- component - component name
- destination - component package name

> you can pass additional parameters that will receive [jest/cli](https://jestjs.io/docs/cli)

```bash
semcore test --component button --destination components  --watch
```

## Publish component

```bash
semcore publish
```

Accepts parameters:

- destination - component package name

> you can pass additional parameters that will receive [@semcore/super-publisher](https://www.npmjs.com/package/@semcore/super-publisher)

## Options

### Added path to file .env

```bash
[any command above] --dotenv pathToEnv
```
