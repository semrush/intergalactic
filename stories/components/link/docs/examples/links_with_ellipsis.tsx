import { Flex } from '@semcore/base-components';
import Divider from '@semcore/divider';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Link from '@semcore/link';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex>
      <Text flex='0 0 auto'>Sep 3</Text>
      <Divider mx={4} orientation='vertical' />
      <Link w={500} wMin={0} href='#'>
        <Flex alignItems='center'>
          <Link.Text w='100%' inline noWrap>
            <Text w='100%' inline noWrap>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iusto, sed!
              Asperiores, consectetur deserunt et ipsam omnis quae repellendus velit veniam.
              Asperiores dicta dolor ducimus enim fugit laborum minima reprehenderit?
            </Text>
          </Link.Text>
          <Link.Addon>
            <LinkExternalM />
          </Link.Addon>
        </Flex>
      </Link>
    </Flex>
  );
};

export default Demo;
