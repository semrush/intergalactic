import { Flex } from '@semcore/ui/flex-box';
import VideoListL from '@semcore/ui/icon/VideoList/l';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Text ellipsis={true} w={200}> cndskjnvd vnkfdlnbklfdnb bfndklbnkld</Text>
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
        <Text ellipsis={true} w={200}> cndskjnvd vnkfdlnbklfdnb bfndklbnkld</Text>
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
        <Text ellipsis={true} w={200}> cndskjnvd vnkfdlnbklfdnb bfndklbnkld</Text>
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
