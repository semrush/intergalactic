import React from 'react';
import Button, { ButtonLink } from '@semcore/button';
import VideoListM from '@semcore/icon/VideoList/m';
import VideoListL from '@semcore/icon/VideoList/l';
import {Flex} from '@semcore/flex-box';

const Demo = () => {
    return (
        <>
         <Flex columnGap={2} mb = {4}>
            <ButtonLink addonLeft={VideoListM} tag='strong'>AddonLeftM</ButtonLink>
            <ButtonLink addonLeft={VideoListL}  color='text-critical' >AddonLeftL</ButtonLink>

            <ButtonLink addonRight={VideoListM} >AddonRightM</ButtonLink>
            <ButtonLink addonRight={VideoListL}  color='text-critical' >AddonRightL</ButtonLink>

            <ButtonLink addonRight={VideoListM} addonLeft={VideoListM} >AddonRighLefttM</ButtonLink>
            <ButtonLink addonRight={VideoListL}addonLeft={VideoListL}  tag='em' >AddonRightLeftL</ButtonLink>

            <ButtonLink addonRight={VideoListL}addonLeft={VideoListL}  disabled>AddonRightLeftL</ButtonLink>
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

    <ButtonLink addonRight={VideoListL} aria-label='VideoListL' mr={2} tag='strong'  color='text-critical' disabled/>
    </Flex>
        </>
    );
};

export default Demo;
