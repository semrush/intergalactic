import { ButtonLink } from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import VideoListL from '@semcore/ui/icon/VideoList/l';
import VideoListM from '@semcore/ui/icon/VideoList/m';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <ButtonLink addonLeft={VideoListM} tag='strong'>
          AddonLeftM
        </ButtonLink>
        <ButtonLink addonLeft={VideoListL} color='text-critical'>
          AddonLeftL
        </ButtonLink>

        <ButtonLink addonRight={VideoListM}>AddonRightM</ButtonLink>
        <ButtonLink addonRight={VideoListL} color='text-critical'>
          AddonRightL
        </ButtonLink>

        <ButtonLink addonRight={VideoListM} addonLeft={VideoListM}>
          AddonRighLefttM
        </ButtonLink>
        <ButtonLink addonRight={VideoListL} addonLeft={VideoListL} tag='em'>
          AddonRightLeftL
        </ButtonLink>

        <ButtonLink addonRight={VideoListL} addonLeft={VideoListL} disabled>
          AddonRightLeftL
        </ButtonLink>
      </Flex>

      <Flex columnGap={2}>
        <ButtonLink title='VideoListM'>
          <ButtonLink.Addon>
            <VideoListM />
          </ButtonLink.Addon>
        </ButtonLink>

        <ButtonLink title='VideoListM' disabled>
          <ButtonLink.Addon>
            <VideoListM />
          </ButtonLink.Addon>
        </ButtonLink>
        <ButtonLink title='VideoListL'>
          <ButtonLink.Addon>
            <VideoListL />
          </ButtonLink.Addon>
        </ButtonLink>

        <ButtonLink addonLeft={VideoListM} aria-label='VideoListM' mr={2} />
        <ButtonLink addonRight={VideoListL} aria-label='VideoListL' mr={2} />

        <ButtonLink
          addonRight={VideoListL}
          aria-label='VideoListL'
          mr={2}
          tag='strong'
          color='text-critical'
          disabled
        />
      </Flex>
    </>
  );
};

export default Demo;
