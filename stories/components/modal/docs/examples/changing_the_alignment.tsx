import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import React from 'react';

const DEFAULT_TEXT =
  'As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed in his bed into a gigantic insect. He lay on his hard, armor-like back, and when he lifted his head a little, he could see his brown, domed belly divided into stiff, arched segments.';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState(DEFAULT_TEXT);
  React.useEffect(() => {
    const timer = window.setInterval(() => {
      if (text.length > 5000) {
        setText(DEFAULT_TEXT);
      } else {
        setText(text + text);
      }
    }, 1000);
    return () => {
      window.clearInterval(timer);
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
