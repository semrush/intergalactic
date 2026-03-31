# Структура переменных дизайн-системы (semcore/core/src/theme)

Краткая справка по структуре токенов темы для использования в Cursor и при работе с темой.

## Расположение и файлы

- **Источники:** `semcore/core/src/theme/light.json`, `dark.json`
- **Обработка:** `processor.ts` (сборка), `utils.ts` (resolve ссылок, типы)
- **Результат сборки:** `semcore/core/src/theme/themes/` — CSS и TS для `light`, `dark`, `default`, `auto`, а также `highlights-light`, `highlights-dark`

Тема собирается из трёх частей: **base** (палитра), **tokens** (семантика), **featureHighlight** (подсветка фич). Префикс CSS-переменных: `--intergalactic-` (семантика), базовые палитры — без префикса.

---

## 1. Base (примитивная палитра)

Плоская и вложенная структура цветов. Имена в JSON — ключи; в CSS/коде путь превращается в имя через дефис (например `violet.dusty.50` → `violet-dusty-50`).

### Цветовые шкалы (50–800, при необходимости white)

| Палитра   | Описание |
|-----------|----------|
| **gray**  | white, 50–800 — нейтральная шкала |
| **blue**  | 50–800 |
| **green** | 50–800 |
| **red**   | 50–800 |
| **orange**| 50–800 |
| **yellow**| 50–800 |
| **violet**| 50–800, плюс вложенная **violet.dusty** (50–800) |
| **pink**  | 50–800 |
| **salad** | 50–800 |

### Формат токена в base

```json
"value": "#hex или цвет",
"type": "color",
"description": "опционально"
```

Для 50/100 часто есть подсказки по доступности (только фон, только лёгкие обводки и т.д.).

---

## 2. Tokens (семантические токены)

Ссылки на base и другие токены: `{gray.50}`, `{blue.400}`, `rgba({gray.800}, 0.16)`. Ссылки на токены: `$border.critical-active`, `{keyboard-focus.outline}`. Выражения: `{scale-indent}*5` (sizing/spacing).

### Типы токенов (type)

- **color** — цвет (в т.ч. градиенты, rgba)
- **boxShadow** — тень (может содержать ссылки на цвета)
- **border** — составной (width + color)
- **fontFamilies**, **fontSizes**, **lineHeights**, **fontWeights**, **letterSpacing**
- **typography** — составной объект: `fontFamily`, `fontWeight`, `lineHeight`, `fontSize`
- **spacing**, **sizing**, **borderRadius**, **other**, **opacity**

### Основные группы токенов

| Группа | Содержимое |
|--------|------------|
| **bg** | primary (neutral, info, success, critical, warning, highlight, advertising, muted, invert), secondary (аналоги + hover/active), highlight-results, highlight-focus |
| **text** | primary, secondary, placeholder, success, critical, link, hint, advertising, invert-варианты, large-* (для крупного текста) |
| **border** | primary, secondary, info/success/critical/warning (+ active), invert, tooltip-invert, table-accent, date-picker-range-comparison, critical-pattern (градиент) |
| **control** | primary (info, success, critical, brand, advertising, invert + hover/active), secondary, tertiary — те же интенты |
| **icon** | primary/secondary (neutral, info, success, critical, warning, invert + hover-active), non-interactive |
| **illustration** | red, orange, yellow, salad, green, blue, violet, pink — только для иллюстраций |
| **date-picker** | cell, cell-current, cell-hover, cell-range, cell-active, cell-comparison-*, invert-варианты |
| **dropdown-menu** | item, item-hover, item-selected, item-selected-hover |
| **feature-popover** | bg, dot-*, bg-neutral, dot-neutral* |
| **progress-bar** | bg, value, value-gradient, pattern-gradient, value-bg, invert-варианты |
| **skeleton** | bg, bg-invert |
| **slider-rating** | normal, hover-active |
| **table** | th (primary/secondary: cell, cell-hover, cell-active), td (cell, cell-hover, cell-active, cell-unread, cell-accordion, cell-selected, cell-new, cell-critical, cell-warning и состояния) |
| **brand** | primary, secondary, pinterest, instagram, youtube, facebook, linkedIn, twitter, google-* |
| **box-shadow** | card, card-hover, dnd, modal, popper, float-control, float-control-hover |
| **keyboard-focus** | value (boxShadow), outline; вложенные **invalid**, **valid**, **invert** (у каждого value + outline) |
| **base** | fontFamilies (Inter) |
| **lh-100** … **lh-800** | lineHeights (%, привязаны к размерам шрифта) |
| **semi-bold**, **bold**, **regular**, **medium** | fontWeights |
| **fs-50** … **fs-800** | fontSizes (10px–48px) |
| **compact** | letterSpacing |
| **heading-h1** … **heading-h6**, **subtitle** | typography (ссылки на base, fontWeight, lh-*, fs-*) |
| **scale-indent** | 4px — базовая единица сетки |
| **form-control-s/m/l** | sizing от scale-indent |
| **spacing-05x** … **spacing-30x** | spacing (2px–120px от scale-indent) |
| **rounded-*** | borderRadius: extra-small (2px), small (4px), medium (6px), large (12px), extra-large (24px) |
| **addon-rounded**, **badge-rounded**, **chart-rounded**, **control-rounded**, **surface-rounded**, **popper-rounded**, **modal-rounded** и др. | семантические радиусы (ссылки на rounded-*) |
| **disabled-opacity** | 0.3 |
| **screen-extra-small/small/medium/large** | брейкпоинты (320px, 768px, 1200px, 1920px) |
| **overlay** | primary, secondary, limitation-primary, limitation-secondary |
| **z-index** | deep, overlay, modal, popper, tooltip и др. |
| **tooltip**, **neighbor-location**, **scroll-area**, **scroll-bar**, **tag**, **chart**, **header**, **sidebar-nav**, **duration** | компонентные/утилитарные токены |

