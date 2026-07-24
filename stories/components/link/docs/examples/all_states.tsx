import { Flex } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column' gap={5}>
      <Flex direction='column' gap={2}>
        <Link use='primary' href='#'>Primary link</Link>
        <Link use='secondary' href='#'>Secondary link</Link>
        <Link use='accent' href='#'>Accent link</Link>
      </Flex>

      <Flex direction='column' gap={2}>
        <Link use='primary' href='https://some.lin'>Primary external link</Link>
        <Link use='secondary' href='https://some.lin'>Secondary external link</Link>
        <Link use='accent' href='https://some.lin'>Accent external link</Link>
      </Flex>
    </Flex>
  );
};

export default Demo;
