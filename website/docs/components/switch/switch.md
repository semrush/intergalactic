---
title: Switch
fileSource: switch
tabs: Design('switch'), A11y('switch-a11y'), API('switch-api'), Example('switch-code'), Changelog('switch-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import Switch from '@semcore/ui/switch';
import CheckM from '@semcore/ui/icon/Check/m';
import CloseM from '@semcore/ui/icon/Close/m';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const App = PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, select, radio, text, onChange } = createGroupWidgets('Switch');

    const size = radio({
      key: 'size',
      defaultValue: 'l',
      label: 'Size',
      options: ['m', 'l', 'xl'],
    });

    const theme = select({
      key: 'theme',
      defaultValue: 'success',
      label: 'Theme',
      options: ['info', 'success'].map((v) => ({ value: v, name: v })),
    });

    const icon = bool({ key: 'children', defaultValue: false, label: 'Icon' });

    const checked = bool({
      key: 'checked',  
      defaultValue: false,
      label: 'Checked',
    });

    const disabled = bool({
      key: 'disabled',
      defaultValue: false,
      label: 'Disabled',
    });

    const textValue = text({
      key: 'textValue',
      label: 'Label',
      defaultValue: 'Notifications',
    });

    return (
      <Switch theme={theme} size={size}>
        <Switch.Value
          disabled={disabled}
          checked={checked}
          onChange={(value) => onChange('checked', value)}
        >
          {icon && (checked ? <CheckM /> : <CloseM />)}
        </Switch.Value>
        {textValue && <Switch.Addon>{textValue}</Switch.Addon>}
      </Switch>
    );
  },
  {
    filterProps: ['onCheckedChange'],
  },
);
</script>

:::

## Description

**Switch** is a component that enables users to easily switch between two options or states without needing to refresh the page or confirm their choice.

![](static/check-or-toggle.png)

## Component composition

![](static/switch-composition.png)

Component consists of the following:

- `Switch.Value`
- `Switch.Addon`

## Appearance

### Sizes

The switch comes in three sizes: `m`, `l` and `xl`.

The switch includes a text label, which can be added to one or both of the states. When the option is enabled, the text color uses the `--text-primary` token, and when the option is disabled, the text color uses the `--text-secondary` token.

Table: Switch sizes and styles

| Switch size (height in px) | Appearance example and margins    | Styles                                                                     |
| -------------------------- | --------------------------------- | -------------------------------------------------------------------------- |
| M (12px)                   | ![](static/switch-on-text-m.png)  | `font-size: var(--fs-100)`, margin between the control and the text is 8px |
| L (20px)                   | ![](static/switch-on-text-l.png)  | `font-size: var(--fs-200)`, margin between the control and the text is 8px |
| XL (24px)                  | ![](static/switch-on-text-xl.png) | `font-size: var(--fs-300)`, margin between the control and the text is 8px |

### Themes

The Switch component offers two themes: `info` and `success`.

Table: Switch themes

| Theme     | Appearance example         | Usage                                                          |
| --------- | -------------------------- | -------------------------------------------------------------- |
| `info`    | ![](static/on-info.png)    | Default theme.                                                 |
| `success` | ![](static/on-success.png) | Theme for highlighting a positive enabled state of the switch. |

## Switch with icon

For larger sizes of the component (`l` and `xl`), you have the option to include an icon within the `Switch.Value`. It is recommended to use different icons for the off and on states.

Table: Icon inside the Switch.Value

| `size` | Normal state                       | Checked state                     |
| ------ | ---------------------------------- | --------------------------------- |
| L      | ![](static/switch-off-icon-l.png)  | ![](static/switch-on-icon-l.png)  |
| XL     | ![](static/switch-off-icon-xl.png) | ![](static/switch-on-icon-xl.png) |

## Interaction

Table: Switch states

| State    | Appearance example                                        | Styles                                                                                                              |
| -------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Normal   | ![](static/off.png)                                       | `background: var(--control-switch-bg)`                                                                              |
| Checked  | ![](static/on-success.png) ![](static/on-info.png)        | `background: var(--control-primary-success)` or `background: var(--control-primary-info)`.                          |
| Disabled | ![](static/disabled.png) ![](static/disabled-success.png) | Transparency of the component changes to 30%. Use [`--disabled-opacity`](/style/design-tokens/design-tokens) token. |

## Usage in UX/UI

For clear actions when using the toggle, **use positive language for text labels in the Switch.** Avoid negations like "Don't show trending subtopics," as they can cause confusion about the switch's effect. Instead, use language that clearly indicates what the switch does, such as "Show trending subtopics."

![](static/switchlabel_yes_no.png)

When making labels, use action verbs like "Send by email" to clearly indicate the switch's purpose.

But, in cases with limited interface space or when the label is part of a switch group (specifically in settings), it's okay to use labels without verbs.
