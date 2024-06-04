import React from 'react';
import Card from 'intergalactic/card';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import SettingsM from 'intergalactic/icon/Settings/m';
import Button from 'intergalactic/button';

const tooltipContent =
  'When drawing comparisons between different classes of animals, an alternative unit is sometimes used for organisms: body length per second.';

const Demo = () => (
  <Card tag='section' aria-labelledby='card-title'>
    <Card.Header>
      <Flex justifyContent='space-between' alignItems='center'>
        <Card.Title innerHint={tooltipContent} tag='h3' id='card-title'>
          Fastest animals
        </Card.Title>
        <Button addonLeft={SettingsM} use='tertiary' theme='muted' aria-label='Settings' />
      </Flex>
      <Card.Description>
        This is a list of the fastest animals in the world, by types of animal.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={200}>
        The peregrine falcon is the fastest bird, and the fastest member of the animal kingdom, with
        a diving speed of over 300 km/h (190 mph). The fastest land animal is the cheetah.
      </Text>
    </Card.Body>
  </Card>
);

export default Demo;
