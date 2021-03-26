---
title: Area chart
---

@## Area

- График с областями отображается с помощью компонента `Area`.
- `Dots` — точки на линии.
- Как и в [Line](https://i.semrush.com/data-display/d3-chart/line/), можно выбирать ломаный или сглаженный график с помощью параметра curve

@example area

@## Stacked area

Если нужно отобразить соотношение нескольких частей к целому, то это можно сделать с помощью `<StackedArea/>` и `<StackedArea.Area/>`

@example stacked-area

@## Edge cases

- Если в какой-то части графика отсутствуют данные, то этот период отображается пунктирной линией
- Если известно только одно значение, то оно отображается точкой
- Два последовательно известных значения уже будут отображаться как `Area`

@example area-without-data

Для `StackedArea` используется та же самая логика

@example stacked-area-without-data
