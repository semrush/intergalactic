import figma from '@figma/code-connect';
import Radio from '@semcore/ui/radio';

figma.connect(
  Radio,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=11941-108998&t=uvqbUJPa7hkmPVOa-11',
  {
    props: {
      label: figma.textContent('↳ text'),
      size: figma.enum('size', {
        L: 'l',
        M: 'm',
      }),
      checked: figma.boolean('checked'),
      invalid: figma.enum('state', {
        invalid: true,
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      addonLeft: figma.boolean('← addon', {
        true: figma.children('← - - addon properties'),
        false: undefined,
      }),
      addonRight: figma.boolean('addon →', {
        true: figma.children('addon properties - - →'),
        false: undefined,
      }),
      textAddon: figma.boolean('textAddon →'),
    },
    example: ({ label, size, checked, indeterminate, invalid, disabled, addonLeft, addonRight, textAddon }) => (
      <Radio
        label={label}
        size={size}
        checked={checked}
        invalid={invalid}
        disabled={disabled}
      // addonLeft={addonLeft}
      // addonRight={addonRight}
      // textAddon={textAddon}
      />
    ),
  },
);
