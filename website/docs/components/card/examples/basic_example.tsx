import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import SettingsM from '@semcore/ui/icon/Settings/m';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;

const Demo = () => (
  <Card>
    <Card.Header>
      <Card.Title innerHint={tooltipContent} tag='h4' inline my={0}>
        Card Title
      </Card.Title>
      <SettingsM
        style={{ float: 'right' }}
        mt={1}
        color='icon-secondary-neutral'
        interactive
        aria-label='Open settings'
      />
      <Card.Description my={0}>
        This is a description with additional information or insights.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={200}>Your awesome card content is placed here.</Text>
    </Card.Body>
  </Card>
);

export default Demo;
