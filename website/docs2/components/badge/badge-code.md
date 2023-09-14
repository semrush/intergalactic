---
title: Badge
tabs: Design('badge'), A11y('badge-a11y'), API('badge-api'), Example('badge-code'), Changelog('badge-changelog')
---

## Badge main types

::: sandbox

<script lang="tsx">
import React from 'react';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Flex gap={2}>
      <Badge bg='blue-400'>admin</Badge>
      <Badge bg='red-400'>alpha</Badge>
      <Badge bg='orange-400'>beta</Badge>
      <Badge bg='green-400'>new</Badge>
      <Badge>soon</Badge>
    </Flex>
  );
};
</script>

:::
