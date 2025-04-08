import React, { useState } from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Flex } from '@semcore/flex-box';

const loremString = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
          facere iste praesentium quae quia repudiandae tempore! Assumenda
          consequatur cum ducimus, fuga incidunt necessitatibus nulla odit
          placeat praesentium quidem rerum vero? Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Ducimus facere iste praesentium quae
          quia repudiandae tempore`;

const Demo = () => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <>
      <Button onClick={openModal}>Open modal</Button>
      <Modal visible={visible} onClose={closeModal} w={500}>
        <div style={{ fontSize: '16px' }}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <p key={index}>{loremString}</p>
            ))}

          <Flex justifyContent='center' mt={8}>
            <Button use='primary' theme='success' size='l' onClick={closeModal}>
              Got it!
            </Button>
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default Demo;
