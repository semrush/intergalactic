import React from 'react';
import Flags, { iso2Name } from 'intergalactic/flags';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const countries = ['US', 'DE', 'ES', 'FR', 'IT'];

const Demo = () => (
  <>
    {countries.map((country) => (
      <Flags
        key={country}
        name={country as keyof typeof iso2Name}
        aria-label={iso2Name[country]}
        mr={1}
        mb={3}
      />
    ))}
    {countries.map((country) => (
      <Flex alignItems='center' gap={1} key={country}>
        <Flags name={country as keyof typeof iso2Name} aria-label={iso2Name[country]} />
        <Text aria-hidden>{country}</Text>
      </Flex>
    ))}
  </>
);

export default Demo;
