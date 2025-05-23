import React, { useState } from 'react';
import Modal from '@semcore/modal';
import Button from '@semcore/button';

const overlayStyles = { background: 'rgba(255, 147, 253, .75)' };
const closeStyles = { fontSize: '20px' };

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open modal</Button>
      <Modal visible={visible} closable={false} onClose={() => setVisible(false)}>
        <Modal.Overlay style={overlayStyles}>
          <Modal.Window wMax='400px' px={5} py={2.5}>
            <Modal.Close style={closeStyles}>x</Modal.Close>
            <h1>Lorem Title</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, autem blanditiis
              consectetur distinctio dolorem ducimus earum facere fuga laudantium magni odit
              officia porro provident quas quia sed sint voluptatum. Nesciunt!
            </p>
            <Button use='primary' theme='danger' onClick={() => setVisible(false)}>
              Close me!
            </Button>
          </Modal.Window>
        </Modal.Overlay>
      </Modal>
    </>
  );
};

export default Demo;
