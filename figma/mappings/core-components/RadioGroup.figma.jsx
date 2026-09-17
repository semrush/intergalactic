import figma from '@figma/code-connect';
import { Flex } from '@semcore/ui/base-components';
import Radio, { RadioGroup } from '@semcore/ui/radio';

figma.connect(
  RadioGroup,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=19530-124643&t=uvqbUJPa7hkmPVOa-11',
  {
    props: {
      size: figma.enum('size', {
        L: 'l',
        M: 'm',
      }),
    },
    example: ({ size }) => (
      <RadioGroup name='radio' aria-labelledby={/* Add label's id */}>
        <Flex direction='column' gap={3}>
          <Radio size={size} label={/* Add your label */} />
        </Flex>
      </RadioGroup>
    ),
  },
);
