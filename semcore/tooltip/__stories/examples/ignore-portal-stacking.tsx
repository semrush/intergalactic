import React from 'react';
import Button from '../../../button/src';
import Modal from '../../../modal/src';
import { Text } from '../../../typography/src';
import { Box } from '../../../flex-box/src';
import Input from '../../../input/src';
import Tooltip from '../../src';

export const IgnorePortalStacking = () => {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Open modal</Button>
      <Modal visible={visible} onClose={() => setVisible(false)} w={536}>
        <Modal.Overlay ref={ref}>
          <Modal.Window>
            <Box mb={2}>
              <Text size={300} tag='label' htmlFor='input-1'>
                First input with tooltip
              </Text>
            </Box>
            <Tooltip
              title='Tooltip with ignoring portals stacking.'
              visible={true}
              placement='left-start'
              ignorePortalsStacking
            >
              <Input size='l' w={440}>
                <Input.Value id='input-2' />
              </Input>
            </Tooltip>
            <Box mt={5} mb={2}>
              <Text size={300} tag='label' htmlFor='input-2'>
                Second input with tooltip
              </Text>
            </Box>
            <Tooltip
              title='Tooltip without ignoring portals stacking.'
              visible={true}
              placement='right-start'
            >
              <Input size='l' w={440}>
                <Input.Value id='input-2' />
              </Input>
            </Tooltip>
          </Modal.Window>
        </Modal.Overlay>
      </Modal>
    </React.Fragment>
  );
};
