import Dot from '@semcore/ui/dot';
import { Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='row' gap={4} w={150}>
      <Link>
        Link Dot
        <Dot aria-label='Our brand new Link!' />
      </Link>

      <Link>
        Link Dot up
        <Dot up aria-label='Our brand new Link!' />
      </Link>

      <Link>
        Dot value Up
        <Dot up aria-label='Value'>
          12
        </Dot>
      </Link>
      <Link>
        Link Dot value
        <Dot aria-label='Our brand new Link!'>12</Dot>
      </Link>

      <Link>
        Link Dot L
        <Dot size='l' aria-label='L size' />
      </Link>
      <Link>
        Link Dot M
        <Dot size='m' aria-label='M size' />
      </Link>
      <Link>
        Link Dot L Up
        <Dot up size='l' aria-label='L size Up' />
      </Link>
      <Link>
        Link Dot M Up
        <Dot up size='m' aria-label='M size Up' />
      </Link>
    </Flex>
  );
};

export default Demo;
