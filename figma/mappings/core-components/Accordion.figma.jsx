import figma from '@figma/code-connect';
import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/base-components';

const AccordionItemToggle = Accordion.Item.Toggle;
const AccordionItemCollapse = Accordion.Item.Collapse;
const AccordionItem = Accordion.Item;

figma.connect(
  AccordionItemToggle,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10085-55594', {
    props: {
      use: figma.enum('use', {
        primary: 'primary',
        secondary: 'secondary',
      }),

    },
    example: () => (
      <Accordion.Item.Toggle>
        <Accordion.Item.ToggleButton>
          <Accordion.Item.Chevron mr={2} />
          {/* Add text */}
        </Accordion.Item.ToggleButton>
      </Accordion.Item.Toggle>
    ),
  });

figma.connect(
  AccordionItemCollapse,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=13079-111795', {
    props: {
      content: figma.textContent('↳ text'),
    },
    example: ({ content }) => (
      <Accordion.Item.Collapse>
        <Box p='/* Set paddings */'>{content}</Box>
      </Accordion.Item.Collapse>
    ),
  });

figma.connect(
  AccordionItem,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57405-3777', {
    props: {
      toggle: figma.children('Accordion.Item.Toggle'),
      collapse: figma.children('Accordion.Item.Collapse'),
    },
    example: ({ toggle, collapse }) => (
      <Accordion.Item>
        {collapse}
        {toggle}
      </Accordion.Item>
    ),
  });

figma.connect(
  Accordion,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=13079-111971', {
    props: {
      children: figma.children('Accordion.Item'),
      use: figma.enum('use', {
        primary: 'primary',
        secondary: 'secondary',
      }),
    },
    example: ({ children, use }) => (
      <Accordion use={use}>
        {children}
      </Accordion>
    ),
  });
