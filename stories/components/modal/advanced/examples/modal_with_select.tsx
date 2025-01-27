import React from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import Select, { SelectProps } from '@semcore/select';

const options: SelectProps['options'] = [
  { children: 'option1', value: '1' },
  { children: 'option2', value: '2' },
  { children: 'option3', value: '3' },
  { children: 'option4', value: '4' },
  { children: 'option5', value: '5' },
  { children: 'option6', value: '6' },
];

const Demo = () => {
  const [visible, setVisible] = React.useState(true);

  const handleClose = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open modal dynamically</Button>
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

        <Select popperMargin={48}>
          {({ popper }) => {
            const height = popper.current?.state.rects.popper.height - 8 ?? 0;
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
    </>
  );
};

export default Demo;
