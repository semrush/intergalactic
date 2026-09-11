import { Flex } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column' gap={2}>
      <Link use='primary' href='https://some.lin'>Primary external link</Link>
      <Link use='secondary' href='https://some.lin'><Link.Text>Secondary external link</Link.Text><Link.ExternalIcon /></Link>
    </Flex>
  );
};

export default Demo;
