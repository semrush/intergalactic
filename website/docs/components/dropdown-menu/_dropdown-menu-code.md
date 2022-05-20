---
title: Example
---

@## Базовый пример

@example menu

Существует несколько абстракций для всплывающего меню. В примерах ниже - два одинаково работающих меню.

В данном примере используются две абстракции для создания выпадающей области и списка:

- `DropdownMenu.Popper` - само выпадающее окно;
- `DropdownMenu.List` - список.

  Этот вариант подойдет, когда вам нужно больше свободы для кастомизации компонента.

```jsx
<DropdownMenu.Popper>
  <DropdownMenu.List>
    <DropdownMenu.Item value="">...</DropdownMenu.Item>
  </DropdownMenu.List>
</DropdownMenu.Popper>
```

В данном примере `DropdownMenu.Popper` & `DropdownMenu.List` были заменены на `DropdownMenu.Menu`, который включает их в себя.

По сути, это просто "синтаксический сахар".

```jsx
<DropdownMenu.Menu>
  <DropdownMenu.Item value="">...</DropdownMenu.Item>
</DropdownMenu.Menu>
```
