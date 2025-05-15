import React from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';
import { DescriptionTooltip } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';
import Button, { ButtonLink } from '@semcore/button';
import InfoM from '@semcore/icon/Info/m';
import ArrowLeftM from '@semcore/icon/ArrowLeft/m';
import ArrowRightM from '@semcore/icon/ArrowRight/m';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>

      <FullscreenModal disablePortal visible={visible} onClose={() => setVisible(false)}>

        <FullscreenModal.Header>
          <FullscreenModal.Back w={200} >Go to Tool Name long long long name </FullscreenModal.Back>
          <FullscreenModal.Title >Go to Tool Name Go to Tool Name
            DescriptionTooltip:
            <DescriptionTooltip>
              <DescriptionTooltip.Trigger
                tag={ButtonLink}
                addonLeft={InfoM}
                color='icon-secondary-neutral'
                aria-label='About peregrine falcon'
              />
              <DescriptionTooltip.Popper aria-label='About fastest animals'>
                <Text tag='p' mb={3}>
                  The <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>{' '}
                  is the fastest bird, and the fastest member of the animal kingdom, with a diving speed
                  of over 300 km/h (190 mph).
                </Text>
                <Text tag='p'>
                  The fastest land animal is the cheetah. Among the fastest animals in the sea is the
                  black marlin, with uncertain and conflicting reports of recorded speeds.
                </Text>
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>


          </FullscreenModal.Title>
        </FullscreenModal.Header >
        <FullscreenModal.Body h={400} >
          <FullscreenModal.Section>
            <Text>Content Title</Text>
          </FullscreenModal.Section>
        </FullscreenModal.Body>
        <FullscreenModal.Footer justifyContent='center' alignItems='center'>
          <Button size='m' use='secondary'>
            <Button.Addon>
              <ArrowLeftM />
            </Button.Addon>
            <Button.Text ml={2}>Previous content</Button.Text>
          </Button>

          <Button size='m' use='primary'>
            <Button.Text mr={2}>Next content</Button.Text>
            <Button.Addon>
              <ArrowRightM />
            </Button.Addon>
          </Button>
        </FullscreenModal.Footer>
      </FullscreenModal>
    </>
  );
};

export default Demo;
