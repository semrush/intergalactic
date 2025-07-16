import Accordion from '@semcore/accordion';
import type { AccordionProps } from '@semcore/accordion';
import type { CollapseProps } from '@semcore/animation';
import { Box } from '@semcore/base-components';
import type { BoxProps } from '@semcore/flex-box';
import React from 'react';

type ExampleAccordionProps = AccordionProps & { duration: any } & CollapseProps & BoxProps;

const Demo = (props: ExampleAccordionProps) => {
  const [value, onChange] = React.useState([0]);

  return (
    <Accordion value={value} onChange={(value: any) => onChange(value)} duration={props.duration} use={props.use}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 2}>
          <Accordion.Item.Toggle pb={2} w={props.w} h={props.h}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              Section
              {' '}
              {index + 1}
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse overflowHidden={props.overflowHidden} defaultHeight={props.defaultHeight}>
            <Box p='12px 24px 24px'>{`Hello Section ${index + 1}`}</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export const defaultProps: ExampleAccordionProps = {
  duration: undefined,
  use: undefined,
  overflowHidden: undefined,
  defaultHeight: undefined,
  w: undefined,
  h: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
