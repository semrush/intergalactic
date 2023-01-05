import React from 'react';
import Accordion from '@semcore/ui/accordion';
import Link from '@semcore/ui/link';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => (
  <Accordion>
    {[...new Array(3)].map((_, index) => (
      <Accordion.Item value={index} key={index}>
        <Accordion.Item.Toggle p="8px 12px" w="100%">
          <Link size={200}>
            <Link.Addon>
              <Accordion.Item.Chevron />
            </Link.Addon>
            <Link.Text>{`Section ${index + 1}`}</Link.Text>
          </Link>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse>
          <Box p="12px 32px">{`Hello Section ${index + 1}`}</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    ))}
  </Accordion>
);
export default Demo;
