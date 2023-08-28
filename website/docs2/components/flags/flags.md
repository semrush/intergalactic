---
title: Flags
fileSource: flags
tabName: Design
tabs: Flags('flags'), A11y('flags-a11y'), API('flags-api'), Changelog('flags-changelog')
---

::: sandbox

<script lang="tsx">
import React from 'react';
import Flags, { iso2Name } from '@semcore/ui/flags';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

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


</script>

:::

