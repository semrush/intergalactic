---
title: Bar chart
---

@## Bar

Для столбчатых графиков используйте `scaleBand` вместо `scaleLinear`. Подробнее смотрите в документации d3 про [Ordinal Scales](https://github.com/d3/d3-scale#ordinal-scales).

`scaleBand` может работать с нечисловыми значениями, поэтому в `domain` указывайте не пару значений (минимальное и максимальное), а полный список значений.

@example bar

@## Hover Bar

Так же, как и `<HoverLine/>`, есть компонент `<HoverRect/>`, который рисует прямоугольник при наведении на график.

@example hover-bar

@## Tooltip

Тултип можно навесить на любой элемент графика. Внутренний контент можно легко вычислить через функцию.

@example tooltip-bar

@## Date format

Когда вам нужно отобразить на одной из осей даты, вам нужно использовать все тот же `scaleBand`.

@example bar-date

@## Negative Bar

Столбик может быть и с отрицательными значениями. Для лучшей читаемости стоит добавить в конец дополнительную `XAxis`, спозиционированную на нуле.

@example bar-negative

@## Horizontal Bar

График можно повернуть, используя компонент `<HorizontalBar/>`, поменяв `scaleBand` и `scaleLinear` местами.

@example bar-horizontal

@## Label Bar

Для отрисовки значений столбиков необходимо передать функцию в `<Bar/>` и получить все необходимые значения.

@example bar-label

@## Group Bar

Для объединения нескольких баров используйте `<GroupBar/>` и `<GroupBar.Bar/>`.

> Компонент `<GroupBar.Bar/>` является настроенным `<Bar/>` и имеет такое же API.

@example bar-group

@## Horizontal Group Bar

Для объединения нескольких горизонтальных баров нужно использовать `<GroupBar.HorizontalBar/>`.

> Компонент `<GroupBar.HorizontalBar/>` является настроенным `<HorizontalBar/>` и имеет такое же API.

@example bar-horizontal-group

@## Stacked Bar

График с накоплением можно сделать с помощью компонентов `<StackBar/>` и `<StackBar.Bar/>`, соответственно.

@example bar-stack

@## Horizontal Stacked Bar

Горизонтальный график с накоплением можно сделать с помощью компонента `<StackBar.HorizontalBar/>`.

@example bar-horizontal-stack

@## Trend line

Графики можно совмещать друг с другом. Например, для отображения трендовой линии на столбчатом графике.

@example bar-trend

@## Background

Графикам можно задавать задний фон при необходимости. Для этого используйте компоненты `<Bar.Background/>` и `<HorizontalBar.Background/>`

@example bar-background
