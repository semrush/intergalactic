import React from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Text } from '@semcore/typography';
import Textarea from '@semcore/textarea';
import Select, { SelectProps } from '@semcore/select';

const FAKE_DELAY = 600;

type ExternalModalComponentProps = {
  onClose: () => void;
};

const options: SelectProps['options'] = [
  { children: 'option1', value: '1' },
  { children: 'option2', value: '2' },
  { children: 'option3', value: '3' },
  { children: 'option4', value: '4' },
  { children: 'option5', value: '5' },
  { children: 'option6', value: '6' },
];

const ExternalModalComponent: React.FC<ExternalModalComponentProps> = ({ onClose }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, FAKE_DELAY);
  }, []);

  const handleClose = React.useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 500);

    setVisible(false);
  }, [onClose]);

  return (
    <Modal visible={visible} onClose={handleClose}>
      <Modal.Title>Do you want to save your changes?</Modal.Title>
      Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It
      has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
      Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
      the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
      cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
      comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of
      Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
      very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
      amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since
      the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de
      Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
      accompanied by English versions from the 1914 translation by H. Rackham.
      <Select pb={'40px'}>
        <Select.Trigger />
        <Select.Menu>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.children}
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>

      <Select popperMargin={40}>
        {({ popper }) => {
          const height = popper.current?.state.rects.popper.height ?? 0;
          const hMax = height > 180 ? 180 : height;
          return (
            <>
              <Select.Trigger />
              <Select.Menu h={height} hMax={hMax}>
                {options.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.children}
                  </Select.Option>
                ))}
              </Select.Menu>
            </>
          );
        }}
      </Select>
    </Modal>
  );
};

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open modal dynamically</Button>

      {visible ? <ExternalModalComponent onClose={() => setVisible(false)} /> : undefined}
    </React.Fragment>
  );
};

export default Demo;
