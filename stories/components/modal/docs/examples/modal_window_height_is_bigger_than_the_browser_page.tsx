import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import React, { useState } from 'react';

const loremString = `As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed in his bed into a gigantic insect. He lay on his hard, armor-like back, and when he lifted his head a little, he could see his brown, domed belly divided into stiff, arched segments.
`;

const Demo = () => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <>
      <Button onClick={openModal}>Open modal</Button>
      <Modal visible={visible} onClose={closeModal} w={500}>
        <Flex direction='column'>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Text key={index} size={300} tag='p'>
                {loremString}
              </Text>
            ))}
          <Flex justifyContent='center' mt={8}>
            <Button use='primary' size='l' onClick={closeModal}>
              Got it!
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default Demo;
