# Темизация компонентов дизайн-системы Semcore

Способы задать другую тему (другие цвета и значения переменных) для всех или части компонентов.

---

## 1. Как компоненты получают тему

- Стили компонентов в **\*.shadow.css** используют CSS-переменные с fallback:  
  `var(--intergalactic-text-primary, #191b23)`.
- Переменные читаются по **каскаду CSS**: если они заданы на предке (например на `:root` или обёртке), все компоненты их наследуют.
- Компоненты, рендерящие контент **в Portal** (Dropdown, Modal, Tooltip, Popper и т.д.), подхватывают тему через **ThemeProvider**: хук `useContextTheme(ref)` применяет токены из контекста к `ref.current.style`, чтобы портальный контент тоже получил нужные переменные.

Итого: тема = набор CSS-переменных (`--intergalactic-*` и базовые `--gray-*` и т.д.), заданный либо глобально (CSS/JS), либо локально через ThemeProvider.

---

## 2. Глобальная тема (рекомендуемый способ для «одна тема на всё приложение»)

### 2.1. Подключить готовый CSS темы

В корне приложения (или в Storybook) подключают один из сгенерированных файлов:

```ts
// Светлая тема (по умолчанию)
import '@semcore/core/lib/theme/themes/default.css';
// или явно светлая
import '@semcore/core/lib/theme/themes/light.css';

// Тёмная тема — переменные под селектором .dark
import '@semcore/core/lib/theme/themes/dark.css';

// Обе темы в одном файле: :root = light, .dark = dark
import '@semcore/core/lib/theme/themes/auto.css';

// Подсветка фич (градиенты violet–blue), при необходимости
import '@semcore/core/lib/theme/themes/highlights-light.css';
import '@semcore/core/lib/theme/themes/highlights-dark.css';
```

- **default.css** — копия light, задаёт переменные на `:root`.
- **light.css** / **dark.css** — переменные на `:root` (или только dark на `.dark` в зависимости от файла).
- **auto.css** — в одном файле: первый блок для `:root` (light), второй для `.dark`. Переключение темы = добавление/удаление класса `dark` на корне (например на `<html>` или `<body>`).

Чтобы сделать «другую тему для всех компонентов» глобально:
- либо подключить **dark.css** и вешать класс `dark` на корень;
- либо задать свои переменные на `:root` (см. ниже).

### 2.2. Переопределить переменные на :root через свой CSS

После подключения default/light можно переопределить любые токены на `:root`:

```css
:root {
  --intergalactic-bg-primary-neutral: #0a0a0a;
  --intergalactic-text-primary: #f5f5f5;
  --intergalactic-control-primary-info: #7c3aed;
  /* и т.д. */
}
```

Так можно собрать свою «фирменную» тему, не трогая исходные JSON и не меняя сборку: подключаете default/light, затем свой CSS с переопределениями. Все компоненты, использующие эти переменные, подхватят новые значения.

### 2.3. Задать переменные через JavaScript

Аналогично: на корневой элемент (document.documentElement или контейнер приложения) установить стили с переменными:

```ts
const root = document.documentElement;
root.style.setProperty('--intergalactic-bg-primary-neutral', '#0a0a0a');
root.style.setProperty('--intergalactic-text-primary', '#f5f5f5');
// ...
```

Удобно для переключения темы в рантайме (например, при смене темы в настройках).

---

## 3. Локальная тема через ThemeProvider (поддерево + порталы)

Когда нужна **другая тема только для части страницы** (или для порталов, открытых из этой части), используется **ThemeProvider** из `@semcore/core`.

Импорт:

```ts
import { ThemeProvider } from '@semcore/core/lib/utils/ThemeProvider';
// или через ui
import { ThemeProvider } from '@semcore/ui/core/lib/utils/ThemeProvider';
```

Использование:

```tsx
const myTheme = {
  '--intergalactic-control-primary-info': '#8649e1',
  '--intergalactic-control-primary-info-hover': '#5925ab',
  '--intergalactic-text-primary': '#191b23',
};

<ThemeProvider tokens={myTheme}>
  <Button use="primary">Кнопка с другой темой</Button>
  <Select /> {/* дропдаун/попапы тоже получат эти токены через контекст */}
</ThemeProvider>
```

