import React from 'react';
import Accordion from 'intergalactic/accordion';
import { Box } from 'intergalactic/flex-box';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

const Demo = () => {
  return (
    <>
      <style>
        {`
          /* In this example we are forced to use more specific css-selectors to override the default Vitepress styles */
          .vp-doc h3.styled-accordion-item {
            background-color: var(--intergalactic-bg-secondary-neutral);
            padding: var(--intergalactic-spacing-2x) var(--intergalactic-spacing-3x);
            color: var(--intergalactic-text-primary);
            margin-bottom: var(--intergalactic-spacing-05x);
          }
          .vp-doc h3.styled-accordion-item:first-of-type {
            border-radius: var(--intergalactic-control-rounded) var(--intergalactic-control-rounded) 0 0;
          }
          .vp-doc h3.styled-accordion-item:last-of-type {
            border-radius: 0 0 var(--intergalactic-control-rounded) var(--intergalactic-control-rounded);
          }
          .vp-doc h3.styled-accordion-item-selected {
            background-color: var(--intergalactic-bg-secondary-neutral-hover);
            color: #000;
          }
        `}
      </style>
      <Accordion>
        {[...new Array(3)].map((_, index) => (
          <Accordion.Item value={index} key={index}>
            {({ selected }) => (
              <>
                <Accordion.Item.Toggle
                  className={cn(
                    'styled-accordion-item',
                    selected && 'styled-accordion-item-selected',
                  )}
                >
                  <Accordion.Item.ToggleButton>
                    <Accordion.Item.Chevron mr={2} />
                    Section {index + 1}
                  </Accordion.Item.ToggleButton>
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