---

## 3. FeatureHighlight

Отдельный блок для подсветки фич (градиенты violet–blue). Экспортируется в отдельные файлы `highlights-light`, `highlights-dark`.

- **bg**: primary (feature-highlight, feature-highlight-hover-active), secondary (feature-highlight)
- **border**: feature-highlight, feature-highlight-active, feature-highlight-secondary
- **control**: primary/secondary (feature-highlight, feature-highlight-hover, feature-highlight-active)
- **text**: feature-highlight, feature-highlight-hover-active
- **icon**: primary (feature-highlight, feature-highlight-hover-active)
- **keyboard-focus-feature-highlight**: value (border), outline

---

## 4. Синтаксис значений

- **Ссылка на base:** `{gray.50}`, `{violet.dusty.400}`
- **Ссылка на токен:** в CSS после обработки подставляется значение; в JSON встречаются `$token.name` и вложенные ссылки типа `{keyboard-focus.outline}`
- **Прозрачность:** `rgba({gray.800}, 0.16)`, `{gray.white}, 0.8`
- **Выражения:** `{scale-indent}*5` → 20px (только для sizing/spacing/других числовых)
- **Градиенты:** `linear-gradient(90deg, {violet.400}, {blue.400})`
- **Расширения (Figma/Tokens Studio):** `$extensions.studio.tokens.modify` — type: lighten/darken/alpha, value, space (hsl и др.) — применяются при сборке (utils.ts, colorjs.io)

---

## 5. Именование в CSS после сборки

- Базовые (base): `--gray-50`, `--blue-400`, `--violet-dusty-500`
- Семантические: `--intergalactic-bg-primary-neutral`, `--intergalactic-text-primary`, `--intergalactic-control-primary-info`
- Вложенность в JSON превращается в один идентификатор с дефисами: `control.primary.info` → `control-primary-info`

Использование в коде: `var(--intergalactic-bg-primary-neutral)` и т.д.

---

## 6. Процесс сборки (processor.ts)

1. Чтение `light.json` / `dark.json` (base + tokens + featureHighlight).
2. `processTokens()` в utils: обход дерева, сбор values/types/descriptions, разрешение ссылок `{}` и `$`, выражений `*`, rgba, градиентов; применение $extensions (color modifiers).
3. Вывод: `themes/{light,dark,default}.css`, `themes/{light,dark,default}.ts`, отдельно highlights-* для featureHighlight, `auto.css` с `:root` и `.dark`.
4. Для default-темы: проверка использования переменных в `*.shadow.css`, подстановка fallback-значений, генерация документации (design-tokens.json, base-tokens.json).

При добавлении или изменении токенов править соответствующий блок в `light.json`/`dark.json` и при необходимости типы/разрешение в `utils.ts`.
