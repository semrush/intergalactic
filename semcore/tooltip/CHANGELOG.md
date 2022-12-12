# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [5.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [5.2.0] - 2022-11-30

### Changed

- Updated border-color for `warning` theme from `--red-400` to `--red-500`.

## [5.1.5] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.41.0], `@semcore/flex-box` [4.6.3 ~> 4.6.4], `@semcore/popper` [4.13.4 ~> 4.13.5]).

## [5.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [5.0.16] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.11.31 ~> 4.12.0]).

## [5.0.13] - 2022-08-30

### Added

- Added `aria-live` attribute for better a11y.

## [5.0.12] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/flex-box` [4.5.10 ~> 4.5.11], `@semcore/popper` [4.11.28 ~> 4.11.29]).

## [5.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Removed ability to pass custom color to "theme" property.
- Remove named import "Tooltip".

## [4.3.5] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1], `@semcore/popper` [4.11.16 ~> 4.11.17]).

## [4.3.4] - 2022-02-24

### Added

- Added repository field to package.json file.

## [4.3.3] - 2022-01-25

### Changed

- Replaced function `findComponent` to `isAdvanceMode` for check children in `Tooltip`.

## [4.3.2] - 2022-01-18

### Changed

- Removed unused dependency `@semcore/icon`.

## [4.3.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [4.3.0] - 2021-05-11

### Changed

- Rewrite code from TS to JS 🧑‍💻

## [4.2.0] - 2021-04-30

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [4.1.1] - 2021-04-28

### Added

- Added role `tooltip`

## [4.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [4.0.9] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [4.0.8] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [4.0.7] - 2020-09-30

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [4.0.6] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [4.0.5] - 2020-07-06

### Changed

- Обновлена зависимость `@semcore/popper` для корректного отображения "галочки" `Tooltip`'а

## [4.0.4] - 2020-06-10

### Fixed

- Исправлены TS типы

## [4.0.3] - 2020-06-08

### Fixed

- Исправлена типизация `ITooltipContext`

## [4.0.2] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [3.4.3] - 2019-12-26

### Fixed

- Получение DOM-ноды через `ref` для всех компоненетов

## [3.4.2] - 2019-12-20

### Fixed

- Добавлен `font-weight: normal`. Теперь `font-weight` не наследуется при отключенном рендере в портал.

## [3.4.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [3.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [3.3.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

### Fixed

- Исправлено перемещение тултипа если он не влизает в нужном месте

## [3.2.1] - 2019-09-31

### Changed

- Обновлена зависимость `Popper`
- Добавлено дефолтное свойство `inline` для обертки триггера

## [3.1.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [3.1.1] - 2019-09-27

### Fixed

- Добавлен `white-space: normal;` для случаев когда у родителя `nowrap`

## [3.1.0] - 2019-09-13

### Added

- Добавлены пользовательские темы для тултипа, теперь в свойство `theme` можно передать свой цвет

## [3.0.5] - 2019-09-05

### Changed

- Заменены устаревшие типографические переменные

## [3.0.4] - 2019-07-31

### Fixed

- Добавлены ts типы `PopperTrigger` для `TooltipBase`
- Исправлена сборка для рендера css на сервере

## [3.0.3] - 2019-06-25

### Fixed

- Поведение на `onOutsideClick` теперь можно отключить, сделав `return false`

## [3.0.2] - 2019-06-25

### Fixed

- Исправлено поведение `onOutsideClick`

### Changed

- Обновлена версия `@semcore/popper`

## [3.0.1] - 2019-06-13

### Fixed

- Исправлены типы TS для `title`,так как `title` является стандартным свойством dom

## [3.0.0] - 2019-06-06

### BREAK

- Изменено поведение `TooltipBase`, теперь он добавляет обертку (div) вокруг trigger'a
- При дефолтном импорте, пользовательские `props` теперь прокидываются на trigger, а не на popper

## [2.2.0] - 2019-05-15

### Added

- Добавлена возможность указывать `theme` у базового тултипа(именованный экспорт)

## [2.1.0] - 2019-05-13

### Added

- Добавлен `line-height` в `Popper`
- `Popper` унаследован от `Box`

## [2.0.2] - 2019-04-16

### Fixed

- Добавлен `max-width: 250px;` и `word-wrap: break-word;`

## [2.0.1] - 2019-04-11

### Fixed

- Добавлен размер текста по умолчанию(12px)
- Скрываем всплывающее окно, если триггер вышел за `viewport`

## [2.0.0] - 2019-01-17

### Added

- `Tooltip.Popper`, свойство `closeIcon`
- `Tooltip.Popper`, свойство `theme`
- Темы `warning`, `invert`
- Добавлен автокомплит для IDE

### Changed

- Фон тултипа изменен на белый
- Текст тултипа изменен на `--gray20`

### Fixed

- Добавлен border-radius для `Tooltip.Popper`

## [1.0.0] - 2018-12-09

### Added

- Initial release
