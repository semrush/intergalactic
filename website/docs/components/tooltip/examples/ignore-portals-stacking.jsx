import React from 'react';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';
import Input from '@semcore/ui/input';
import Tooltip from '@semcore/ui/tooltip';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button use="primary" onClick={() => setVisible(true)}>
        Open modal
      </Button>
      <Modal visible={visible} onClose={() => setVisible(false)} w={536}>
        <Box>
          <Text size={300} mb={2} tag="label" htmlFor="input-1">
            First input with tooltip
          </Text>
        </Box>
        <Tooltip
          title="Tooltip with ignoring portals stacking. Lorem ipsum dolor sit amet."
          theme="warning"
          visible={true}
          placement="left"
          ignorePortalsStacking
        >
          <Input size="l" w={470}>
            <Input.Value id="input-2" />
          </Input>
        </Tooltip>
        <Box mt={5}>
          <Text size={300} mb={2} tag="label" htmlFor="input-2">
            Second input with tooltip
          </Text>
        </Box>
        <Tooltip
          title="Tooltip without ignoring portals stacking. Lorem ipsum dolor sit amet."
          theme="warning"
          visible={true}
          placement="right"
        >
          <Input size="l" w={470}>
            <Input.Value id="input-2" />
          </Input>
        </Tooltip>
      </Modal>
    </React.Fragment>
  );
};

export default Demo;
