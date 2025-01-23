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
