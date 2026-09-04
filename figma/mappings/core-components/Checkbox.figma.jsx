import figma from '@figma/code-connect';
import Checkbox from '@semcore/ui/checkbox';

// ??? Throws error: "Code Connect UI mapping already exists for this node" ???

// figma.connect(
//   Checkbox.Value,
//   'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10063-46164&t=B1622uxt4mPTLZzH-11',
//   {
//     props: {
//       size: figma.enum('size', {
//         L: 'l',
//         M: 'm',
//       }),
//       checked: figma.boolean('checked'),
//       indeterminate: figma.boolean('indeterminate'),
//       invalid: figma.enum('state', {
//         invalid: true,
//       }),
//     },
//     example: ({ size, checked, indeterminate, invalid }) => (
//       <Checkbox.Value size={size} checked={checked} indeterminate={indeterminate} invalid={invalid} />
//     ),
//   },
// );

figma.connect(
  Checkbox,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10063-46204&t=B1622uxt4mPTLZzH-11',
  {
    props: {
      label: figma.textContent('↳ text'),
      size: figma.enum('size', {
        L: 'l',
        M: 'm',
      }),
      checked: figma.boolean('checked'),
      indeterminate: figma.boolean('indeterminate'),
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
      <Checkbox
        label={label}
        size={size}
        checked={checked}
        indeterminate={indeterminate}
        invalid={invalid}
        disabled={disabled}
      // addonLeft={addonLeft}
      // addonRight={addonRight}
      // textAddon={textAddon}
      />
    ),
  },
);
