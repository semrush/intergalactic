import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Flex } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import { Text, List } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column' gap={3}>
      <Text size={300} tag='p'>
        The Intergalactic Design System
        {' '}
        <Link href='https://developer.semrush.com/intergalactic/components/link/link-api' enableVisited>
          <Link.Text>
            is so cutting-edge that even black holes are jealous of
            its sleek interface, look at them
          </Link.Text>
          <Link.Addon mt='-3px'>
            <LinkExternalM />
          </Link.Addon>
        </Link>
        .
      </Text>
      <Text size={300} tag='p'>
        Aliens from distant galaxies use it to
        {' '}
        <Link href='#'>
          create otherworldly websites
        </Link>
        {' '}
        that are so user-friendly, even a space-faring cat with paws can navigate them.
      </Text>
      <Text size={300} tag='p'>Look at these:</Text>
      <List size={300} w={300}>
        <List.Item>
          <Link href='#'>
            Alien fashionistas on Mars are rocking sleek spacesuits with astonishing components.
          </Link>
        </List.Item>
        <List.Item>
          <Link href='#' noWrap={true}>
            This link has noWrap="true". Rumor has it that our design system's official font is so futuristic that it writes its
            own code while you're reading it.
          </Link>
        </List.Item>
      </List>
    </Flex>
  );
};

export default Demo;
