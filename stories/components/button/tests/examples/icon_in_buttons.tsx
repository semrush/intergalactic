import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import VideoListL from '@semcore/ui/icon/VideoList/l';
import VideoListM from '@semcore/ui/icon/VideoList/m';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Button addonLeft={VideoListM}>AddonLeftM</Button>
        <Button addonLeft={VideoListL} size='l'>
          AddonLeftL
        </Button>

        <Button addonRight={VideoListM}>AddonRightM</Button>
        <Button addonRight={VideoListL} size='l'>
          AddonRightL
        </Button>

        <Button addonRight={VideoListM} addonLeft={VideoListM}>
          AddonRighLefttM
        </Button>
        <Button addonRight={VideoListL} addonLeft={VideoListL} size='l'>
          AddonRightLeftL
        </Button>

        <Button addonRight={VideoListL} addonLeft={VideoListM} size='l' disabled>
          AddonRightLeftL
        </Button>
      </Flex>

      <Flex columnGap={2}>
        <Button title='VideoListM'>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>

        <Button title='VideoListM' disabled>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>
        <Button title='VideoListL'>
          <Button.Addon>
            <VideoListL />
          </Button.Addon>
        </Button>

        <Button title='Secondary VideoListM' use='primary'>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>
        <Button title='Secondary VideoListL' use='primary'>
          <Button.Addon>
            <VideoListL />
          </Button.Addon>
        </Button>
        <Button title='Secondary VideoListL' use='primary' disabled>
          <Button.Addon>
            <VideoListL />
          </Button.Addon>
        </Button>

        <Button title='Tertiary VideoListM' use='tertiary'>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>

        <Button title='Tertiary VideoListL' use='tertiary'>
          <Button.Addon>
            <VideoListL />
          </Button.Addon>
        </Button>

        <Button addonLeft={VideoListM} aria-label='VideoListM' mr={2} />
        <Button addonRight={VideoListL} aria-label='VideoListL' mr={2} />

        <Button addonLeft={VideoListM} aria-label='VideoListM' mr={2} use='primary' />
        <Button addonRight={VideoListL} aria-label='VideoListL' mr={2} use='primary' />

        <Button addonLeft={VideoListM} aria-label='VideoListM' mr={2} use='tertiary' />
        <Button addonRight={VideoListL} aria-label='VideoListL' mr={2} use='tertiary' />
        <Button addonRight={VideoListL} aria-label='VideoListL' mr={2} use='tertiary' disabled />
      </Flex>
    </>
  );
};

export default Demo;
