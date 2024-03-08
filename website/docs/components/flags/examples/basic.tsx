import React from 'react';
import Flags, { iso2Name } from 'intergalactic/flags';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => (
  <Flex flexWrap>
    {Object.keys(iso2Name).map((name) => (
      <Flex direction='column' alignItems='center' p={5} key={name}>
        <Flags name={name as keyof typeof iso2Name} mb={2} />
        <Text style={{ textAlign: 'center' }} noWrap w={160}>
          {iso2Name[name]}
        </Text>
      </Flex>
    ))}
  </Flex>
);

export default Demo;
