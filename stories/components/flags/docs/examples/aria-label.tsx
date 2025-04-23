import React from 'react';
import Flags, { iso2Name, type FlagsIso2 } from '@semcore/flags';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const countries: FlagsIso2[] = ['US', 'DE', 'ES', 'FR', 'IT'];

const Demo = () => (
  <>
    {countries.map((country) => (
      <Flags
        key={country}
        name={country}
        role='img'
        aria-label={iso2Name[country]}
        mr={1}
        mb={3}
      />
    ))}

    {countries.map((country) => (
      <Flex alignItems='center' gap={1} key={country}>
        <Flags
          name={country}
          role='img'
          aria-label={iso2Name[country]}
        />
        <Text aria-hidden>{country}</Text>
      </Flex>
    ))}
  </>
);

export default Demo;
