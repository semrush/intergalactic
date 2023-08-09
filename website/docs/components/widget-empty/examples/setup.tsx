import React from 'react';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import WidgetEmpty, { getIconPath } from '@semcore/ui/widget-empty';
import Divider from '@semcore/ui/divider';

export default () => {
  return (
    <div>
      <Card my={5}>
        <Text size={300} bold>
          [Name Tool]
        </Text>
        <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('combined-chart')}>
          <WidgetEmpty.Title>Set up your [Name Tool]</WidgetEmpty.Title>
          <WidgetEmpty.Description>
            [Name Tool] allows you to get daily updates on positions in Google’s top 100 organic and
            paid search results.
          </WidgetEmpty.Description>
          <Box mt={4}>
            <Button theme='success' use='primary'>
              Set up [Name Tool]
            </Button>
          </Box>
        </WidgetEmpty>
      </Card>
    </div>
  );
};
