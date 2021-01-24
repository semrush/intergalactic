# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.2] - 2020-06-05

### Changed

- Поправили отображения флага `Saint Pierre and Miquelon`

## [2.0.1] - 2020-06-04

### Changed

- Поправил выранивание заглавных букв для заглушек флагов

## [2.0.0] - 2020-05-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Заглушка для отсутствующих стран, берутся первые заглавные буквы(максимум 2 символа).

## [1.4.3] - 2020-05-19

### Added

- Добавлен iso2-код для `Saint Pierre and Miquelon`
- Добавлен iso2-код для `North Korea`

## [1.4.2] - 2020-02-19

### Fixed

- Исправлен iso2-код для Saint Vincent And The Grenadines

## [1.4.1] - 2020-02-11

### Fixed

- Исправлено отображение стран с пробелами в названиях для iso2 и iso3

### Added

- Добавлен iso3-код для `Netherlands Antilles`

## [1.4.0] - 2020-02-11

### Fixed

- Имена стран теперь можно передавать, как с пробелами так и без них

### Changed

- Имена стран в объекте `iso2Name` теперь храняться с пробелами

## [1.3.3] - 2020-02-03

### Added

- добавили соответствующий флаг для `Macao`

## [1.3.2] - 2020-02-03

### Added

- добавили iso-код и соответствующий флаг для `United States Minor Outlying Islands`

## [1.3.1] - 2020-02-03

### Fixed

- перезаллили файлы для флагов

## [1.3.0] - 2020-02-03

### Added

- добавили iso-код и соответствующий флаг для `British Indian Ocean Territory`
- добавили iso-код и соответствующий флаг для `British Virgin Islands`
- добавили iso-код и соответствующий флаг для `Bonaire, Sint Eustatius and Saba`
- добавили iso-код и соответствующий флаг для `Bouvet Island`
- добавили iso-код и соответствующий флаг для `Cocos Islands`
- добавили iso-код и соответствующий флаг для `Republic of the Congo`
- добавили iso-код и соответствующий флаг для `Curacao`
- добавили iso-код и соответствующий флаг для `French Guiana`
- добавили iso-код и соответствующий флаг для `Guadeloupe`
- добавили iso-код и соответствующий флаг для `Heard Island and McDonald Islands`
- добавили iso-код и соответствующий флаг для `Kosovo`
- добавили iso-код и соответствующий флаг для `SintMaarten`
- добавили iso-код и соответствующий флаг для `South Sudan`
- добавили iso-код и соответствующий флаг для `Svalbard and Jan Mayen`
- добавили iso-код и соответствующий флаг для `United States Virgin Islands`

## [1.2.1] - 2019-12-13

### Fixed

- Исправлена проблема с отображением флагов

## [1.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.1.0] - 2019-12-12

### Added

- Добавлен флаг Reunion

### Changed

- Изменился способ доставки спрайтов, теперь они берутся как png, а не base64

## [1.0.4] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.2] - 2019-09-27

### Fixed

- Уменьшен размер сборки засчет `require('./package.json')`

## [1.0.1] - 2019-06-07

### Added

- импорт стран в формате `iso2 -> name` (`iso2Name`), `iso3 -> iso2` (`iso3iso2`)

## [1.0.0] - 2019-04-05

### Added

- Initial release
