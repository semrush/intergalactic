import React from 'react';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import SettingsM from '@semcore/icon/Settings/m';
import Button from '@semcore/button';

const tooltipContent =
  'When drawing comparisons between different classes of animals, an alternative unit is sometimes used for organisms: body length per second.';

const Demo = () => (
  <Card tag='section' aria-labelledby='card-title'>
    <Card.Header>
      <Flex justifyContent='space-between' alignItems='center'>
        <Card.Title
          innerHint={tooltipContent}
          innerHintAriaLabel='About fastest animals'
          tag='h3'
          id='card-title'
        >
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
