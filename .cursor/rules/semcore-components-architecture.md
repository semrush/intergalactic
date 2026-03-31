# Semcore: компоненты и архитектура дизайн-системы

Краткое саммари по списку компонентов, паттернам архитектуры и использованию для Cursor.

---

## 1. Список пакетов (компонентов)

Компоненты живут в `semcore/` как отдельные npm-пакеты с именами `@semcore/<name>`.

### Базовый слой (зависимости других компонентов)

| Пакет | Назначение |
|-------|------------|
| **@semcore/core** | Фабрика компонентов (`createComponent`, `createBaseComponent`), стилизация (`sstyled`, `Root`), enhancements (uncontrolled, static children, i18n, styles). Базовый слой для всех UI-компонентов. |
| **@semcore/base-components** | Примитивы: **Box**, **Flex**, **Grid** (Row, Col), **Portal**, **Popper**, **Hint**, **OutsideClick**, **ScrollArea**, **Animation** (Collapse, FadeInOut, Scale, Slide, Transform), **Breakpoints**, **Ellipsis**, **NeighborLocation**, **InvalidStateBox**, **ScreenReaderOnly**. Не зависят от темы. |
| **@semcore/base-trigger** | Базовый триггер для дропдаунов/селектов. |
| **@semcore/icon** | Иконки (отдельный большой пакет). |
| **@semcore/illustration** | Иллюстрации. |

### UI-компоненты (импорт из @semcore/ui или точечно)

**Формы и ввод:**  
accordion, add-filter, badge, breadcrumbs, bulk-textarea, **button**, card, carousel, **checkbox**, color-picker, **counter**, **data-table**, **date-picker**, divider, dot, drag-and-drop, **dropdown**, **dropdown-menu**, **input**, input-mask, input-number, **input-tags**, **link**, mini-chart, **modal**, **notice**, **notice-bubble**, **pagination**, **pills**, **progress-bar**, **radio**, **select**, side-panel, **skeleton**, **slider**, **spin**, spin-container, **switch**, **tab-line**, **tab-panel**, **tag**, **textarea**, **time-picker**, **tooltip**, **typography**, **widget-empty**, **wizard**.

**Специализированные:**  
d3-chart, errors, feature-highlight, feature-popover, feedback-form, flags, fullscreen-modal, inline-edit, inline-input, product-head.

**Утилиты/инфра:**  
animation, breakpoints, ellipsis, flex-box, format-text, grid, i18n-unplugin, neighbor-location, outside-click, popper, portal, scroll-area, sticky, stylelint-plugin, table, utils.

### Точка входа для приложений

- **@semcore/ui** — единый пакет, реэкспортирующий все перечисленные компоненты. В приложении обычно: `import { Button, Select, ... } from '@semcore/ui'` или точечно `import Button from '@semcore/button'`.

---

## 2. Архитектура компонента

### Типичная структура папок (новый стиль, например button)

```
semcore/<package>/
  package.json
  src/
    index.ts              # реэкспорт default + типы + дочерние компоненты
    component/
      <ComponentName>/
        <ComponentName>.tsx
        <ComponentName>.type.ts
        <name>.shadow.css
      <SubComponent>/
        ...
  __tests__/
```

У части пакетов (dropdown, select и др.) более плоская структура: `src/Dropdown.jsx`, `src/style/dropdown.shadow.css`, `src/translations/`.

### Зависимости пакета

- **peer:** `react`, `react-dom`; часто `@semcore/core`, `@semcore/base-components`, `@semcore/icon`.
- **dependencies:** только нужные для сборки/логики (например `@semcore/spin` у button).
- Версии выравниваются по мажорной (16.x); core и base-components — база.

---

## 3. Паттерны создания компонентов

### 3.1. createComponent (составной компонент)

Используется для компонентов с дочерними «статическими» частями (Button + Button.Text, Button.Addon; Select + Select.Option и т.д.).

```ts
import { createComponent, sstyled, Root } from '@semcore/core';
import style from './button.shadow.css';

class RootButton extends AbstractButton {
  static displayName = 'Button';
  static style = style;
  static defaultProps = { use: 'secondary', size: 'm' };
  // ...
}

function Text(props) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Box} tag='span' />);
}

const Button = createComponent(RootButton, { Text, Addon });
export default Button;
```

- **Root** — корневой узел, к которому применяется `style` (shadow CSS).
- **Дочерние компоненты** передаются вторым аргументом; к ним автоматически вешаются пропсы через геттеры вида `getTextProps()` / `getAddonProps()` в классе Root.
- **displayName** обязателен при наличии дочерних компонентов (используется в staticChildren enhancement и для `data-ui-name`).

### 3.2. createBaseComponent (простой компонент)

Для примитивов без дочерних частей (Box, Flex, анимации в base-components).

```ts
export default createBaseComponent(Box) as Intergalactic.Component<'div', BoxProps>;
```

### 3.3. Наследование и абстракции

