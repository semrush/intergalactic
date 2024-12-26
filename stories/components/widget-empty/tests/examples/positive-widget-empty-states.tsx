import React from 'react';
import WidgetEmpty, { NoData, getIconPath } from '@semcore/widget-empty';
import FileExportM from '@semcore/icon/FileExport/m';
import { Hint } from '@semcore/tooltip';
import Button, { ButtonLink } from '@semcore/button';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {

  return (
    <div>

      
<Flex direction="column" gap={6} alignItems="flex-start" wrap="nowrap">
  {/* Первая колонка */}
  <Box style={{ flex: 1, minWidth: '50%' }}>
        <WidgetEmpty icon={getIconPath('nothing-found')}>
          <WidgetEmpty.Title >Icon, title and description. We have no data to show </WidgetEmpty.Title>
          <WidgetEmpty.Description>The project specified for this widget no longer exists.</WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty icon={<img src="https://picsum.photos/id/1025/28/28" />}>
          <WidgetEmpty.Title>Img, title and description. We have no data to show </WidgetEmpty.Title>
          <WidgetEmpty.Description>The project specified for this widget no longer exists.</WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty icon={getIconPath('good')}>
          <WidgetEmpty.Description>Icon and description. The project specified for this widget no longer exists.</WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty icon={getIconPath('good')}>
          <WidgetEmpty.Title>Icon and Title. The project specified for this widget no longer exists.</WidgetEmpty.Title>
        </WidgetEmpty>

        <WidgetEmpty icon={getIconPath('good')}>
          Icon and text. The project specified for this widget no longer exists.
        </WidgetEmpty>

        <WidgetEmpty icon={getIconPath('nothing-found')}>
        </WidgetEmpty>

        <WidgetEmpty>
          <WidgetEmpty.Title>Iitle and description. We have no data to show</WidgetEmpty.Title>
          <WidgetEmpty.Description>We haven't found any agencies matching your search criteria.Try changing your filter settings or clear filters.</WidgetEmpty.Description>
        </WidgetEmpty>      

        <WidgetEmpty>
          <WidgetEmpty.Description>Description. To view this widget, upgrade to one of ours subscription plans</WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty>
          <WidgetEmpty.Title >Title. We have no data to show </WidgetEmpty.Title>
        </WidgetEmpty>

        </Box>
      </Flex>

      
    </div>
  );
};

export default Demo;
