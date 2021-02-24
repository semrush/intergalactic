# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.8.1] - 2021-02-24

### Changed

- Update icons `SEMrush, TwitterSemrush, FacebookSemrush, LinkedInSemrush`.

## [2.8.0] - 2021-02-11

### Added

- Added new icon `VideoStop`.

## [2.7.0] - 2021-01-20

### Added

- Added new color icon `Github`.

## [2.6.0] - 2020-12-23

### Added

- Added new icon `GoogleAnalytics4` for 4 version.

## [2.5.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.4.0] - 2020-10-30

### Added

- Added new icon `GlobeAlt`.

## [2.3.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.3.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [2.3.0] - 2020-10-12

### Added

- Added new icon `color/WhatsApp`.

## [2.2.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.2.0] - 2020-07-24

### Added

- Добавили свойство `flex-shrink` для икон по умолчанию, для корректного отображения во флекс-боксах.

## [2.1.1] - 2020-06-22

### Fixed

- Изменились иконки `FeaturedImage`, `FeaturedVideo`

## [2.1.0] - 2020-06-10

### Added

- Добавили новые иконки `SERP Features`, `Figma`, `GoogleColor, GoogleGSC`

## [2.0.3] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.2] - 2020-06-09

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавили иконки `FacebookMessenger, GenderFemale, GenderMale, YouTubeRed`

### Changed

- Изменили цвет иконки по наведению, с 8% на 12%
- Обновили иконки семейства `YouTube` во всех размерах

## [1.5.5] - 2020-02-25

### Added

- Иконка `GoogleDoc` в размерах `xs`, `s`, `m`
- Иконка `CalendarCheck` в размерах `m`, `s`, `xs`
- Иконка `ListBullet` в размере `xxs`
- Иконка `Slack` в размерах `xs`, `s`, `m`
- Иконка `WordPress` в размерах `xs`, `s`, `m`

### Changed

- Исправлен размер иконки `MathMinusAlt` в размере `s`
- Исправлен размер иконки `MathPlusAlt` в размере `s`

## [1.5.4] - 2020-01-22

### Fixed

- Добавлен `viewBox` иконкам `Filter`, `Funnel`, `SmileSimple`

## [1.5.3] - 2019-12-23

### Fixed

- Исправлен цвет иконок `Filter`, `Funnel`
- Добавлен `viewBox` иконкам `GoogleDataStudio`, `Briefcase`, `Hotel`

## [1.5.1] - 2019-12-17

### Added

- Добавлены иконки `GoogleDataStudio` в размерах `xs`, `s`, `m`
- Добавлены иконки `Briefcase` в размерах `xs`, `s`, `m`
- Добавлены иконки `Filter` в размерах `xs`, `s`, `m`
- Добавлены иконки `Funnel` в размерах `xs`, `s`, `m`
- Добавлены иконки `Hotel` в размерах `xs`, `s`, `m`
- Добавлены иконки `SmileSimple` в размерах `xs`, `s`, `m`

## [1.5.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.4.5] - 2019-11-25

### Fixed

- Перезаллили `production` сборку с хэш именами классов

## [1.4.4] - 2019-11-14

### Fixed

- Исправили иконку `ListCheckAlt`

## [1.4.3] - 2019-11-13

### Added

- Добавлены иконки `Bacs, Maestro, V Pay, Direct Credit`

## [1.4.2] - 2019-10-24

### Fixed

- Исправлены хэш стилей от версии компонента

## [1.4.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.4.0] - 2019-08-02

### Added

- Добавлена иконка `Airplane`

### Fixed

- Исправлена сборка для SSR

## [1.3.4] - 2019-07-31

### Fixed

- Уменьшен размер сборки

## [1.3.3] - 2019-07-17

### Added

- Описание типов для иконок

### Fixed

- Тип иконки-родителя исправлен с `React.HTMLAttributes<SVGElement>` на `React.SVGAttributes<SVGElement>`

## [1.3.2] - 2019-05-07

### Added

- Добавлена иконка `CreditCard`
- Добавлена иконка `AdobeAnalytics` в размерах `xs`, `s`, `m`

## [1.3.1] - 2019-03-25

### Added

- Добавлена иконка `TimeDay` в размерах `xs`, `s`, `m`
- Добавлена иконка `TimeNight` в размерах `xs`, `s`, `m`

## [1.3.0] - 2019-02-18

### Added

- Добавлена зависимость от `paint`(появилась возможность задавать отступы и цвета)

## [1.2.4] - 2019-02-14

### Changed

- Иконку `CurrencyUsd`

## [1.2.3] - 2019-01-31

### Added

- Иконки `ActionStop`, `CurrencyUsd`

## [1.2.2] - 2019-01-18

### Changed

- Добавленно свойство css `box-sizing: content-box;` для исправления проблем с паддингом в некоторых браузерах

## [1.2.1] - 2018-11-27

### Fixed

- Убран хук на postinstall

## [1.2.0] - 2018-11-27

### Added

- Иконки color `Outlook`, `Yahoo`, `GoogleMail`, `Office365`, `MicrosoftExchange`
- Autocomplete для IDE (компонент Icon)

## [1.1.3] - 2018-10-05

### Fixed

- добавлен viewBox для иконок `Expand` размера `m`, `s`, `xs`

## [1.1.2] - 2018-10-05

### Added

- размер `s`,`xs` для `Expand` иконки

## [1.1.1] - 2018-09-14

### Fixed

- переименовали иконку Lighning в Lightning

### Added

- data атрибуты name и group

## [1.1.0] - 2018-09-10

### Fixed

- Цвет иконок MathMinusS & MathMinusXS изменен с голубого на черный
- Развернута иконка ActionReply
- Добавлены charts к иконке DesktopChartXS
- Иконки SortAsc (S, XS, XXS) переименованы в SortDesc
- Иконки SortDesc (S, XS, XXS) переименованы в SortAsc

## [1.0.1] - 2018-09-06

### Added

- иконки типа `pay`
- цветные иконки `color`
- разновидности иконок социальных сетей `external`

## [1.0.0] - 2018-08-08

### Added

- Добавленна поддержка зависимости от React15

### Changed

- Обновлена зависимость от utils

## [1.0.0-2] - 2018-07-06

### Added

- Инкапсуляция стилей

## [1.0.0-1] - 2018-06-28

### Added

- Initial release
