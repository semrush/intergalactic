import { Flex } from '@semcore/ui/base-components';
import type { NSFlags } from '@semcore/ui/flags';
import Flags, { iso2Name } from '@semcore/ui/flags';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const keys = Object.keys(iso2Name) as NSFlags.Iso2Code[];

  return (
    <Flex flexWrap>
      {keys.map((name) => (
        <Flex direction='column' alignItems='center' p={5} key={name}>
          <Flags name={name} mb={2} />
          <Text style={{ textAlign: 'center' }} noWrap w={160}>
            {iso2Name[name]}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Demo;
