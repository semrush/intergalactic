import figma from '@figma/code-connect';
import DnD from '@semcore/ui/drag-and-drop';
import { Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import { MathPlusL } from '@semcore/ui/icon';

figma.connect(
    DnD,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10355-198972&t=ZzJR7SMXKxVeObuH-11',
    {
        props: {
            title: figma.textContent('↳ title'),
            text: figma.textContent('↳ text'),
        },
    example: ({ title, text }) => (
        <DnD aria-label='/* Add aria-label */'>
            <DnD.DropZone
              aria-label='/* Add aria-label */'
              style={{
                border: '1px dashed var(--intergalactic-border-primary',
                borderRadius: 'var(--intergalactic-surface-rounded)',
              }}
            >
              <Flex
                alignItems='center'
                gap={1}
                justifyContent='center'
              >
                <Text color='text-secondary'>
                  <MathPlusL />
                </Text>
                <Text color='text-secondary' bold size={200}>
                  {title}
                </Text>
                <Text color='text-secondary' textAlign='center' size={200}>
                  {text}
                </Text>
              </Flex>
            </DnD.DropZone>
            
            /* Add DnD.Draggable here */

    </DnD>
    ),
});