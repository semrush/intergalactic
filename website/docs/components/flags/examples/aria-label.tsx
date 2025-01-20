import React from 'react';
import Flags, { iso2Name } from '@semcore/flags';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const countries = ['US', 'DE', 'ES', 'FR', 'IT'];

const Demo = () => (
  <>
    {countries.map((country) => (
      <Flags
        key={country}
        name={country as keyof typeof iso2Name}
        role='image'
        aria-label={iso2Name[country]}
        mr={1}
        mb={3}
      />
    ))}
    {countries.map((country) => (
      <Flex alignItems='center' gap={1} key={country}>
        <Flags
          name={country as keyof typeof iso2Name}
          role='image'
          aria-label={iso2Name[country]}
        />
        <Text aria-hidden>{country}</Text>
      </Flex>
    ))}
  </>
);

export default Demo;
