import React from 'react';
import { Box } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';
import Card from 'intergalactic/card';
import WidgetEmpty, { getIconPath } from 'intergalactic/widget-empty';

const Demo = () => {
  return (
    <div>
      <Card mt={4}>
        <Card.Header>
          <Card.Title>[Tool Name]</Card.Title>
        </Card.Header>
        <Card.Body>
          <WidgetEmpty icon={getIconPath('combined-chart')}>
            <WidgetEmpty.Title>Set up your [Tool Name]</WidgetEmpty.Title>
            <WidgetEmpty.Description>
              [Tool Name] allows you to get daily updates on positions in Google's top 100 organic
              and paid search results.
            </WidgetEmpty.Description>
            <Box mt={4}>
              <Button theme='success' use='primary'>
                Set up [Tool Name]
              </Button>
            </Box>
          </WidgetEmpty>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Demo;
