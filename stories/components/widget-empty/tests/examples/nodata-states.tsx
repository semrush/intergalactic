import Button, { ButtonLink } from '@semcore/ui/button';
import { Box, Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';
import { NoData, getIconPath } from '@semcore/ui/widget-empty';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='row' gap={6} alignItems='flex-start' justifyContent='space-between'>
      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
        <NoData
          description={(
            <>
              Please try again later. If the problem persists, contact us at
              {' '}
              <Link href='mailto:mail@semrush.com'>mail@semrush.com</Link>
            </>
          )}
        />
        <NoData />

        <NoData
          icon={getIconPath('good')}
          description={(
            <>
              Please try again later. If the problem persists, contact us at
              {' '}
              <Button>mail@semrush.com</Button>
            </>
          )}
        />
      </Box>

      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
        <NoData>NoData</NoData>
        ;
        <NoData
          icon={getIconPath('good')}
          description={(
            <>
              Please try again later. If the problem persists, contact us at
              {' '}
              <ButtonLink>mail@semrush.com</ButtonLink>
            </>
          )}
        />

        <NoData description={<>Please try again later. If the problem persists, contact us at </>}>
          <Box mt={4}>
            <Button>
              <Button.Text>Reload page</Button.Text>
            </Button>
          </Box>
        </NoData>
      </Box>
    </Flex>
  );
};

export default Demo;
