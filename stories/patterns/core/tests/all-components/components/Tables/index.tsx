import { Box, Flex } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import React from 'react';

import PrimaryTable from './PrimaryTable';
import { SecondaryTable } from './SecondaryTable';

export type TablesProps = {
  showPrimaryAndSecondary?: boolean;
};

export function Tables({ showPrimaryAndSecondary = true }: TablesProps) {
  const [pageErrorActive, setPageErrorActive] = React.useState(false);

  return (
    <Box w='100%'>
      {showPrimaryAndSecondary && (
        <>
          <PrimaryTable onPageErrorChange={setPageErrorActive} />

          {!pageErrorActive && (
            <Flex my={4} gap={4}>
              <Card w='100%'>
                <Card.Header>
                  <Card.Title tag='h3'>Keywords</Card.Title>
                </Card.Header>
                <Card.Body p={0} pb={1}>
                  <SecondaryTable />
                </Card.Body>
              </Card>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}
