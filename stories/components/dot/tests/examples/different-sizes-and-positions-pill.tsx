import React from 'react';
import { Flex } from '@semcore/flex-box';
import Link from '@semcore/link';
import Dot from '@semcore/dot';
import Pills from '@semcore/ui/pills';

const Demo = () => {

  return (
    <Flex direction='row' gap={2}>

<Pills mt={2}  aria-labelledby='pills-basic-usage'>
        <Pills.Item value={'like'}>
          <Pills.Item.Text>Like</Pills.Item.Text>
          <Dot aria-label='Our brand new Link!' />
        </Pills.Item>

        <Pills.Item value={null}>
        <Dot up aria-label='Our brand new Link!' />
          Don't care</Pills.Item>

        <Pills.Item value={'dislike'}>
        <Dot up aria-label='Value'/>
          Dislike
        </Pills.Item>
        <Pills.Item value={'dislike'}>
       
          Dislike
          <Dot aria-label='Our brand new Link!'>12</Dot>
        </Pills.Item>
        <Pills.Item value={'dislike'}>
          Dislike
          <Dot up aria-label='Our brand new Link!'>12</Dot>
        </Pills.Item>

        <Pills.Item value={'dislike'}>
        <Dot size='l' aria-label='L size' />
          Dislike
        </Pills.Item>

        <Pills.Item value={'dislike'}>
        <Dot size='m' aria-label='M size' />
          Dislike
        </Pills.Item>

        <Pills.Item value={'dislike'}>
        <Dot up size='l' aria-label='L size Up' />
        Dislike

        </Pills.Item>

        <Pills.Item value={'dislike'}>
        <Dot up size='m' aria-label='M size Up' />
        Dislike

        </Pills.Item>
      </Pills>

    
    </Flex>
  );
};

export default Demo;
