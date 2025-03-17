import React from 'react';
import WidgetEmpty, { Error, getIconPath } from '@semcore/widget-empty';
import { Box, Flex } from '@semcore/flex-box';
import Link from '@semcore/link';
import Button, { ButtonLink } from '@semcore/button';

const Demo = () => {
  return (
    <Flex direction='row' gap={6} alignItems='flex-start' justifyContent='space-between'>
      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
        <Error
          description={
            <>
              Please try again later. If the problem persists, contact us at{' '}
              <Link href='mailto:mail@semrush.com'>mail@semrush.com</Link>
            </>
          }
        />
        <Error />

        <Error
          icon={getIconPath('good')}
          description={
            <>
              Please try again later. If the problem persists, contact us at{' '}
              <Button>mail@semrush.com</Button>
            </>
          }
        />
      </Box>
      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
        <Error description={<>Please try again later. If the problem persists, contact us at </>}>
          <Box mt={4}>
            <Button>
              <Button.Text>Reload page</Button.Text>
            </Button>
          </Box>
        </Error>

        <Error>NoData</Error>;
        <Error
          icon={getIconPath('good')}
          description={
            <>
              Please try again later. If the problem persists, contact us at{' '}
              <ButtonLink>mail@semrush.com</ButtonLink>
            </>
          }
        />
      </Box>
    </Flex>
  );
};

export default Demo;
