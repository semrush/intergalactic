import figma from '@figma/code-connect';
import InputTags from '@semcore/ui/input-tags';

figma.connect(
  InputTags.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53341-290243&t=I48qqNRyVr8Tdi87-11',
  {
    props: {
      value: figma.textContent('↳ text'),
    },
    example: ({ value }) => <InputTags.Value placeholder={value} id='/* id */' />,
  });

figma.connect(
  InputTags,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10367-194491&t=I48qqNRyVr8Tdi87-11',
  {
    props: {
      placeholder: figma.nestedProps('InputTags.Value', {
        value: figma.textContent('↳ text'),
      }),
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        normal: 'normal',
        invalid: 'invalid',
        valid: 'valid',
      }),
      readOnly: figma.boolean('read-only'),
      // tags: figma.children('Tag'),
    },
    example: ({ placeholder, size, state, readOnly }) => <InputTags size={size} state={state}>{/* tag */}<InputTags.Value placeholder={placeholder.value} id='/* id */' readOnly={readOnly} /></InputTags>,
  },
);
