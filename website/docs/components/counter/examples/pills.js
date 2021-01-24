import React from 'react';
import Pills from '@semcore/pills';
import { Text } from '@semcore/typography';

export default () => (
  <Pills defaultValue="all">
    <Pills.Item value="all">
      <Pills.Item.Text>All</Pills.Item.Text>
      <Pills.Item.Addon>
        <Text color="gray60">1,259</Text>
      </Pills.Item.Addon>
    </Pills.Item>
    <Pills.Item value="follow">
      <Pills.Item.Text>Follow</Pills.Item.Text>
      <Pills.Item.Addon>
        <Text color="gray60">557</Text>
      </Pills.Item.Addon>
    </Pills.Item>
    <Pills.Item value="not-follow">
      <Pills.Item.Text>Not Follow</Pills.Item.Text>
      <Pills.Item.Addon>
        <Text color="gray60">736</Text>
      </Pills.Item.Addon>
    </Pills.Item>
  </Pills>
);
