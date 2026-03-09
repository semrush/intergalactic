import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Flex } from '@semcore/ui/base-components';
import Divider from '@semcore/ui/divider';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex>
      <Text flex='0 0 auto' size={300}>Sep 3</Text>
      <Divider mx={4} orientation='vertical' />
      <Link href='#'>
        <Link.Text w={480} ellipsis={true} size={300}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iusto, sed!
          Asperiores, consectetur deserunt et ipsam omnis quae repellendus velit veniam.
          Asperiores dicta dolor ducimus enim fugit laborum minima reprehenderit?
        </Link.Text>
        <Link.Addon>
          <LinkExternalM />
        </Link.Addon>
      </Link>
    </Flex>
  );
};

export default Demo;
