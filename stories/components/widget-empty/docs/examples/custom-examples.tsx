import React from 'react';
import Card from '@semcore/card';
import WidgetEmpty, { getIconPath } from '@semcore/widget-empty';

const Demo = () => {
  return (
    <div>
      <Card mt={4}>
        <Card.Header>
          <Card.Title>Congratulations!</Card.Title>
        </Card.Header>
        <Card.Body>
          <WidgetEmpty icon={getIconPath('good')}>
            <WidgetEmpty.Title>Good results</WidgetEmpty.Title>
            <WidgetEmpty.Description>Wow! You are doing great!</WidgetEmpty.Description>
          </WidgetEmpty>
        </Card.Body>
      </Card>
      <Card mt={4}>
        <Card.Header>
          <Card.Title>Keep going!</Card.Title>
        </Card.Header>
        <Card.Body>
          <WidgetEmpty icon={getIconPath('nexttime')}>
            <WidgetEmpty.Title>Next time will be better</WidgetEmpty.Title>
            <WidgetEmpty.Description>Keep going to achieve good results.</WidgetEmpty.Description>
          </WidgetEmpty>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Demo;
