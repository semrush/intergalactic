import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import Slider from '@semcore/ui/slider';

figma.connect(
  Slider.Knob,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10272-140147&t=57sa2Koua22LmcsR-11',
  {
    example: () => <Slider.Knob />,
  },
);

figma.connect(
  Slider.Bar,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11441-126125&t=57sa2Koua22LmcsR-11',
  {
    example: () => <Slider.Bar />,
  },
);

figma.connect(
  Slider,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10272-140102&t=57sa2Koua22LmcsR-11',
  {
    props: {
      disabled: figma.boolean('disabled'),
      options: figma.boolean('options', {
        true: '[{ /* values */ }]',
        false: undefined,
      }),
    },
    example: ({ disabled, options }) => <Slider disabled={disabled} options={options} />,
  },
);

figma.connect(
  Slider,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=42066-2468&t=57sa2Koua22LmcsR-11',
  {
    props: {
      disabled: figma.boolean('disabled'),
      input: figma.children('InputNumber'),
    },
    example: ({ disabled, input }) => (
      <Flex gap={4}>
        <Slider
          disabled={disabled}
        >
          <Slider.Bar />
          <Slider.Knob />
        </Slider>
        {input}
      </Flex>
    ),
  },
);
