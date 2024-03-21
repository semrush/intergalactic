import React from 'react';
import Pills from 'intergalactic/pills';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <Pills defaultValue='all'>
    <Pills.Item value='all'>
      <Pills.Item.Text>All</Pills.Item.Text>
      <Pills.Item.Addon>
        <Text color='text-secondary'>1,259</Text>
      </Pills.Item.Addon>
    </Pills.Item>
    <Pills.Item value='follow'>
      <Pills.Item.Text>Follow</Pills.Item.Text>
      <Pills.Item.Addon>
        <Text color='text-secondary'>557</Text>
      </Pills.Item.Addon>
    </Pills.Item>
    <Pills.Item value='not-follow'>
      <Pills.Item.Text>Not Follow</Pills.Item.Text>
      <Pills.Item.Addon>
        <Text color='text-secondary'>736</Text>
      </Pills.Item.Addon>
    </Pills.Item>
  </Pills>
);

export default Demo;
