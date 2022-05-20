import React from 'react';
import Accordion from '@semcore/accordion';
import Link from '@semcore/link';
import { Box } from '@semcore/flex-box';

const Demo = () => (
  <Accordion>
    {[...new Array(3)].map((_, index) => (
      <Accordion.Item value={index} key={index}>
        <Accordion.Item.Toggle tag={Link} size={200} p="8px 12px" w="100%">
          <Link.Addon tag={Accordion.Item.Chevron} />
          <Link.Text>{`Section ${index + 1}`}</Link.Text>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse>
          <Box p="12px 32px">{`Hello Section ${index + 1}`}</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    ))}
  </Accordion>
);
export default Demo;
