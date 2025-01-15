import React from 'react';
import { NoData, getIconPath } from '@semcore/widget-empty';
import { Box, Flex } from '@semcore/flex-box';
import Link from '@semcore/link';
import Button, { ButtonLink } from '@semcore/button';

const Demo = () => {
  return (
    <Flex direction="row" gap={6} alignItems="flex-start" justifyContent="space-between">
      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>

        <NoData
          description={
            <>
              Please try again later. If the problem persists, contact us at{' '}
              <Link href='mailto:mail@semrush.com'>mail@semrush.com</Link>
            </>
          }
        />
        <NoData />

        <NoData icon={getIconPath('good')}
          description={
            <>
              Please try again later. If the problem persists, contact us at{' '}
              <Button>mail@semrush.com</Button>
            </>
          }
        />



      </Box>

      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>


        <NoData>NoData</NoData>;

        <NoData icon={getIconPath('good')}
          description={
            <>
              Please try again later. If the problem persists, contact us at{' '}
              <ButtonLink>mail@semrush.com</ButtonLink>
            </>
          }
        />

        <NoData
          description={
            <>
              Please try again later. If the problem persists, contact us at{' '}
            </>
          }
        >
          <Box mt={4}>
            <Button >
              <Button.Text>Reload page</Button.Text>
            </Button>
          </Box>
        </NoData >
      </Box>
    </Flex>


  );
};

export default Demo;
