import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import Modal from '@semcore/ui/modal';
import Select from '@semcore/ui/select';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const options = Array(2)
  .fill('')
  .map((_, index) => `Option ${index}`);

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Flex gap={2} direction='column' alignItems='flex-start'>
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
      <Select>
        <Select.Trigger placeholder='Select option' mt={2} id='select-with-tooltips' />
        <Select.Menu>
          <Tooltip w='100px' timeout={[0, 50]} ignorePortalsStacking placement='left'>
            {options.map((option, index) => (
              <Select.Option
                value={option}
                key={index}
                tag={Tooltip.Trigger}
              >
                {option}
              </Select.Option>
            ))}
            <Tooltip.Popper w={200}>
              Tooltip Content
            </Tooltip.Popper>
          </Tooltip>
        </Select.Menu>
      </Select>

    </Flex>
  );
};

export default Demo;
