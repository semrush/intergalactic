import VideoListL from '@semcore/icon/VideoList/l';
import VideoListM from '@semcore/icon/VideoList/m';
import { Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Link href='#' size={300} addonLeft={VideoListM} color='text-success'>
          addonLeftM
        </Link>

        <Link href='#' size={300} addonLeft={VideoListL}>
          addonLeftL
        </Link>

        <Link href='#' size={300} addonLeft={VideoListL} disabled>
          addonLeftL
        </Link>
      </Flex>
      <Flex columnGap={2} mb={4}>
        <Link href='#' size={300} addonRight={VideoListM}>
          addonRightM
        </Link>

        <Link href='#' size={300} addonRight={VideoListL}>
          addonRightL
        </Link>

        <Link href='#' size={300} addonRight={VideoListL} disabled>
          addonRightL
        </Link>
      </Flex>
      <Flex columnGap={2} mb={4}>
        <Link href='#' size={300} addonRight={VideoListM} addonLeft={VideoListM}>
          addonRightaddonLeftM
        </Link>

        <Link href='#' size={300} addonRight={VideoListL} addonLeft={VideoListL}>
          addonRightaddonLeftL
        </Link>
        <Link href='#' size={300} addonRight={VideoListL} addonLeft={VideoListL} disabled>
          addonRightaddonLeftL
        </Link>
      </Flex>
      <Flex columnGap={2} mb={4}>
        <Link href='#' size={300}>
          <Link.Addon>
            <VideoListM />
          </Link.Addon>
          <Link.Text>Link.Addon M</Link.Text>
        </Link>

        <Link href='#' size={300}>
          <Link.Addon>
            <VideoListL />
          </Link.Addon>
          <Link.Text>Link.Addon L</Link.Text>
        </Link>

        <Link addonLeft={VideoListM} aria-label='addonLeft M' href='#' />
        <Link addonLeft={VideoListL} aria-label='addonLeft L' href='#' />

        <Link href='#' tag={Hint} title='tag={Hint} Go to the next pageM'>
          <Link.Addon>
            <VideoListM />
          </Link.Addon>
        </Link>

        <Link href='#' tag={Hint} title='tag={Hint} Go to the next pageL' color='text-critical'>
          <Link.Addon>
            <VideoListL />
          </Link.Addon>
        </Link>

        <Link
          href='#'
          tag={Hint}
          title='tag={Hint} Go to the next pageL'
          color='text-critical'
          disabled
        >
          <Link.Addon>
            <VideoListL />
          </Link.Addon>
        </Link>
      </Flex>
    </>
  );
};

export default Demo;
