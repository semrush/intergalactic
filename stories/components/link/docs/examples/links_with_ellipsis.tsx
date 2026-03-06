import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Divider from '@semcore/ui/divider';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Text size={300} display='flex'>
      <Text flex='0 0 auto'>Sep 3</Text>
      <Divider mx={4} orientation='vertical' />
      <Link href='#'>
        <Link.Text w={480} ellipsis={true}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iusto, sed!
          Asperiores, consectetur deserunt et ipsam omnis quae repellendus velit veniam.
          Asperiores dicta dolor ducimus enim fugit laborum minima reprehenderit?
        </Link.Text>
        <Link.Addon mt='-3px'>
          <LinkExternalM />
        </Link.Addon>
      </Link>
    </Text>
  );
};

export default Demo;
