import Accordion from '@semcore/ui/accordion';
import { Flex, Box } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import PrimaryTable from './PrimaryTable';
import { SecondaryTable } from './SecondaryTable';
import WidgetEmpty from '../../../../../../components/widget-empty/docs/examples/nodata_example';

export function Tables() {
  return (
    <Box w='100%'>
      <PrimaryTable />

      <Flex my={4} gap={4}>
        <Card my={4} w='50%'>
          <Text size={400} tag='h3' mb={3} mt={0} semibold textAlign='center'>
            Some questions
          </Text>
          <Accordion use='primary'>
            {[1, 2, 3].map((_, index) => (
              <Accordion.Item value={index} key={index}>
                <Accordion.Item.Toggle wMax={500} mx='auto'>
                  <Accordion.Item.ToggleButton gap={2}>
                    <Accordion.Item.Chevron />
                    {`Section ${index + 1}`}
                  </Accordion.Item.ToggleButton>
                </Accordion.Item.Toggle>
                <Accordion.Item.Collapse wMax={500} mx='auto'>
                  <Box m={3} ml={6}>
                    {`Hello Section ${index + 1}`}
                  </Box>
                </Accordion.Item.Collapse>
              </Accordion.Item>
            ))}
          </Accordion>
          <Text size={400} tag='h3' mb={3} mt={6} semibold textAlign='center'>
            Other questions
          </Text>
          <Accordion>
            {[1, 2, 3].map((_, index) => (
              <Accordion.Item value={index} key={index}>
                <Accordion.Item.Toggle wMax={500} mx='auto'>
                  <Accordion.Item.ToggleButton gap={2}>
                    <Accordion.Item.Chevron />
                    {`Section ${index + 1}`}
                  </Accordion.Item.ToggleButton>
                </Accordion.Item.Toggle>
                <Accordion.Item.Collapse wMax={500} mx='auto'>
                  <Box m={3} ml={6}>
                    {`Hello Section ${index + 1}`}
                  </Box>
                </Accordion.Item.Collapse>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>

        <Card w='50%'>
          <Card.Body>
            <WidgetEmpty />
          </Card.Body>
        </Card>
      </Flex>

      <SecondaryTable />
    </Box>
  );
}
