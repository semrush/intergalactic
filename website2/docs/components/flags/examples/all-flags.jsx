import React from 'react';
import Flags, { iso2Name } from '@semcore/flags';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => (
  <Flex flexWrap>
    {Object.keys(iso2Name).map((iso2) => (
      <Flex direction="column" alignItems="center" p={5} key={iso2}>
        <Flags iso2={iso2} mb={2} />
        <Text style={{ textAlign: 'center' }} noWrap w={160}>
          {iso2Name[iso2]}
        </Text>
      </Flex>
    ))}
  </Flex>
);

export default Demo;
