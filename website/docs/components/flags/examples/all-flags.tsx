import React from 'react';
import Flags, { iso2Name, nameWithoutIso } from '@semcore/ui/flags';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

const allNames = { ...iso2Name, ...nameWithoutIso };

const Demo = () => (
  <Flex flexWrap>
    {Object.keys(allNames).map((name) => (
      <Flex direction='column' alignItems='center' p={5} key={name}>
        <Flags name={name} mb={2} />
        <Text style={{ textAlign: 'center' }} noWrap w={160}>
          {allNames[name]}
        </Text>
      </Flex>
    ))}
  </Flex>
);

export default Demo;
