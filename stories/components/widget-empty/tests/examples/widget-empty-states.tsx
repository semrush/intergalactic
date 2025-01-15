import React from 'react';
import WidgetEmpty, { getIconPath } from '@semcore/widget-empty';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex direction="row" gap={6} alignItems="flex-start" wrap="wrap" justifyContent="space-between">
      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
        <WidgetEmpty icon={getIconPath('nothing-found')}>
          <WidgetEmpty.Title>Icon, title and description. We have no data to show</WidgetEmpty.Title>
          <WidgetEmpty.Description>The project specified for this widget no longer exists.</WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty icon={<img src="https://picsum.photos/id/1025/28/28" alt="Example" />}>
          <WidgetEmpty.Title>Img, title and description. We have no data to show</WidgetEmpty.Title>
          <WidgetEmpty.Description>The project specified for this widget no longer exists.</WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty icon={getIconPath('good')}>
          <WidgetEmpty.Description>Icon and description. The project specified for this widget no longer exists.</WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty icon={getIconPath('good')}>
          <WidgetEmpty.Title>Icon and Title. The project specified for this widget no longer exists.</WidgetEmpty.Title>
        </WidgetEmpty>
      </Box>

      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
        <WidgetEmpty icon={getIconPath('good')}>
          Icon and text. The project specified for this widget no longer exists.
        </WidgetEmpty>

        <WidgetEmpty icon={getIconPath('nothing-found')} />

        <WidgetEmpty>
          <WidgetEmpty.Title>Title and description. We have no data to show</WidgetEmpty.Title>
          <WidgetEmpty.Description>
            We haven't found any agencies matching your search criteria. Try changing your filter settings or clear filters.
          </WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty>
          <WidgetEmpty.Description>
            Description. To view this widget, upgrade to one of our subscription plans.
          </WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty>
          <WidgetEmpty.Title>Title. We have no data to show</WidgetEmpty.Title>
        </WidgetEmpty>
      </Box>
    </Flex>
  );
};

export default Demo;
