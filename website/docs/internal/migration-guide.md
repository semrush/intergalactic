---
title: Migration guide (RU)
---

@## Что произошло?

Мы сделали критичные изменения, которые затронули все компоненты. Многие компоненты не изменили свой API, но изменилась их внутренняя реализация.

Вот краткий список того, что произошло:

1.  Мы изменили создание компонентов, теперь они создаются через пакет [@semcore/core](https://github.com/semrush/intergalactic/-/tree/master/semcore%2Fcore);
2.  Мы отказались от встроенного CSS in JS;
3.  Мы перевели наши стили на новый синтаксис;
4.  Мы изменили работу с темами;
5.  Мы сделали API более лаконичным 😎

Дальше будет подробный гайд по обновлению компонентов и инфраструктуры.
Мы советуем обновлять все компоненты разом, чтобы уменьшить общий вес сборки.

> Если вы встретились с изменениями, которые тут не описаны, или вы не поняли описания, напишите нам, пожалуйста, и мы попытаемся это исправить 🙏

@## CSS-extract

Ранее для отделения `css` от `js` было необходимо добавить в ваш сборщик наш плагин [@semcore/babel-plugin-react-semcore](https://github.com/semrush/intergalactic/blob/master/tools/babel-plugin-react-semcore/README.md).
В новых версиях мы отказались от babel плагина в пользу `webpack-loader`'a, т.к. это позволяет существенно оптимизировать процесс сборки.

Подробнее о реализации разделения css от js можно узнать в разделе [For production](/internal/production/#a14383).

@## Server side Render

Ранее компоненты нашей библиотеки использовали 2 механизма вставки стилей на страницу.
В новой версии мы отказались от библиотеки для динамических стилей, что решает проблемы с порядком подключения стилей и уменьшает головную боль.

Подробнее о реализации SSR можно узнать в разделе [For production](/internal/production/#a6711a).

@## Themes

Ранее темы разрабатывались командой UI-kit и поставлялись вместе с нашими компонентами, в виде дополнительного `css`-файла.
В новой версии мы отказались от такой модели поставки и решили отдать разработку тем командам, которым они нужны.

@## Common

- Для всех новых компонентов требуется `peer-dependency`, установите его `npm install @semcore/core`.

- Все компоненты теперь возвращают DOM-node, если вы использовали instance компонента, обратитесь к нам.

@### onChange handler

Ранее в наших компонентах handler `onChange` везде выглядел по-разному. Где-то возвращался `value` из внутреннего стейта, где-то `SyntheticEvent`.
В новой версии мы приняли решение унифицировать хэндлер для всех компонентов, теперь он выглядит так:

```typescript
type ChangeEvent = (
  value: ComponentValueType,
  event?: React.SyntheticEvent<unknown>,
) => void | boolean;
```

Первым аргументом возвращается `value`, вторым, если это возможно, `event`.

@### Child components as static method

Практически у каждого нашего компонента есть дочерние компоненты, являющиеся static методом родителя.

```jsx
import Button from '@semcore/ui/button';
export default () => (
  <Button>
    {' '}
    {/* 'Root'-компонент */}
    <Button.Addon>Icon</Button.Addon> {/* 'Child'-компонент */}
    <Button.Text>Text</Button.Text> {/* 'Child'-компонент */}
  </Button>
);
```

В новой версии, вставляя дочерний компонент, вы не сможете переопределять его `render` с помощью рендер-функций.

@### Render-functions

Следующее изменение коснулось рендер-функций.
Ранее в рендер-функции приходили весь контекст компонента, который включал в себя:

- props компонента
- prop-getter функции child-компонентов, возвращающие `props` для корректной работы этого child-компонента
- ф-ции для управления внутренним состоянием компонента

```jsx
<Select>
  {(context) => {
    const {
      size, // св-во 'size' Select'a
      getTriggerProps, // prop-getter функция триггера Select'a
      changeVisible, // ф-ция для изменения видимости выпадашки Select'a
    } = context;
  }}
</Select>
```

Мы немного изменили эту логику вынеся ф-ции управления внутренним состоянием компонента во второй аргумент и назвав их по имени `property`, которым они управляют.

```jsx
<Select>
  {(props, handlers) => {
    const { size } = props;
    const {
      visible, // ф-ция изменения видимости выпадашки Select'a
      value, // ф-ция изменения value Select'a
    } = handlers;
  }}
</Select>
```

## Components

Далее список изменений каждого из обновленных компонентов:

@### Paint

Данный компонент теперь устарел, вместо него используйте функции из утилит от v3.12.0

Пример использования в [Palette](/style/palette/palette-code/).

@### UI

Данный компонент теперь устарел, вместо него используйте `Box`.

@### MenuList

Данный компонент теперь устарел, вместо него используйте `DropdownMenu`.

@### RootRef

Данный компонент теперь устарел, вместо него используйте нативный `ref`.

@### FlexBox

[Version API 4.0](/layout/box-system/box-api/)

```bash
npm i @semcore/flex-box
```

- Свойство `css`, позволяющая делать CSS IN JS с помощью [nano-css](https://github.com/streamich/nano-css) теперь является устаревшим.
  Добавлена частичная обратная совместимость с помощью передачи стилей на нативный style, но конструкции вида `css={':hover': {}'}` не будут работать.
- Убран экспорт по умолчанию, используйте именованный `import {Box, Flex} from "@semcore/flex-box";`.

@### Typography

[Version API 3.0](/style/typography/typography-api/)

```bash
npm i @semcore/typography
```

- Убрали свойство `interactive` с компонента `Text`

@### FormatText

[Version API 2.0](/style/typography/typography-api/#aaa305)

```bash
npm i @semcore/format-text
```

- Изменилась верстка `<li/>`, теперь это не `flex`.

@### Input, InputNumber, InputMask, Radio, Checkbox, Switch

[Input version API 2.0](/components/input/input-api/)

[Input version API 2.0](/components/input-number/input-number-api/)

[Input version API 2.0](/components/input-mask/input-mask-api/)

[Radio version API 4.0](/components/radio/radio-api/)

[Checkbox version API 5.0](/components/checkbox/checkbox-api/)

[Switch version API 3.0](/components/switch/switch-api/)

[Textarea version API 3.0](/components/textarea/textarea-api/)

```bash
npm i @semcore/input @semcore/input-number @semcore/input-mask @semcore/radio
 @semcore/checkbox
 @semcore/switch
```

- Изменились аргументы `onChange`, теперь возвращается `(value, event)`.

@### Pills/TabPanel/TabLine

[Pills version API 3.0](/components/pills/pills-api/)

[TabPanel version API 2.0](/components/tab-panel/tab-panel-api/)

[TabLine version API 2.0](/components/tab-line/tab-line-api/)

```bash
npm i @semcore/pills @semcore/tab-panel @semcore/tab-line
```

- Убрали поддержку свойства `getSelected` для `Pills` и `Pills.Item`
- Убрали поддержку свойства `trigger` для `Pills.Item`

@### Popper

[Version API 4.0](/utils/popper/popper-api/)

```bash
npm i @semcore/popper
```

- Поднята версия popperJS с v1 до v2.
- У свойство `modifiers` изменилось API согласно Popper v2.
- Функция `getTriggerProps/getPopperProps` доступны только на рутовом `Popper`, теперь `Trigger/Popper` определяются через `tag`.
- ObserveResize триггера и поппера пока не доступно(

@### Tooltip

[Version API 4.0](/components/tooltip/tooltip-api/)

```bash
npm i @semcore/tooltip
```

- Свойство `closeIcon` удалено, реализация крестика теперь будет за разработчиками.

@### DropdownMenu

[Version API 2.0](/components/dropdown-menu/dropdown-menu-api/)

```bash
npm i @semcore/dropdown-menu
```

- Компоненты `Menu` и `List` поменялись местами 🤷‍♂️.

@### Select

[Version API 2.0](/components/select/select-api/)

```bash
npm i @semcore/select
```

- Убран именованный экспорт `{ Trigger }`. Его можно достать из `import { ButtonTrigger } from "@semcore/base-trigger"`

@### ScrollArea

[Version API 3.0](/components/scroll-area/scroll-area-api/)

```bash
npm i @semcore/scroll-area
```

- Убрано свойство `theme` у `<ScrollArea.Bar.Slider/>`
- Убрано свойство `eventEmitter` у `<ScrollArea/>`, вместо него появилось свойство `container` и `inner` в которые можно передать ссылки на dom node.
- Убрано свойство `eventEmitter` у `<ScrollArea.Bar/>`, вместо него появилось свойство `container` в которое можно передать ссылку на dom node.

@### Modal

[Version API 2.0](/components/modal/modal-api/)

```bash
npm i @semcore/modal
```

- `<Modal.Close/>` теперь вставляется по умолчанию

@### DatePicker

[Version API 2.0](/components/date-picker/date-api/)

```bash
npm i @semcore/date-picker
```

- При передаче в `Trigger` функции, первым аргументом не приходит текущая выбранная дата(`(value) => {}`), её можно взять из объекта `({ value }) => {}`
- При передаче в `Title` функции, первым аргументом не приходит текущая отображаемая дата и месяц (`(date, month ) => {}`), её можно взять из объекта `({ displayPeriod }) => {}`
- При передаче в `Calendar` функции, первым аргументом не приходит массив дней(`(days ) => {}`), его можно взять из объекта `({ days }) => {}`
- Свойство `periods` больше не принимает false, используйте пустой массив [].
- Свойство `onHighlighted` переименовался в `onHighlightedChange`
- Убран экспорт `Calendar`

@### Flags

[Version API 2.0](/components/flags/flags-api/)

```bash
npm i @semcore/flags
```

- Убрали поддержку свойства `name`, используйте `iso2` или `iso3`

@### Breadcrumbs

[Version API 2.0](/components/breadcrumbs/breadcrumbs-api/)

```bash
npm i @semcore/breadcrumbs
```

- Убрали поддержку свойства `disableSeparator` для `Breadcrumbs.Item`

@### NeighborLocation

[Version API 2.0](/utils/neighbor-location/neighbor-location-api/)

```bash
npm i @semcore/neighbor-location
```

- Изменился алгоритм применения `Item`. Теперь он работает только с компонентами созданными с помощью `@semcore/core`.
  Пример можно посмотреть на [странице компонента](/utils/neighbor-location/).

@### InputTags

[Version API 2.0](/components/input-tags/input-tags-api/)

```bash
npm i @semcore/input-tags
```

- Добавлено свойство `<InputTag.Tag/>`, его стоит использовать вместо обычного `<Tag />` для правильной расстановки отступов.

@### Chart

```bash
npm i @semcore/input-tags
```

- Обновлена версия recharts до 1.8.5
- Обновлена версия @types/recharts до 1.8.13
- Исправлено отображение `Tooltip` в `VennChart`
- Исправлен проброс `defaultProps` в ф-ции копирования графиков
- Убраны статичные методы `Skeleton` у компонентов `AreaChart`, `BarChart`, `HistogramChart`, `LineChart`, `PieChart`, `VennChart`, используйте преднастроенные скелетоны из пакета `@react-secmore/skeleton`

@### Accordion

```bash
npm i @semcore/accordion
```

- Убрано св-во `getSelected`
- Изменилось использование с `@semcore/table`, пример - [тут](/components/accordion/accordion-code)
- `value` компонента теперь принимает `null | string | number | string[] | number[]`. Это сделано для упрощения переключения в режим с одной активной вкладкой. Подробнее - в [примерах](/components/accordion/accordion-code)

@### Table

```bash
npm i @semcore/table
```

- Перенесли `Scroll.Bar` внутрь `Table.StickyHead`, теперь не надо его передавать

@### ProjectCreate

```bash
npm i @semcore/project-create
```

- В событии `onSubmit` прикоходят поля как они есть, без присваивания `name = url` если `name` пуст
- Обновили дефолтную фукнцию валидации `validate`, теперь она не пропускает кирилицу
  @### NoticeBubble

[Version API 2.0](/components/notice-bubble/notice-bubble-api/)

```bash
npm i @semcore/notice-bubble
```

- `NoticeBubble` - это теперь не просто View-компонент, а JSX-представление нотиса, подписывающийся на жизненный цикл
  компонента и вызывает соответствующие методы менеджера (NoticeBubbleManager)
- Переименовали `type="default"` в `type="info"` для `NoticeBubble`
