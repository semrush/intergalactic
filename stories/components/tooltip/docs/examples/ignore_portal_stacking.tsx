import React from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import Tooltip from '@semcore/tooltip';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Open modal with tooltips</Button>
      <Modal visible={visible} onClose={() => setVisible(false)} w={536}>
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
            <Input.Value id='input-1' />
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
      </Modal>
    </React.Fragment>
  );
};

export default Demo;
