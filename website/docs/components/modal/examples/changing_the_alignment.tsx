import React from 'react';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';

const DEFAULT_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab atque commodi corporis culpa, eius error impedit itaque minus nemo nostrum numquam odio omnis sapiente soluta temporibus vel voluptatibus? Exercitationem?';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState(DEFAULT_TEXT);
  React.useEffect(() => {
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
      <Button onClick={() => setVisible(true)}>Open modal</Button>
      <Modal mt={0} w={500} visible={visible} onClose={() => setVisible(false)}>
        {text}
      </Modal>
    </React.Fragment>
  );
};

export default Demo;
