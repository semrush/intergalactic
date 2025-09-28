import FileExportM from '@semcore/icon/FileExport/m';
import Button, { ButtonLink } from '@semcore/ui/button';
import { Box, Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';
import { Hint } from '@semcore/ui/tooltip';
import WidgetEmpty, { NoData, getIconPath } from '@semcore/ui/widget-empty';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='row' gap={6} alignItems='flex-start' justifyContent='space-between'>
      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
        <WidgetEmpty icon={getIconPath('combined-chart')}>
          <WidgetEmpty.Description>
            Icon, description and link. [Tool Name] allows you to get daily updates on positions in
            Google's top 100 organic and paid search results.
            <Link>Set up [Tool Name]</Link>
          </WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty>
          <WidgetEmpty.Description>
            The project no longer exists. Icon, description and ButtonLink. The project no longer
            exists. Icon, description and ButtonLink.
            <ButtonLink>Clear filters</ButtonLink>
          </WidgetEmpty.Description>
        </WidgetEmpty>

        <WidgetEmpty>
          <WidgetEmpty.Description>
            Description and link.
            <Link>Set up [Tool Name]</Link>
          </WidgetEmpty.Description>
        </WidgetEmpty>
      </Box>
      <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
        <WidgetEmpty>
          <WidgetEmpty.Title>
            Title and link.
            <Link>Set up [Tool Name]</Link>
          </WidgetEmpty.Title>
        </WidgetEmpty>

        <WidgetEmpty icon={getIconPath('combined-chart')}>
          <WidgetEmpty.Title>
            The project no longer exists. Icon, description and ButtonLink. The project no longer
            exists. Icon, description and ButtonLink.
            <ButtonLink>Clear filters</ButtonLink>
          </WidgetEmpty.Title>
        </WidgetEmpty>
      </Box>
    </Flex>
  );
};

export default Demo;
