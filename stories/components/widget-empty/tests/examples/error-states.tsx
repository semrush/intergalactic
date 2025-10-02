import Button, { ButtonLink } from '@semcore/ui/button';
import { Box, Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';
import WidgetEmpty, { Error, getIconPath } from '@semcore/ui/widget-empty';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='row' gap={6} alignItems='flex-start' justifyContent='space-between'>
      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
        <Error
          description={(
            <>
              Please try again later. If the problem persists, contact us at
              {' '}
              <Link href='mailto:mail@semrush.com'>mail@semrush.com</Link>
            </>
          )}
        />
        <Error />

        <Error
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
        <Error description={<>Please try again later. If the problem persists, contact us at </>}>
          <Box mt={4}>
            <Button>
              <Button.Text>Reload page</Button.Text>
            </Button>
          </Box>
        </Error>

        <Error>NoData</Error>
        ;
        <Error
          icon={getIconPath('good')}
          description={(
            <>
              Please try again later. If the problem persists, contact us at
              {' '}
              <ButtonLink>mail@semrush.com</ButtonLink>
            </>
          )}
        />
      </Box>
    </Flex>
  );
};

export default Demo;
