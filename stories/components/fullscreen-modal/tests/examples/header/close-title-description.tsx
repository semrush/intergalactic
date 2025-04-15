import React from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';
import  { DescriptionTooltip } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';
import Button, { ButtonLink } from '@semcore/button';
import InfoM from '@semcore/icon/Info/m';


const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
    <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>
   
    <FullscreenModal disablePortal visible={visible} onClose={() => setVisible(false)}>
      <FullscreenModal.Close />
      <FullscreenModal.Header>
  <FullscreenModal.Title w={200}>Go to Tool Name Go to Tool Name</FullscreenModal.Title>
  <FullscreenModal.Description>Heading 6, 16px Heading 6, 16px

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

  </FullscreenModal.Description>
</FullscreenModal.Header>      
<FullscreenModal.Body>
        <FullscreenModal.Section aria-label = 'Head content 1'>
          Head content 1
        </FullscreenModal.Section>
        <FullscreenModal.Section style={{ background: '#ccc', overflow: 'auto' }} aria-label = 'Head content 1'>
          <div style={{ height: '1000px' }}>
            <h4>Head content 2</h4>
          </div>
        </FullscreenModal.Section>
      </FullscreenModal.Body>
      <FullscreenModal.Footer>Footer</FullscreenModal.Footer>
    </FullscreenModal>
  </>
  );
};

export default Demo;
