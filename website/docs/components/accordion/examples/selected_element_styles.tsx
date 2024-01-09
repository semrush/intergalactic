import React from 'react';
import Accordion from '@semcore/ui/accordion';
import { Text } from '@semcore/ui/typography';
import { Box, Flex } from '@semcore/ui/flex-box';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

const Demo = () => {
  return (
    <>
      <style>
        {`
          .styled-accordion-item {
            background-color: var(--intergalactic-bg-secondary-neutral);
            padding: var(--intergalactic-spacing-2x) var(--intergalactic-spacing-3x);
          }
          .styled-accordion-item:first-of-type {
            border-radius: var(--intergalactic-control-rounded) var(--intergalactic-control-rounded) 0 0;
          }
          .styled-accordion-item:last-of-type {
            border-radius: 0 0 var(--intergalactic-control-rounded) var(--intergalactic-control-rounded);
          }
          .styled-accordion-item-selected {
            background-color: var(--intergalactic-bg-secondary-neutral-hover);
          }
        `}
      </style>
      <Accordion>
        {[...new Array(3)].map((_, index) => (
          <Accordion.Item value={index} key={index}>
            {({ selected }) => (
              <>
                <Accordion.Item.Toggle
                  tag={Flex}
                  alignItems='center'
                  className={cn(
                    'styled-accordion-item',
                    selected && 'styled-accordion-item-selected',
                  )}
                >
                  <Accordion.Item.Chevron mr={2} />
                  <Text size={200} tag='h3' my={0}>{`Section ${index + 1}`}</Text>
                </Accordion.Item.Toggle>
                <Accordion.Item.Collapse>
                  <Box p='12px 32px'>{`Hello Section ${index + 1}`}</Box>
                </Accordion.Item.Collapse>
              </>
            )}
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default Demo;
