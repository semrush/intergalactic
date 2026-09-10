import figma from '@figma/code-connect';
import Dropdown from '@semcore/ui/dropdown';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

figma.connect(
  Dropdown,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55431-11754&t=7CEXrbu9XEfMUFlr-11',
  {
    props: {
      actions: figma.children('Button'),
      children: figma.children('*'),
      title: figma.textContent('↳ title'),
      content: figma.textContent('↳ text'),
    },
    example: ({ title, content, children, actions }) => (
      <Dropdown>
        <Dropdown.Trigger id='/* id */' tag={Button}>
          {/* Trigger label */}
        </Dropdown.Trigger>
        <Dropdown.Popper p={4} wMax={260} aria-labelledby='/* id */'>
          <Text size={300} bold mb={1}>{title}</Text>
          <Text size={200}>{content}</Text>
          <Flex gap={2} mt={4}>
            {actions}
          </Flex>
          {children}
        </Dropdown.Popper>
      </Dropdown>
    ),
  },
);
