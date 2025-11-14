import figma from 'figma-api';
import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/base-components';

figma.connect(
    Accordion.Item.Toggle,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10085-55594&t=7CEXrbu9XEfMUFlr-11', {
    props: {
        use: figma.enum('use', {
            'primary': 'primary',
            'secondary': 'secondary',
        }),

    },
    example: () => (
        <Accordion.Item.Toggle>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              /* Add text */
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
    )
});

figma.connect(
    Accordion.Item.Collapse,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=13079-111795&t=7CEXrbu9XEfMUFlr-11', {
    
    example: () => (
        <Accordion.Item.Collapse>
            <Box p='/* Set paddings */'>{/* Add text */}</Box>
          </Accordion.Item.Collapse>
    )
});

figma.connect(
    Accordion.Item,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=13079-111805&t=7CEXrbu9XEfMUFlr-11', {
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
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=13079-111971&t=7CEXrbu9XEfMUFlr-11', {
    props: {
        children: figma.children('Accordion.Item'),
        use: figma.nestedProps('Accordion.Item.Toggle', {
            use: figma.enum('use', {
                'primary': 'primary',
                'secondary': 'secondary',
            }),
          }),
    },
    example: ({ children, use }) => (
        <Accordion use={use.use}>
            {children}
        </Accordion>
    )
});