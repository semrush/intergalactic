import figma from '@figma/code-connect';
import Switch from '@semcore/ui/switch';

figma.connect(
  Switch,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10133-80383&t=Q0bSsRErIQ7IEZAU-11',
  {
    variant: { icon: 'false' },
    props: {
      label: figma.textContent('↳ text'),
      size: figma.enum('size', {
        XL: 'xl',
        L: 'l',
        M: 'm',
      }),
      checked: figma.boolean('checked'),
      theme: figma.enum('theme', {
        info: 'info',
        success: 'success',
      }),
    },
    example: ({ label, size, checked, theme }) => (
      <Switch
        size={size}
        theme={theme}
      >
        <Switch.Value checked={checked} />
        <Switch.Addon>
          {label}
        </Switch.Addon>
      </Switch>
    ),
  },
);

figma.connect(
  Switch,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10133-80383&t=Q0bSsRErIQ7IEZAU-11',
  {
    variant: { icon: 'true' },
    props: {
      label: figma.textContent('↳ text'),
      size: figma.enum('size', {
        XL: 'xl',
        L: 'l',
        M: 'm',
      }),
      checked: figma.boolean('checked'),
      theme: figma.enum('theme', {
        info: 'info',
        success: 'success',
      }),
      icon: figma.boolean('icon', {
        true: figma.instance('↳ icon'),
        false: undefined,
      }),
    },
    example: ({ label, size, checked, icon }) => (
      <Switch
        size={size}
      >
        <Switch.Value theme={theme} checked={checked}>{icon}</Switch.Value>
        <Switch.Addon>
          {label}
        </Switch.Addon>
      </Switch>
    ),
  },
);
