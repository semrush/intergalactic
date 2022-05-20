import React from 'react';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import SettingsM from '@semcore/icon/Settings/m';

const tooltipContent = `Hey! Don't forget to place some useful info here 😏`;

export default () => (
  <Card>
    <Card.Header>
      <Card.Title hint={tooltipContent}>Card heading</Card.Title>
      <SettingsM style={{ float: 'right' }} color="stone" interactive />
      <Card.Description>This is card additional information or insights.</Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={100}>Your awesome card content ✨</Text>
    </Card.Body>
  </Card>
);
