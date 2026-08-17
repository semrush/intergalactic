import { Flex } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column' gap={5}>
      <Flex direction='column' gap={2}>
        <Link theme='default' href='#'>Primary link</Link>
        <Link theme='light' href='#'>Secondary link</Link>
        <Link theme='accent' href='#'>Accent link</Link>
      </Flex>

      <Flex direction='column' gap={2}>
        <Link theme='default' href='https://some.lin'>Primary external link</Link>
        <Link theme='light' href='https://some.lin'>Secondary external link</Link>
        <Link theme='accent' href='https://some.lin'>Accent external link</Link>
      </Flex>
    </Flex>
  );
};

export default Demo;
