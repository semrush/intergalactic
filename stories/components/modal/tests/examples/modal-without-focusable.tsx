import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Modal from '@semcore/modal';
import React, { useState } from 'react';

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
      <Modal visible={visible} onClose={closeModal} closable={false}>
        <div style={{ fontSize: '16px' }}>
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <p key={index}>{loremString}</p>
            ))}
          <Flex justifyContent='center' mt={8}>
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default Demo;
