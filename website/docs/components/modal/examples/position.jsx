import React, { useEffect, useState } from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';

const DEFAULT_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab atque commodi corporis culpa, eius error impedit itaque minus nemo nostrum numquam odio omnis sapiente soluta temporibus vel voluptatibus? Exercitationem?';

function Demo() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(DEFAULT_TEXT);
  useEffect(() => {
    const timer = setInterval(() => {
      if (text.length > 5000) {
        setText(DEFAULT_TEXT);
      } else {
        setText(text + text);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [text]);
  return (
    <React.Fragment>
      <Button use="primary" onClick={() => setVisible(true)}>
        Open modal
      </Button>
      <Modal mt={0} w={500} visible={visible} onClose={() => setVisible(false)}>
        {text}
      </Modal>
    </React.Fragment>
  );
}

export default Demo;
