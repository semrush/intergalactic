import { Flex } from '@semcore/ui/base-components';
import type { NSFlags } from '@semcore/ui/flags';
import Flags, { iso2Name, nonIsoName } from '@semcore/ui/flags';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const flags = [
    ...Object.keys(iso2Name),
    ...Object.keys(nonIsoName),
  ] as Array<NSFlags.Iso2Code> & Array<NSFlags.NonIsoNameCode>;

  const names = {
    ...iso2Name,
    ...nonIsoName,
  };

  return (
    <Flex flexWrap>
      {flags.map((flag) => (
        <Flex direction='column' alignItems='center' p={5} key={flag}>
          <Flags name={flag} mb={2} />
          <Text style={{ textAlign: 'center' }} noWrap w={160}>
            {names[flag]}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Demo;
