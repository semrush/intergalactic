import figma from '@figma/code-connect';
import { Flex } from '@semcore/ui/base-components';
import InputNumber from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';

figma.connect(
  InputNumber,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10162-90608',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        invalid: 'invalid',
        valid: 'valid',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      readOnly: figma.boolean('read-only'),
      addonLeft: figma.boolean('← addon', {
        true: <InputNumber.Addon>{/* addon */}</InputNumber.Addon>,
      }),
      showControls: figma.boolean('show controls'),
    },
    example: ({ size, state, addonLeft, readOnly, showControls, disabled }) => (
      <InputNumber size={size} state={state} disabled={disabled}>
        {addonLeft}
        <InputNumber.Value readOnly={readOnly} />
        <InputNumber.Controls showControls={showControls} />
      </InputNumber>
    ),
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10162-90618',
  {
    example: () => (
      <Flex>
        <InputNumber neighborLocation='right'>
          {/* Select individual inputs to inspect their props */}
        </InputNumber>
        <InputNumber neighborLocation='left'>
          {/* Select individual inputs to inspect their props */}
        </InputNumber>
      </Flex>
    ),
  },
);

// let's discuss if we really need Value props (and parent `w` prop) here (they aren't connected with Figma)

// figma.connect(
//   InputNumber.Value,
//   'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52716-799&',
//   {
//     props: {
//       value: figma.textContent('↳ text'),
//     },
//     example: ({ value }) => (
//       <InputNumber.Value
//         defaultValue='/* string */'
//         placeholder={value}
//         id='/* id */'
//         max='/* number */'
//         min='/* number */'
//         step='/* number */'
//       />
//     ),
//   },
// );

// TODO: How to add neighborLocation props to the InputNumber components?
// это можно сделать вот так, но придется повторять все проперти для каждого потомка

// figma.connect(
//   Flex,
//   'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10162-90618&',
//   {
//     props: {
//       child1: figma.nestedProps('InputNumber1', {
//         showControls: figma.boolean('show controls'),
//         state: figma.enum('state', {
//           invalid: 'invalid',
//           valid: 'valid',
//         }),
//         disabled: figma.enum('state', {
//           disabled: true,
//         }),
//         readOnly: figma.boolean('read-only'),
//       }),
//     },
//     example: ({ child1 }) => (
//       <Flex>
//         <InputNumber neighborLocation='right' disabled={child1.disabled} state={child1.state}>
//           <InputNumber.Value readOnly={child1.readOnly} />
//           <InputNumber.Controls showControls={child1.showControls} />
//         </InputNumber>
//         <InputNumber neighborLocation='left'>
//           <InputNumber.Value />
//           <InputNumber.Controls />
//         </InputNumber>
//       </Flex>
//     ),
//   },
// );

// InputNumber with label

figma.connect(
  InputNumber,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56367-564',
  {
    variant: { 'label position': 'top' },
    props: {
      label: figma.children('Input.Label'),
      input: figma.children('InputRange'),
    },
    example: ({ label, input }) => (
      <Flex direction='column' gap={2}>
        {label}
        {input}
      </Flex>
    ),
  },
);

figma.connect(
  InputNumber,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56367-564',
  {
    variant: { 'label position': 'left' },
    props: {
      label: figma.children('Input.Label'),
      input: figma.children('InputRange'),
    },
    example: ({ label, input }) => (
      <Flex direction='row' gap={2}>
        {label}
        {input}
      </Flex>
    ),
  },
);
