import { Flex, Box } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import PrimaryTable from './PrimaryTable';
import { SecondaryTable } from './SecondaryTable';
import HeadingTagAccordion from '../../../../../../components/accordion/docs/examples/heading_tag';
import NonCompactAccordion from '../../../../../../components/accordion/docs/examples/non_compact';

export function Tables() {
  return (
    <Box w='100%'>
      <PrimaryTable />

      <Flex my={4} gap={4}>
        <Card w='60%'>
          <Card.Header>
            <Card.Title tag='h3'>Keywords</Card.Title>
          </Card.Header>
          <Card.Body p={0} pb={1}>
            <SecondaryTable />
          </Card.Body>
        </Card>

        <Card w='40%'>
          <Card.Header>
            <Card.Title tag='h3'>FAQ</Card.Title>
          </Card.Header>
          <Card.Body tag={Flex} direction='column'>
            <NonCompactAccordion />
            <Text size={300} my={3} semibold>Accordion with heading tag</Text>
            <HeadingTagAccordion />
          </Card.Body>
        </Card>
      </Flex>
    </Box>
  );
}
