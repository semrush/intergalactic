import React from 'react';
import { Text } from '@semcore/ui/typography';
import Card from '@semcore/ui/card';
import WidgetEmpty, { getIconPath } from '@semcore/ui/widget-empty';
import Divider from '@semcore/ui/divider';

export default () => {
  return (
    <div>
      <Card my={5}>
        <Text size={300} bold>
          Congratulations
        </Text>
        <Divider orientation="horizontal" m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('congrats')}>
          <WidgetEmpty.Title>Wow! You are doing great!</WidgetEmpty.Title>
          <WidgetEmpty.Description>
            Nothing to fix here.
          </WidgetEmpty.Description>
        </WidgetEmpty>
      </Card>
      <Card my={5}>
        <Text size={300} bold>
          Good results
        </Text>
        <Divider orientation="horizontal" m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('good')}>
          <WidgetEmpty.Title>Good results</WidgetEmpty.Title>
          <WidgetEmpty.Description>
            Wow! You are doing great!
          </WidgetEmpty.Description>
        </WidgetEmpty>
      </Card>
      <Card my={5}>
        <Text size={300} bold>
            Next time
        </Text>
        <Divider orientation="horizontal" m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('nexttime')}>
          <WidgetEmpty.Title>Next time will be better</WidgetEmpty.Title>
          <WidgetEmpty.Description>
            Keep going to achieve good results.
          </WidgetEmpty.Description>
        </WidgetEmpty>
      </Card>
      <Card my={5}>
        <Text size={300} bold>
            Next time
        </Text>
        <Divider orientation="horizontal" m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('processing')}>
          <WidgetEmpty.Title>Processing</WidgetEmpty.Title>
          <WidgetEmpty.Description>
            Wait till the process will come to an end.
          </WidgetEmpty.Description>
        </WidgetEmpty>
      </Card>
    </div>
  );
};