- **tokens** — объект «имя CSS-переменной → значение» (как в default.ts / light.json после обработки).
- ThemeProvider рендерит обёртку с `style={{ ...tokens }}` и передаёт токены в контекст. Компоненты с Portal используют `useContextTheme(ref)` и применяют эти же токены к узлу портала, поэтому модалки/дропдауны/тултипы внутри провайдера отображаются в той же локальной теме.
- Вложенные ThemeProvider мержат токены: `{ ...contextTokens, ...providedTokens }`. Можно оборачивать только часть дерева и переопределять отдельные переменные.

Рекомендация из доков: глобальную тему предпочитать локальной; локальную использовать точечно (например, один виджет или блок с другим оформлением).

---

## 4. Полностью своя тема: новый набор токенов (сборка)

Если нужна **новая тема с нуля** (другие палитры и семантика), а не точечные переопределения:

### 4.1. Структура исходников темы

- Тема собирается из **трёх частей**: `base` (палитра), `tokens` (семантика), `featureHighlight` (опционально).
- Исходники: JSON-файлы по образцу `semcore/core/src/theme/light.json` и `dark.json` (поля `base`, `tokens`, `featureHighlight`).

### 4.2. Добавить третью тему в сборку (например, `brand.json`)

1. Создать `semcore/core/src/theme/brand.json` по структуре light.json (base + tokens + при необходимости featureHighlight).
2. В **processor.ts** добавить `brand` в массив `themes` (рядом с `light` и `dark`) и при необходимости задать для неё селектор (как для dark — отдельный класс).
3. Запустить сборку тем: из корня репозитория обычно что-то вроде `pnpm process-theme` или скрипт, который запускает `semcore/core/src/theme/processor.ts`.
4. В `themes/` появятся `brand.css`, `brand.ts`; при использовании auto-подхода — добавить в `autoTheme` и перегенерировать `auto.css`.

После этого можно подключать `brand.css` и вешать класс (например `.brand`) на корень или использовать объект из `brand.ts` в ThemeProvider.

### 4.3. Своя тема без правок processor (вне репозитория)

- Взять **processTokens** и **tokensToCss** / **tokensToJson** из `@semcore/core` (например из `lib/theme/utils` или как в доке design-tokens — `processTokens`, `tokensToCss` из core).
- Иметь свой `base` + `tokens` (+ при необходимости пустой или копия featureHighlight) в формате, как в light.json.
- Вызвать `processTokens(base, tokens, featureHighlight, 'intergalactic')`, затем `tokensToCss(processedTokens)` — получить CSS-блок с переменными.
- Подключить этот CSS (или инлайнить в страницу) и/или преобразовать результат в объект для ThemeProvider.

Так можно собирать кастомную тему в своём проекте или в инструменте (как в виджете «Transforming JSON files» в доке), не меняя semcore.

---

## 5. Переключение light / dark (auto.css)

При использовании **auto.css**:

- Подключить: `import '@semcore/core/lib/theme/themes/auto.css'`.
- Светлая тема: на корне (например `<html>`) нет класса `dark`.
- Тёмная тема: добавить класс `dark` на корень, например `document.documentElement.classList.add('dark')`.

В auto.css первый блок с переменными — для `:root`, второй — для `.dark`; каскад даёт нужные значения для всех компонентов и для порталов (если портал тоже находится внутри корня с классом `dark`).

---

## 6. Важные моменты

- **Имена переменных** должны совпадать с теми, что используются в компонентах: семантические с префиксом `--intergalactic-*`, базовые — `--gray-50`, `--blue-400` и т.д. Список см. в `theme-variables-structure.md` и в сгенерированных default.ts / light.ts.
- **Fallback в var()** в shadow.css — для случаев, когда переменная не задана; при полной теме их можно не опираться, но не удалять из компонентов (они обновляются при `pnpm process-theme` после изменения токенов в репо).
- **ThemeProvider** использует `display: contents` и передаёт токены в контекст и в style обёртки, чтобы порталы (Modal, Dropdown, Tooltip и т.д.) получали те же переменные через `useContextTheme`.
- Для **одной глобальной кастомной темы** обычно достаточно: подключить default/light + свой CSS или JS с переопределением переменных на `:root`. Для **нескольких тем** — auto.css + переключение класса или отдельные CSS-файлы и переключение подключения/класса. Для **локальной** темы — ThemeProvider с объектом токенов.
