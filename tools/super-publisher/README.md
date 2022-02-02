# super-publisher

Цель этого пакеты предоставить возможность делать интерактивную публикацию пакетов в монорепозетории.

## Как использовать?

### Установка

`npm i super-publisher -D`

### Использование

`super-publisher`

### Конфигурация

`.publisher`

```js
const chosePackages = require('super-publisher/tasks/chosePackages');
const lint = require('super-publisher/tasks/prettier');
const test = require('super-publisher/tasks/jest');
const showGitDiff = require('super-publisher/tasks/showGitDiff');
const choseNextVersion = require('super-publisher/tasks/choseNextVersion');
const npmVersion = require('super-publisher/tasks/npmVersion');
const gitCommit = require('super-publisher/tasks/gitCommit');
const gitPush = require('super-publisher/tasks/gitPush');
const npmPublish = require('super-publisher/tasks/npmPublish');

module.export = async (args) => {
  const cwd = await chosePackages(args.root);
  await lint(cwd);
  await test({ rootDir: cwd });
  await showGitDiff();
  const nextNameNpmVersion = await choseNextVersion(glob.sync('package.json', { cwd })[0]);
  const nextNpmVersion = await npmVersion(nextNameNpmVersion);
  await gitCommit(nextNpmVersion);
  await gitPush();
  await npmPublish(cwd);
};
```

## Что делает текущая конфигурация publisher?

0. Выводит интерактивную консоль с выбором пакетов (chosePackages)
1. Проверяет стаилгайд (lint)
2. Запускает тесты (test)
3. Показыват git-diff (showGitDiff)
4. Предлагает выбор версии (choseNextVersion)
5. Обновляет package.json (npmVersion)
6. Делает commit (gitCommit)
7. Делает push (gitPush)
8. Публикует версию (npmPublish)

## Система расширений

Для каждого репозетория нам может понадобиться свой набор шагов, по этому мы сделали систему задач расширяемой.

- Задача это просто функция, которая делает какое-то полезное действие.
- Задача может конфигурироваться.
- Задачи асинхронны.
- У задачи обязательно должно быть имя.
- Конкуренция между задачами решается очередностью их подключения.

Давайте рассмотрим пример расширения выбора версии(choseNextVersion)

```js
const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs-extra');

const task = require('super-publisher/task');
const { generateVersionPackage } = require('./utils');

module.export = (pkgPath) =>
  task('choseNextVersion', async (opt) => {
    const value = await inquirer.prompt([
      {
        type: 'list',
        name: 'version',
        message: 'Select the version component:',
        choices: generateVersionPackage(fs.readJSON(pkgPath).version),
      },
    ]);
    if (!value.version.length) {
      throw new Error('No selected version component');
    }
    return value.version[0];
  });
```

У плагина есть один аргумент - объект с данными, его можно модифицировать(он сквозной на все задачи),
так же можно вернуть из функции значение.

В объекте с данными есть полезные свойства:
`logMessage`- выводит сообщение в консоль, привязанное к текушей задачи.
