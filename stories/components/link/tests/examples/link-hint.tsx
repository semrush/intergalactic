import Ellipsis from '@semcore/ellipsis';
import { Flex } from '@semcore/flex-box';
import VideoListL from '@semcore/icon/VideoList/l';
import Link from '@semcore/link';
import { Hint } from '@semcore/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Ellipsis w={200}> cndskjnvd vnkfdlnbklfdnb bfndklbnkld</Ellipsis>
        <Link
          href='#'
          target='_blank'
          rel='noreferrer'
          addonLeft={VideoListL}
          color='gray-300'
          ml={1}
          title='test'
        />

      </Flex>
      <Flex columnGap={2} mb={4}>
        <Ellipsis w={200}> cndskjnvd vnkfdlnbklfdnb bfndklbnkld</Ellipsis>
        <Link
          href='#'
          target='_blank'
          rel='noreferrer'
          addonLeft={VideoListL}
          color='gray-300'
          ml={1}
          title='test'
        />

      </Flex>
      <Flex columnGap={2} mb={4}>
        <Ellipsis w={200}> cndskjnvd vnkfdlnbklfdnb bfndklbnkld</Ellipsis>
        <Link
          href='#'
          target='_blank'
          rel='noreferrer'
          addonLeft={VideoListL}
          color='gray-300'
          ml={1}
          title='test'
        />

      </Flex>
    </>
  );
};

export default Demo;
