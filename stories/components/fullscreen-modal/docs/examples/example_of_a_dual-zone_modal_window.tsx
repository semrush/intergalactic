import Button from '@semcore/ui/button';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import { Text, List } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open dual zone modal</Button>
      <FullscreenModal visible={visible} onClose={() => setVisible(false)}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header>
          <FullscreenModal.Title>Modal Window Title</FullscreenModal.Title>
          <FullscreenModal.Description>
            Additional information
          </FullscreenModal.Description>
        </FullscreenModal.Header>
        <FullscreenModal.Body>
          <FullscreenModal.Section aria-labelledby='main-section-heading'>
            <Text
              id='main-section-heading'
              size={400}
              tag='h3'
              fontWeight={400}
            >
              Main section
            </Text>
          </FullscreenModal.Section>
          <FullscreenModal.Section
            aria-labelledby='side-section-heading'
            role='complementary'
            style={{
              background: 'var(--intergalactic-bg-secondary-neutral, #f4f5f9)',
              overflow: 'auto',
            }}
            innerOutline
          >
            <Text
              id='side-section-heading'
              size={400}
              tag='h3'
              fontWeight={400}
            >
              Scrollable side section
            </Text>
            <List mt={4}>
              {Array(50).fill(0).map((_, ind) => (
                <List.Item key={ind}>Option {ind + 1}</List.Item>
              ))}
            </List>
          </FullscreenModal.Section>
        </FullscreenModal.Body>
        <FullscreenModal.Footer>
          <Button size='l' use='primary'>
            Submit
          </Button>
          <Button size='l'>
            Cancel
          </Button>
        </FullscreenModal.Footer>
      </FullscreenModal>
    </>
  );
};

export default Demo;