Сложные компоненты могут наследовать общую логику: например, `Button` и `ButtonLink` наследуют от `AbstractButton`; `Select` наследует от `AbstractDropdown` (из dropdown). Общая разметка и поведение — в базовом классе, стили и дефолты — в конкретном.

---

## 4. Стилизация: shadow CSS и токены

- Стили компонента: **\*.shadow.css** в папке компонента (или в `style/` в старых пакетах).
- Подключение: `import style from './button.shadow.css'` и `static style = style` у Root-класса.
- В CSS используются **CSS-переменные темы** с fallback:  
  `var(--intergalactic-text-secondary, #6c6e79)`,  
  `var(--intergalactic-form-control-m, 28px)`,  
  `var(--intergalactic-control-primary-info, #008ff8)` и т.д.
- Селекторы в shadow CSS — кастомные теги (например `SButton`, `SText`), которые резолвятся в реальные DOM-элементы через стили. Атрибуты для вариантов: `[size='m']`, `[theme='primary-info']`, `[disabled]`.
- Тема подключается на уровне приложения (например темизация через `:root` / `.dark` из `semcore/core/src/theme/themes/`). См. `theme-variables-structure.md`.

---

## 5. Compound components и дочерние части

- Дочерние части задаются вторым аргументом `createComponent(Root, { Text, Addon, ... })`.
- В JSX используются как `<Button><Button.Text>Label</Button.Text><Button.Addon /></Button>`.
- Родитель передаёт пропсы дочерним через методы `get<ChildName>Props()`; дочерний компонент рендерится через `sstyled(props.styles)(<SText render={Box} tag='span' />)` и получает уже мерженные пропсы.
- У сложных компонентов (Select, Dropdown) дочерние части могут быть целыми подкомпонентами: `Select.Option`, `Select.InputSearch`, `DropdownMenu.Menu` и т.д. — всё через тот же механизм static children.

---

## 6. Uncontrolled / controlled

- Компоненты поддерживают и неуправляемый, и управляемый режим через одну пару пропсов: `value` / `defaultValue`, `visible` / `defaultVisible` и т.д.
- В классе задаётся `uncontrolledProps()` (массив пар имён), например:  
  `visible: [null, (visible) => { ... }]` — начальное значение и опциональный обработчик при смене.
- Enhancement `uncontrolledPropsEnhancement` в core обрабатывает это: при отсутствии контролирующего пропса используется внутренний state и при необходимости вызывается callback.

---

## 7. Контекст и вложенность

- Для составных компонентов можно передать `context` в опциях `createComponent(..., {}, { context: myContext })`.
- Состояние (например выбранное значение, открыт ли дропдаун) передаётся через контекст в дочерние Option/Item; родитель читает контекст и вызывает handlers (например `handlers.value(value)` в Select).

---

## 8. Базовые примитивы из base-components

- **Box** — универсальный контейнер с пропсами от `useBox` (layout, отступы, теги и т.д.).
- **Flex** — flex-контейнер (useFlex).
- **Grid** — Row/Col для сетки.
- **Portal** — рендер в другой узел DOM.
- **Popper** — позиционирование всплывающих окон (триггер + popper); используется в Dropdown, Tooltip, Select и т.д.
- **Hint** — тултип/подсказка.
- **ScrollArea** — скролл с кастомным скроллбаром.

При разработке новых компонентов стили и разметку обычно строят на Box/Flex и при необходимости на Popper/Portal.

---

## 9. Использование в коде

```tsx
// Один импорт из ui
import { Button, Select, Input, Tooltip } from '@semcore/ui';

// Или точечные импорты
import Button from '@semcore/button';
import { Box, Flex } from '@semcore/base-components';

// Типизация — из того же пакета
import type { ButtonProps } from '@semcore/button';
```

- Иконки: отдельно `import SomethingIcon from '@semcore/icon/lib/Name/name'` (или через реэкспорт ui).
- Тема: подключить CSS темы из `@semcore/core` или приложения; переключение light/dark через класс на корне или через провайдер, если есть.

---

## 10. Тесты и документация

- Тесты: часто в `__tests__/` рядом с пакетом (*.test.tsx, *.browser-test.tsx, *.axe-test.tsx).
- Документация и примеры: в репозитории в `website/` и в `stories/` (Storybook). Компоненты документируются с примерами использования и рекомендуемыми пропсами.

---

## 11. Краткий чеклист при добавлении/изменении компонента

1. Расположение: отдельный пакет в `semcore/<name>` или расширение существующего.
2. Зависимости: `@semcore/core`, при необходимости `@semcore/base-components`, `@semcore/icon`; не тянуть лишние UI-пакеты.
3. Root: класс с `static style`, `static displayName`, при необходимости `static defaultProps` и `uncontrolledProps()`.
4. Стили: только токены `var(--intergalactic-*, fallback)` в `.shadow.css`.
5. Дочерние части: через `createComponent(Root, { Child1, Child2 })` и геттеры `getChild1Props()`.
6. Реэкспорт: в `src/index.ts` и при необходимости в `@semcore/ui`.
